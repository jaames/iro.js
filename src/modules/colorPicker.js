import layers from "./canvas/lib/layers.js";
import wheel from "./canvas/wheel.js";
import slider from "./canvas/slider.js";
import dom from "./util/dom.js";

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

  this.set({v: 100, h: 120, s: 100});

  dom.listen(el, ["mousedown", "touchstart"], this._mouseDown.bind(this));

};

colorWheel.prototype = {
  _getPoint: function (x, y, globalSpace) {
    var rect = this.layers.main.canvas.getBoundingClientRect();
    var left = rect.left,
        top = rect.top;
    return globalSpace ? {
      x: left + x,
      y: top + y
    } : {
      x: x - left,
      y: y - top
    }
  },
  _iterateUi: function (callback) {
    let ui = this.ui;
    for (var object in ui) {
      if (ui.hasOwnProperty(object)) {
        callback(object, ui[object]);
      }
    }
  },
  _mouseDown: function (e) {
    var point = this._getPoint(e.clientX, e.clientY);
    this._iterateUi(function (name, object) {
      if (object.checkHit(point.x, point.y)) return false // set this ui element as the click target;
    });
  },
  set: function (hsv) {
    this._iterateUi(function (name, object) {
      object.set(hsv);
    });
  },
};

module.exports = colorWheel;
