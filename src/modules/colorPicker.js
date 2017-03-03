import layers from "./canvas/lib/layers.js";
import wheel from "./canvas/wheel.js";
import slider from "./canvas/slider.js";
import dom from "./util/dom.js";

import color from "./color.js";

let active = false;

function globalMouseMove(e) {
  if (active) active._mouseMove(e);
}

function globalMouseUp(e) {
  if (active){
    e.preventDefault();
    active._mouseTarget = false;
    active = false;
  }
}

dom.listen(document, ["mousemove", "touchmove"], globalMouseMove);
dom.listen(document, ["mouseup", "touchend"], globalMouseUp);

let colorWheel = function (el, opts) {
  if (!(this instanceof colorWheel)) return new colorWheel(el, opts);
  el = ("string" == typeof el) ? dom.$(el) : el;
  this.el = el;

  var width = opts.width || parseInt(dom.attr(el, "width")) || 320;
  var height = opts.height || parseInt(dom.attr(el, "height")) || 320;

  this.layers = layers.create(el, width, height, ["main", "over"]);

  var padding = opts.padding + 2 || 6,
      sliderMargin = opts.sliderMargin || 24,
      markerRadius = opts.markerRadius || 8,
      sliderHeight = opts.sliderHeight || (markerRadius * 2) + (padding * 2),
      bodyWidth = Math.min(height - sliderHeight - sliderMargin, width),
      leftMargin = (width - bodyWidth) / 2;

  this.ui = {
    hueSat: new wheel(this.layers, {
      cX: leftMargin + (bodyWidth / 2),
      cY: bodyWidth / 2,
      r: bodyWidth / 2,
      rMax: (bodyWidth / 2) - (markerRadius + padding),
      marker: {
        r: markerRadius
      }
    }),
    val: new slider(this.layers, {
      type: "v",
      x: leftMargin,
      y: bodyWidth + sliderMargin,
      w: bodyWidth,
      h: sliderHeight,
      r: sliderHeight / 2,
      marker: {
        r: markerRadius
      }
    })
  }

  this.color = new color();
  this.color.watch(this.set.bind(this));
  this.color.setHsv({v: 100, h: 120, s: 100});
  this._mouseTarget = false;
  dom.listen(el, ["mousedown", "touchstart"], this._mouseDown.bind(this));
};

colorWheel.prototype = {
  _iterateUi: function (callback) {
    let ui = this.ui;
    Object.keys(ui).forEach(function(key) {
      callback(key, ui[key]);
    });
  },
  _getPoint: function (x, y) {
    var rect = this.layers.main.canvas.getBoundingClientRect();
    return {
      x: x - rect.left,
      y: y - rect.top
    }
  },
  _input: function (x, y) {
    var target = this._mouseTarget;
    var val = target.input(x, y);
    this.color.setHsv(val);
  },
  _mouseDown: function (e) {
    e.preventDefault();
    e = e.touches ? e.changedTouches[0] : e;
    var point = this._getPoint(e.clientX, e.clientY);
    var target = false;
    this._iterateUi(function (name, object) {
      if (object.checkHit(point.x, point.y)) target = object;
    });
    if (target) {
      active = this;
      this._mouseTarget = target;
      this._input(point.x, point.y);
    }
  },
  _mouseMove: function (e) {
    if (active) {
      e.preventDefault();
      e = e.touches ? e.changedTouches[0] : e;
      var point = this._getPoint(e.clientX, e.clientY);
      this._input(point.x, point.y);
    }
  },
  set: function (hsv) {
    this._iterateUi(function (name, object) {
      object.set(hsv);
    });
  },
};

module.exports = colorWheel;
