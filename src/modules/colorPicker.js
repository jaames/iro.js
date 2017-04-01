import wheel from "../ui/wheel.js";
import slider from "../ui/slider.js";
import dom from "../util/dom.js";

import iroColor from "./color.js";
import iroStyleSheet from "./stylesheet.js";

function createLayers(wrapper, width, height, names) {
  wrapper.style.cssText += "position:relative";
  var pxRatio = devicePixelRatio || 1;
  var pxWidth = width * pxRatio;
  var pxHeight = height * pxRatio;
  var ret = {};
  names.forEach(function (name, index) {
    var canvas = dom.append(wrapper, dom.create("canvas"));
    var ctx = canvas.getContext("2d");
    var style = canvas.style;
    canvas.width = pxWidth;
    canvas.height = pxHeight;
    style.cssText += "width:" + width + "px;" + "height" + height + "px";
    ctx.scale(pxRatio, pxRatio);
    if (index != 0) style.cssText += "position:absolute;top:0;left:0";
    ret[name] = {
      ctx,
      canvas
    };
  });
  return ret;
};

let active = false;

dom.listen(document, ["mousemove", "touchmove"], function (e) {
  if (active) active._mouseMove(e);
});

dom.listen(document, ["mouseup", "touchend"], function (e) {
  if (active) {
    e.preventDefault();
    active._mouseTarget = false;
    active = false;
  }
});

let colorWheel = function (el, opts) {
  if (!(this instanceof colorWheel)) return new colorWheel(el, opts);
  el = ("string" == typeof el) ? dom.$(el) : el;

  var width = opts.width || parseInt(dom.attr(el, "width")) || 320;
  var height = opts.height || parseInt(dom.attr(el, "height")) || 320;

  var layers = createLayers(el, width, height, ["main", "over"]);

  var padding = opts.padding + 2 || 6,
      sliderMargin = opts.sliderMargin || 24,
      markerRadius = opts.markerRadius || 8,
      sliderHeight = opts.sliderHeight || (markerRadius * 2) + (padding * 2),
      bodyWidth = Math.min(height - sliderHeight - sliderMargin, width),
      leftMargin = (width - bodyWidth) / 2;

  var marker = {
    r: markerRadius
  };

  this.el = el;
  this.layers = layers;

  this._ui = [
    new wheel(layers, {
      cX: leftMargin + (bodyWidth / 2),
      cY: bodyWidth / 2,
      r: bodyWidth / 2,
      rMax: (bodyWidth / 2) - (markerRadius + padding),
      marker: marker
    }),
    new slider(layers, {
      type: "v",
      x: leftMargin,
      y: bodyWidth + sliderMargin,
      w: bodyWidth,
      h: sliderHeight,
      r: sliderHeight / 2,
      marker: marker
    })
  ];

  this.stylesheet = new iroStyleSheet(opts.css || opts.styles || undefined);
  this.color = new iroColor(opts.color || "#fff");
  this.color.watch(this._update.bind(this), true);
  this._mouseTarget = false;
  this._onChange = false;
  dom.listen(el, ["mousedown", "touchstart"], this._mouseDown.bind(this));
};

colorWheel.prototype = {
  watch: function (callback, callImmediately) {
    this._onChange = callback;
    if (callImmediately) callback(this.color);
  },
  unwatch: function () {
    this.watch(null);
  },
  _localPoint: function (e) {
    e.preventDefault();
    var point = e.touches ? e.changedTouches[0] : e,
        rect = this.layers.main.canvas.getBoundingClientRect();

    return {
      x: point.clientX - rect.left,
      y: point.clientY - rect.top
    };
  },
  _input: function (x, y) {
    this.color.set(this._mouseTarget.input(x, y));
  },
  _mouseDown: function (e) {
    var point = this._localPoint(e),
        x = point.x,
        y = point.y;
    this._ui.forEach((uiElement) => {
      if (uiElement.checkHit(x, y)) {
        active = this;
        this._mouseTarget = uiElement;
        this._input(x, y);
      }
    });
  },
  _mouseMove: function (e) {
    if (active) {
      var point = this._localPoint(e);
      this._input(point.x, point.y);
    }
  },
  _update: function (newValue, oldValue, changes) {
    this._ui.forEach(function (uiElement) {
      uiElement.set(newValue, changes);
    });
    this.stylesheet.update(this.color);
  },
};

module.exports = colorWheel;
