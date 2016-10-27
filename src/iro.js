"use strict";

(function (window) {

  // when the DOM is ready, callback will be called
  var whenReady = function (callback) {
    // if the document is ready, call callback immediately
    if (document.readyState === "complete"){
      callback();
    }
    // else wait for DOM content
    else {
      document.addEventListener("readystatechange", function stateChange(e) {
        if (e.target.readyState === "complete"){
          callback();
          e.target.removeEventListener("readystatechange", stateChange);
        }
      }, false);
    }
  };

  // test if browser is internet explorer 11 or earlier
  var browserIsIE = (/MSIE ([0-9]+)/g.test(navigator.userAgent));

  var Color = (function () {
    // color utility functions

    // convert rgb to hsv:
    // e,g, {r:68, g:255, b:155} -> {h:147, s:73, v:100}
    // modified from https://gist.github.com/mjackson/5311256#file-color-conversion-algorithms-js-L84
    function rgbToHsv(val) {
      var r = val.r, g = val.g, b = val.b;
      var max = Math.max(r, g, b),
          min = Math.min(r, g, b),
          d = max - min,
          h,
          s = (max === 0 ? 0 : d / max),
          v = max / 255;
      switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
      }
      return {h: ~~(h * 360), s: ~~(s * 100), v: ~~(v * 100)};
    };
    // convert hsl to hsv:
    // e,g, {h:50, s:100, l: 50} -> {h:50, s:100, v:100}
    // modified from https://gist.github.com/xpansive/1337890
    function hslToHsv(val) {
      var s = val.s/100, l = val.l/100;
      s *= (l < 0.5) ? (l) : (1-l);
      return {
        h: val.h,
        s: ~~((2 * s / (l+s))*100),
        v: ~~((l+s)*100),
      };
    };
    // convert a HEX color code to RGB:
    // e.g. #FF0000 -> {r:255, g:255, b:255}
    function hexSringToRgb(hex) {
      // strip "#"
      hex = hex.replace(/#/g, '');
      // convert to an integer
      var int = ~~("0x" + hex);
      // if hex is in shorthand format, we need to multiply each channel value by 17
      return (hex.length === 3) ? ({
        r: (int >> 8) * 17,
        g: (int >> 4 & 0xF) * 17,
        b: (int & 0xF) * 17
      }) : ({
        r: (int >> 16),
        g: (int >> 8 & 0xFF),
        b: (int & 0xFF)
      });
    };

    // iro color constructor

    function IroColor (str) {
      if (!(this instanceof IroColor)) return new IroColor(str);
      this.value = {};
      if (str) this.setFromString(str);
    };
    IroColor.prototype.set = function (val) {
      this.value = val;
    };
    IroColor.prototype.setFromRgb = function (val) {
      this.set(rgbToHsv(val));
    };
    IroColor.prototype.setFromHsl = function (val) {
      this.set(hslToHsv(val));
    };
    // set color from CSS color string
    // supports rgb hexadecimal (including shorthands), rgb(a) and hsl(a)
    IroColor.prototype.setFromString = function (str) {
      var value;
      // (try to) detect the type of the color string using regex -- needs a lof of improvement
      var parsed = str.match(/(^rgba?|^hsla?)(?=\(.*?\))|(^#)(?=[a-f0-9])/i);
      // once we have an idea of what the string type is, we can then parse it:
      switch (parsed ? parsed[0] : null) {
        // HEX color notation; e.g #ffff00, #FFFF00, #ff0, etc...
        case "#":
          value = rgbToHsv(hexSringToRgb(str));
          break;
        // rgb color notation; e.g rgb(255, 255, 0), rgba(255, 255, 0, 1)
        case "rgb":
        case "rgba":
          var parsedStr = str.match(/(rgba?)\((\d+)(?:\D+?)(\d+)(?:\D+?)(\d+)(?:\D+?)?([0-9\.]+?)?\)/i);
          value = rgbToHsv({
            r: parseInt(parsedStr[2]),
            g: parseInt(parsedStr[3]),
            b: parseInt(parsedStr[4])
          });
          break;
        // hsl color notation; e.g hsl(60, 100%, 50%), hsla(60, 100%, 50%, 1)
        case "hsl":
        case "hsla":
          var parsedStr = str.match(/(hsla?)\((\d+)(?:\D+?)(\d+)(?:\D+?)(\d+)(?:\D+?)?([0-9\.]+?)?\)/i);
          value = hslToHsv({
            h: parseInt(parsedStr[2]),
            s: parseInt(parsedStr[3]),
            l: parseInt(parsedStr[4])
          });
          break;
        default:
          console.warn("Error: '", str, "' could not be parsed as a CSS color");
      };
      // if the string has been parsed then set it as the value of this color instance
      if (value) this.set(value);
    }
    // modified from https://gist.github.com/mjackson/5311256#file-color-conversion-algorithms-js-L119
    IroColor.prototype.getRgb = function () {
      var val = this.value;
      var r, g, b, i, f, p, q, t;
      var h = val.h/360, s = val.s/100, v = val.v/100;
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
      }
      return {r: ~~(r * 255), g: ~~(g * 255), b: ~~(b * 255)};
    };
    IroColor.prototype.getRgbString = function () {
      var val = this.getRgb();
      return [val.a ? "rgba" : "rgb", "(", val.r, ", ", val.g, ", ", val.b, val.a ? ", " + val.a : "", ")"].join("");
    };
    IroColor.prototype.getHexString = function (useShort) {
      var val = this.getRgb();
      var int, len;
      // check if value can be compressed to shorthand format (if useShort === true)
      // in shorthand, all channels should be able to be divided by 17 cleanly
      if ((useShort) && (val.r % 17 === 0) && (val.g % 17 === 0) && (val.b % 17 === 0)) {
        int = (val.r / 17) << 8 | (val.g / 17) << 4 | (val.b / 17);
        len = 4;
      } else {
        int = val.r << 16 | val.g << 8 | val.b;
        len = 7;
      }
      return "#" + (function(h){
        // add right amount of left-padding
        return new Array(len-h.length).join("0")+h
      })(int.toString(16).toUpperCase());
    };
    // modified from https://gist.github.com/xpansive/1337890
    IroColor.prototype.getHsl = function () {
      var s = (this.value.s / 100), v = (this.value.v / 100);
      var p = (2 - s) * v;
      s = (s == 0) ? (0) : (s * v / (p < 1 ? p : 2 - p));
      return {h: this.value.h, s: ~~(s * 100), l: ~~(p * 50)};
    };
    IroColor.prototype.getHslString = function () {
      var val = this.getHsl();
      return [val.a ? "hsla" : "hsl", "(", val.h, ", ", val.s, "%, ", val.l, "%", val.a ? ", " + val.a : "", ")"].join("");
    };

    return IroColor;

  })();

  var ExtendedColor = (function () {

    function IroExtendedColor (str) {
      if (!(this instanceof IroExtendedColor)) return new IroExtendedColor(str);
      this._watchCallback;
      this._oldValue = {h: undefined, s: undefined, v: undefined};
      Color.call(this, str);
    }

    // inherit prototype from Color
    IroExtendedColor.prototype = Object.create(Color.prototype);
    IroExtendedColor.prototype.constructor = IroExtendedColor;

    IroExtendedColor.prototype.watch = function (callback) {
      this._watchCallback = callback;
    };

    IroExtendedColor.prototype.unwatch = function () {
      this._watchCallback = undefined;
    };

    IroExtendedColor.prototype.set = function (newValue) {
      // loop through the channels and check if any of them have changed
      var changed = {};
      for (var channel in this._oldValue){
        if (!newValue.hasOwnProperty(channel)) newValue[channel] = this._oldValue[channel];
        changed[channel] = !(newValue[channel] == this._oldValue[channel]);
      };
      // update the current value
      this.value = newValue;
      // if the value has changed, call hook callback
      if(changed.h || changed.s || changed.v) {
        // call the dev-set callback if there is one
        if (typeof this._watchCallback == "function") this._watchCallback(this.value, this._oldValue, changed);
      };
      // update the old value
      this._oldValue = newValue;
    };

    return IroExtendedColor;

  })();

  var StylesheetWriter = (function () {
    var sheet;
    // CSSRule index reference storage
    var selectorMap = {};
    var supportsInsertRule;

    return {
      snakeCase: function (str) {
        return str.replace(/([A-Z])/g, function($1) {
          return "-" + $1.toLowerCase();
        });
      },
      getSheet: function () {
        if (!sheet) {
          var style = document.createElement("style");
          style.appendChild(document.createTextNode(""));
          style.title = "iroStyleSheet";
          document.head.appendChild(style);
          sheet = style.sheet;
          supportsInsertRule = (sheet.insertRule == undefined) ? false : true;
        };
        return sheet;
      },
      getRules: function () {
        var sheet = this.getSheet();
        return sheet.rules || sheet.cssRules;
      },
      setRule: function (selector, property, value) {
        var rules = this.getRules();
        // convert property to snake-case
        property = this.snakeCase(property);
        // if the selector hasn't been used yet
        if (!selectorMap.hasOwnProperty(selector)){
          var index = rules.length;
          // insert the new rule into the stylesheet
          if (supportsInsertRule) {
            sheet.insertRule([selector, " {", property, ": ", value, ";}"].join(""), index);
          } else {
            sheet.addRule(selector, [property, ": ", value].join(""), index);
          }
          selectorMap[selector] = index;
        }
        // if the selector has already been added, then we can use the style object
        else {
          rules[selectorMap[selector]].style.setProperty(property, value);
        }
      }
    };
  })();

  var ColorWheel = (function () {

    var active;

    function bodyInputMove(e) {
      if (active) active._inputMove(e);
    }

    function bodyInputEndHandler(e) {
      if (active){
        e.preventDefault();
        active._target = undefined;
        active = undefined;
      }
    }

    whenReady(function () {
      document.body.addEventListener("touchmove", bodyInputMove, false);
      document.body.addEventListener("touchend", bodyInputEndHandler, false);
      document.body.addEventListener("mousemove", bodyInputMove, false);
      document.body.addEventListener("mouseup", bodyInputEndHandler, false);
    }.bind(this));

    function createCanvas(width, height, useInlineStyles) {
      var canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      if (useInlineStyles) {
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
      }
      return canvas;
    };

    function IroColorWheel(el, opts) {
      if (!(this instanceof IroColorWheel)) return new IroColorWheel(el, opts);
      this.el = ("string" == typeof el) ? (document.querySelector(el)) : (el);
      this.width = opts.width || parseInt(this.el.getAttribute("width")) || 320;
      this.height = opts.height || parseInt(this.el.getAttribute("height")) || 320;

      this.el.style.position = "relative";
      this.main = this.el.appendChild(createCanvas(this.width, this.height, false));
      this.mainCtx = this.main.getContext("2d");
      this.overlay = this.el.appendChild(createCanvas(this.width, this.height, true));
      this.overlayCtx = this.overlay.getContext("2d");

      this._layout = this._solveLayout(opts);

      this._drawSlider();

      this.styles = opts.css || opts.styles || undefined;
      this._watchCallback = opts.watchCallback || undefined;
      this._overlayMarkers = {};
      this._target;

      whenReady(function () {
        this.el.addEventListener("touchstart", this._inputStart.bind(this), false);
        this.el.addEventListener("mousedown", this._inputStart.bind(this), false);
      }.bind(this));

      this.color = ExtendedColor();
      this.color.watch(this._update.bind(this));
      // prevent the color watch callback from accidentally being overwritten
      this.color.watch = this.color.unwatch = undefined;
      this.color.setFromString(opts.color || "#fff");

    };

    IroColorWheel.prototype._solveLayout = function (opts) {
      var padding = opts.padding + 2 || 6;
      var sliderMargin = opts.sliderMargin || 24;
      var markerRadius = opts.markerRadius || 8;
      var sliderHeight = opts.sliderHeight || (markerRadius * 2) + (padding * 2);
      var ringDiameter = Math.min(this.height - sliderHeight - sliderMargin, this.width);
      var horizontalMargin = (this.width - ringDiameter) / 2;

      return {
        // marker radius
        Mr: markerRadius,
        // ring diameter
        Rd: ringDiameter,
        // ring radius
        Rr: ringDiameter / 2,
        // ring marker limit (Ring End)
        Re: (ringDiameter / 2) - (markerRadius + padding),
        // ring center x
        Rcx: horizontalMargin + (ringDiameter / 2),
        // ring center y
        Rcy: ringDiameter / 2,
        // ring bounds x1 (left)
        Rx1: horizontalMargin,
        // ring bounds x2 (right)
        Rx2: horizontalMargin + ringDiameter,
        // ring bounds y1 (top)
        Ry1: 0,
        // ring bounds y2 (bottom)
        Ry2: ringDiameter,
        // slider width
        Sw: ringDiameter,
        // slider height
        Sh: sliderHeight,
        // slider radius
        Sr: sliderHeight / 2,
        // slider rail width
        Srw: ringDiameter - sliderHeight,
        // slider rail start
        Srs: horizontalMargin + (sliderHeight / 2),
        // slider rail end
        Sre: (horizontalMargin + ringDiameter) - (sliderHeight / 2),
        // slider bounds x1 (left)
        Sx1: horizontalMargin,
        // slider bounds x1 (right)
        Sx2: horizontalMargin + ringDiameter,
        // slider bounds y1 (top)
        Sy1: ringDiameter + sliderMargin,
        // slider bounds y2 (bottom)
        Sy2: ringDiameter + sliderHeight + sliderMargin,
        // test if point x,y falls within the slider area (ignores border radius for simplicity)
        isPointInSlider: function (x, y) {
          return ((x > this.Sx1) && (x < this.Sx2) && (y > this.Sy1) && (y < this.Sy2));
        },
        // test if point x,y falls within the ring area
        isPointInRing: function (x, y) {
          var dx = Math.abs(x-this.Rcx),
              dy = Math.abs(y-this.Rcy);
          return (Math.sqrt(dx*dx + dy*dy) < this.Rr);
        }
      }
    };

    IroColorWheel.prototype.resize = function (opts) {
      if (opts && opts.width && opts.height){
        this.mainCtx.clearRect(0, 0, this.width, this.height);
        this.main.width = this.overlay.width = this.width = opts.width;
        this.main.height = this.overlay.height = this.height = opts.height;
        this._layout = this._solveLayout(opts);
        this._drawSlider();
        this._update(this.color.value, null, {h:true, s:true, v:true});
      }
    }

    IroColorWheel.prototype.watch = function (callback) {
      if (!this._watchCallback && "function" == typeof callback) {
        this._watchCallback = callback;
      }
    };

    IroColorWheel.prototype.unwatch = function () {
      this._watchCallback = undefined;
    };

    IroColorWheel.prototype._inputHandler = function (x, y) {
      var layout = this._layout;
      if (this._target == "slider") {
        x = Math.max(Math.min(x, layout.Sre), layout.Srs) - layout.Srs;
        // update color
        this.color.set({v: ~~((100 / layout.Srw) * x)});
      }
      else if (this._target == "ring") {
        // angle in radians, anticlockwise starting at 12 o'clock
        var r = Math.atan2(x - layout.Rcx, y - layout.Rcy);
        // hue in degrees, clockwise from 3 o'clock
        var h = 360 - ~~(((r * (180 / Math.PI)) + 270) % 360);
        // distance from center
        var d = Math.min(Math.sqrt((layout.Rcx-x) * (layout.Rcx-x) + (layout.Rcy-y) * (layout.Rcy-y)), layout.Re);
        // update color
        this.color.set({h: h, s: ~~((100 / layout.Re) * d)});
      }
    };

    IroColorWheel.prototype._inputStart = function (e) {
      e.preventDefault();
      e = (e.touches) ? e.changedTouches[0] : e;
      var rect = this.main.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;
      if (this._layout.isPointInSlider(x, y)) {
        this._target = "slider";
      }
      else if (this._layout.isPointInRing(x, y)) {
        this._target = "ring";
      }
      else {
        return false;
      }
      active = this;
      this._inputHandler(x, y);
    };

    IroColorWheel.prototype._inputMove = function (e) {
      if (active) {
        e.preventDefault();
        e = (e.touches) ? e.changedTouches[0] : e;
        var rect = this.main.getBoundingClientRect();
        this._inputHandler(e.clientX - rect.left, e.clientY - rect.top);
      }
    };

    IroColorWheel.prototype._drawMarkerAtPos = function (x, y) {
      this.overlayCtx.lineWidth = 4;
      this.overlayCtx.beginPath();
      this.overlayCtx.strokeStyle = "#333";
      this.overlayCtx.arc(x, y, this._layout.Mr, 0, 2 * Math.PI);
      this.overlayCtx.stroke();
      this.overlayCtx.lineWidth = 2;
      this.overlayCtx.beginPath();
      this.overlayCtx.strokeStyle = "#fff";
      this.overlayCtx.arc(x, y, this._layout.Mr, 0, 2 * Math.PI);
      this.overlayCtx.stroke();
    };

    IroColorWheel.prototype._updateMarker = function (marker, x, y) {
      this._overlayMarkers[marker] = {x:x, y:y};
      this.overlayCtx.clearRect(0, 0, this.width, this.height);
      if (this._overlayMarkers.ring){
        this._drawMarkerAtPos(this._overlayMarkers.ring.x, this._overlayMarkers.ring.y);
      }
      if (this._overlayMarkers.slider){
        this._drawMarkerAtPos(this._overlayMarkers.slider.x, this._overlayMarkers.slider.y);
      }
    };

    IroColorWheel.prototype._drawWheel = function (value) {
      // clamp value between 0 and 100
      value = (value === undefined) ? 100 : Math.min(Math.max(value, 0), 100);
      var layout = this._layout;
      // approximate a suitable line width based on the ring diameter
      this.mainCtx.lineWidth = Math.round(1 + layout.Rd / 100);
      this.mainCtx.clearRect(layout.Rx1, layout.Ry1, layout.Rd, layout.Rd);
      // draw the ring with a series of line segments
      for (var hue = 0; hue < 360; hue++) {
        // h = hue, a = hue angle in radians
        var hueRadians = hue * Math.PI / 180;
        this.mainCtx.beginPath();
        this.mainCtx.strokeStyle=["hsl(", hue, ", 100%, ", value / 2, "%)"].join("");
        this.mainCtx.moveTo(layout.Rcx, layout.Rcy);
        this.mainCtx.lineTo(layout.Rcx + layout.Rr * Math.cos(hueRadians), layout.Rcy + layout.Rr * Math.sin(hueRadians));
        this.mainCtx.stroke();
      }
      // draw saturation gradient
      var grad = this.mainCtx.createRadialGradient(layout.Rcx, layout.Rcy, 2, layout.Rcx, layout.Rcy, layout.Re);
      grad.addColorStop(0, "hsla(0, 0%, " + value + "%, 1)");
      grad.addColorStop(1, "hsla(0, 0%, " + value + "%, 0)");
      this.mainCtx.fillStyle = grad;
      this.mainCtx.fillRect(layout.Rx1, layout.Ry1, layout.Rd, layout.Rd);
    };

    IroColorWheel.prototype._drawSlider = function () {
      var layout = this._layout;
      var grad = this.mainCtx.createLinearGradient(layout.Sx1, layout.Sy1, layout.Sx2, layout.Sy1);
      grad.addColorStop(0, "#000");
      grad.addColorStop(1, "#fff");
      this.mainCtx.fillStyle = grad;
      this.mainCtx.clearRect(layout.Sx1, layout.Sy1, layout.Sw, layout.Sh);
      this.mainCtx.beginPath();
      this.mainCtx.moveTo(layout.Sx1 + layout.Sr, layout.Sy1);
      // IE 9 has an issue with arcTo() not working properly, so we have to use the slightly-less-accurate quadraticCurveTo method
      if (browserIsIE) {
        // top edge
        this.mainCtx.lineTo(layout.Sx2 - layout.Sr, layout.Sy1);
        // top-right corner
        this.mainCtx.quadraticCurveTo(layout.Sx2, layout.Sy1, layout.Sx2, layout.Sy1 + layout.Sr);
        // right edge
        this.mainCtx.lineTo(layout.Sx2, layout.Sy2 - layout.Sr);
        // bottom-right corner
        this.mainCtx.quadraticCurveTo(layout.Sx2, layout.Sy2, layout.Sx2 - layout.Sr, layout.Sy2);
        // bottom edge
        this.mainCtx.lineTo(layout.Sx1 + layout.Sr, layout.Sy2);
        // bottom-left corner
        this.mainCtx.quadraticCurveTo(layout.Sx1, layout.Sy2, layout.Sx1, layout.Sy2 - layout.Sr);
        // left edge
        this.mainCtx.lineTo(layout.Sx1, layout.Sy1 + layout.Sr);
        // top-left corner
        this.mainCtx.quadraticCurveTo(layout.Sx1, layout.Sy1, layout.Sx1 + layout.Sr, layout.Sy1);
      } else {
        this.mainCtx.arcTo(layout.Sx2, layout.Sy1, layout.Sx2, layout.Sy2, layout.Sr);
        this.mainCtx.arcTo(layout.Sx2, layout.Sy2, layout.Sx1, layout.Sy2, layout.Sr);
        this.mainCtx.arcTo(layout.Sx1, layout.Sy2, layout.Sx1, layout.Sy1, layout.Sr);
        this.mainCtx.arcTo(layout.Sx1, layout.Sy1, layout.Sx2, layout.Sy1, layout.Sr);
      }
      this.mainCtx.closePath();
      this.mainCtx.fill();
    };

    IroColorWheel.prototype._update = function (newValue, oldValue, changed) {
      var layout = this._layout;
      if ("function" == typeof this._watchCallback) this._watchCallback.call(this, this.color, changed);
      if (changed.v) {
        this._drawWheel(newValue.v);
        var x = ((newValue.v / 100) * layout.Srw);
        this._updateMarker("slider", layout.Srs + x, layout.Sy1 + (layout.Sh / 2));
      }
      if (changed.h || changed.s) {
        var hue = changed.h ? newValue.h : oldValue.h;
        var saturation = changed.s ? newValue.s : oldValue.s;
        var hueRadians = hue * (Math.PI/180);
        var distance = (saturation / 100) * layout.Re;
        this._updateMarker("ring", layout.Rcx + distance * Math.cos(hueRadians), layout.Rcy + distance * Math.sin(hueRadians));
      }
      if (this.styles) {
        var color = this.color.getRgbString();
        var css = this.styles;
        for (var selector in css){
          var ruleSet = css[selector];
          for (var property in ruleSet) {
            // var value = ruleSet[property];
            StylesheetWriter.setRule(selector, property, color);
          }
        }
      }
    };

    return IroColorWheel;

  })();

  // Export

  var iro = {
    StylesheetWriter: StylesheetWriter,
    Color: Color,
    ExtendedColor: ExtendedColor,
    ColorWheel: ColorWheel
  }

  if ("function" == typeof define && define.amd) {
    // AMD
    define(iro);
  } else if ("object" == typeof exports) {
    // CommonJS
    module.exports = iro;
  } else {
    // browser global
    window.iro = iro;
  }

})(window);
