"use strict";

(function (window) {

  // add event listener util
  var addEventListener = function (el, ev, callback) {
    el.addEventListener(ev, callback, false);
  };

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
  var browserIsIE = /MSIE ([0-9]+)/g.test(navigator.userAgent);

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
          s = max === 0 ? 0 : d / max,
          v = max / 255;
      switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
      }
      return {h: ~~(h * 360), s: ~~(s * 100), v: ~~(v * 100)};
    }
    // convert hsl to hsv:
    // e,g, {h:50, s:100, l: 50} -> {h:50, s:100, v:100}
    // modified from https://gist.github.com/xpansive/1337890
    function hslToHsv(val) {
      var s = val.s/100, l = val.l/100;
      s *= l < 0.5 ? l : 1-l;
      return {
        h: val.h,
        s: ~~((2 * s / (l+s))*100),
        v: ~~((l+s)*100)
      };
    }
    // convert a HEX color code to RGB:
    // e.g. #FF0000 -> {r:255, g:255, b:255}
    function hexSringToRgb(hex) {
      // strip "#"
      hex = hex.replace(/#/g, '');
      // convert to an integer
      var int = ~~("0x" + hex);
      // if hex is in shorthand format, we need to multiply each channel value by 17
      return hex.length === 3 ? {
        r: (int >> 8) * 17,
        g: (int >> 4 & 0xF) * 17,
        b: (int & 0xF) * 17
      } : {
        r: int >> 16,
        g: int >> 8 & 0xFF,
        b: int & 0xFF
      };
    }

    // iro color constructor

    function IroColor (str) {
      if (!(this instanceof IroColor)) return new IroColor(str);
      this._watchCallback;
      this._hsv = {};
      this._oldHsv = {h: undefined, s: undefined, v: undefined};
      Object.defineProperties(this, {
        "hsv": {
          set: this.setHsv,
          get: function () {
            return this._hsv;
          },
          enumerable: true
        },
        "hexString": {
          set: this.setFromString,
          get: this.getHexString,
          enumerable: true
        },
        "rgb": {
          set: this.setRgb,
          get: this.getRgb,
          enumerable: true
        },
        "rgbString": {
          set: this.setFromString,
          get: this.getRgbString,
          enumerable: true
        },
        "hsl": {
          set: this.setHsl,
          get: this.getHsl,
          enumerable: true
        },
        "hslString": {
          set: this.setFromString,
          get: this.getHslString,
          enumerable: true
        }
      });
      if (str) this.setFromString(str);
    }

    var IroColorPrototype = IroColor.prototype;

    IroColorPrototype.watch = function (callback) {
      this._watchCallback = callback;
    };
    IroColorPrototype.unwatch = function () {
      this._watchCallback = undefined;
    };
    IroColorPrototype.setHsv = function (newValue) {
      // loop through the channels and check if any of them have changed
      var changed = {};
      for (var channel in this._oldHsv){
        if (!newValue.hasOwnProperty(channel)) newValue[channel] = this._oldHsv[channel];
        changed[channel] = !(newValue[channel] == this._oldHsv[channel]);
      }
      this._hsv = newValue;
      // if the value has changed, call hook callback
      if ((changed.h || changed.s || changed.v) && ("function" == typeof this._watchCallback)) this._watchCallback(newValue, this._oldHsv, changed);
      // update the old value
      this._oldHsv = newValue;
    };

    IroColorPrototype.setRgb = function (val) {
      this.hsv = rgbToHsv(val);
    };
    IroColorPrototype.setHsl = function (val) {
      this.hsv = hslToHsv(val);
    };
    // set color from CSS color string
    // supports rgb hexadecimal (including shorthands), rgb(a) and hsl(a)
    IroColorPrototype.setFromString = function (str) {
      // (try to) detect the type of the color string using regex -- needs a lof of improvement
      var parsed = str.match(/(^rgba?|^hsla?)(?=\(.*?\))|(^#)(?=[a-f0-9])/i);
      var parsedStr;
      // once we have an idea of what the string type is, we can then parse it:
      switch (parsed ? parsed[0] : null) {
        // HEX color notation; e.g #ffff00, #FFFF00, #ff0, etc...
        case "#":
          this.hsv = rgbToHsv(hexSringToRgb(str));
          break;
        // rgb color notation; e.g rgb(255, 255, 0), rgba(255, 255, 0, 1)
        case "rgb":
        case "rgba":
          parsedStr = str.match(/(rgba?)\((\d+)(?:\D+?)(\d+)(?:\D+?)(\d+)(?:\D+?)?([0-9\.]+?)?\)/i);
          this.hsv = rgbToHsv({
            r: parseInt(parsedStr[2]),
            g: parseInt(parsedStr[3]),
            b: parseInt(parsedStr[4])
          });
          break;
        // hsl color notation; e.g hsl(60, 100%, 50%), hsla(60, 100%, 50%, 1)
        case "hsl":
        case "hsla":
          parsedStr = str.match(/(hsla?)\((\d+)(?:\D+?)(\d+)(?:\D+?)(\d+)(?:\D+?)?([0-9\.]+?)?\)/i);
          this.hsv = hslToHsv({
            h: parseInt(parsedStr[2]),
            s: parseInt(parsedStr[3]),
            l: parseInt(parsedStr[4])
          });
          break;
        default:
          console.warn("Error: '", str, "' could not be parsed as a CSS color");
      }
    }
    // modified from https://gist.github.com/mjackson/5311256#file-color-conversion-algorithms-js-L119
    IroColorPrototype.getRgb = function () {
      var hsv = this.hsv;
      var r, g, b, i, f, p, q, t;
      var h = hsv.h/360, s = hsv.s/100, v = hsv.v/100;
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
    IroColorPrototype.getRgbString = function () {
      var rgb = this.rgb;
      return [rgb.a ? "rgba" : "rgb", "(", rgb.r, ", ", rgb.g, ", ", rgb.b, rgb.a ? ", " + rgb.a : "", ")"].join("");
    };
    IroColorPrototype.getHexString = function (useShort) {
      var rgb = this.rgb;
      var int, len;
      // check if value can be compressed to shorthand format (if useShort === true)
      // in shorthand, all channels should be able to be divided by 17 cleanly
      if (useShort && (rgb.r % 17 === 0) && (rgb.g % 17 === 0) && (rgb.b % 17 === 0)) {
        int = (rgb.r / 17) << 8 | (rgb.g / 17) << 4 | (rgb.b / 17);
        len = 4;
      } else {
        int = rgb.r << 16 | rgb.g << 8 | rgb.b;
        len = 7;
      }
      return "#" + (function(h){
        // add right amount of left-padding
        return new Array(len-h.length).join("0")+h
      })(int.toString(16));
    };
    // modified from https://gist.github.com/xpansive/1337890
    IroColorPrototype.getHsl = function () {
      var hsv = this.hsv;
      var s = hsv.s / 100,
          v = hsv.v / 100;
      var p = (2 - s) * v;
      s = s == 0 ? 0 : s * v / (p < 1 ? p : 2 - p);
      return {h: hsv.h, s: ~~(s * 100), l: ~~(p * 50)};
    };
    IroColorPrototype.getHslString = function () {
      var hsl = this.hsl;
      return [hsl.a ? "hsla" : "hsl", "(", hsl.h, ", ", hsl.s, "%, ", hsl.l, "%", hsl.a ? ", " + hsl.a : "", ")"].join("");
    };

    return IroColor;

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
          supportsInsertRule = sheet.insertRule == undefined ? false : true;
        }
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
      var body = document.body;
      addEventListener(body, "touchmove", bodyInputMove);
      addEventListener(body, "touchend", bodyInputEndHandler);
      addEventListener(body, "mousemove", bodyInputMove);
      addEventListener(body, "mouseup", bodyInputEndHandler);
    }.bind(this));

    function createCanvas(width, height, pxRatio, positionAbsolute) {
      var canvas = document.createElement("canvas");

      var pxWidth = width * pxRatio;
      var pxHeight = height * pxRatio;

      canvas.width = pxWidth;
      canvas.height = pxHeight;

      canvas.style.cssText += "width:" + width + "px;" + "height" + height + "px";

      var ratio = pxWidth / width;
      canvas.getContext("2d").scale(pxRatio, pxRatio);
      if (positionAbsolute) {
        canvas.style.cssText += "position:absolute;top:0;left:0";
      }
      return canvas;
    }

    function IroColorWheel(el, opts) {
      if (!(this instanceof IroColorWheel)) return new IroColorWheel(el, opts);
      this.el = "string" == typeof el ? document.querySelector(el) : el;
      var width = opts.width || parseInt(this.el.getAttribute("width")) || 320;
      var height = opts.height || parseInt(this.el.getAttribute("height")) || 320;
      var pxRatio =  window.devicePixelRatio || 1;

      this.width = width;
      this.height = height;
      this.pxRatio = pxRatio;

      this.el.style.position = "relative";

      this.main = this.el.appendChild(createCanvas(width, height, pxRatio, false));
      this.mainCtx = this.main.getContext("2d");
      this.overlay = this.el.appendChild(createCanvas(width, height, pxRatio, true));
      this.overlayCtx = this.overlay.getContext("2d");

      this._layout = this._solveLayout(opts || {});

      this._drawSlider();

      this.styles = opts.css || opts.styles || undefined;
      this._watchCallback = opts.watchCallback || undefined;
      this._overlayMarkers = {};
      this._target;

      whenReady(function () {
        var el = this.el;
        addEventListener(el, "touchstart", this._inputStart.bind(this));
        addEventListener(el, "mousedown", this._inputStart.bind(this));
      }.bind(this));

      this.color = Color();
      this.color.watch(this._update.bind(this));
      // prevent the color watch callback from accidentally being overwritten
      this.color.watch = this.color.unwatch = undefined;
      this.color.setFromString(opts.color || "#fff");
    }

    var IroColorWheelPrototype = IroColorWheel.prototype;

    IroColorWheelPrototype._solveLayout = function (opts) {
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
          return (x > this.Sx1) && (x < this.Sx2) && (y > this.Sy1) && (y < this.Sy2);
        },
        // test if point x,y falls within the ring area
        isPointInRing: function (x, y) {
          var dx = Math.abs(x-this.Rcx),
              dy = Math.abs(y-this.Rcy);
          return Math.sqrt(dx*dx + dy*dy) < this.Rr;
        }
      }
    };

    IroColorWheelPrototype.resize = function (opts) {
      if (opts && opts.width && opts.height){
        this.mainCtx.clearRect(0, 0, this.width, this.height);
        this.main.width = this.overlay.width = this.width = opts.width;
        this.main.height = this.overlay.height = this.height = opts.height;
        this._layout = this._solveLayout(opts);
        this._drawSlider();
        this._update(this.color.hsv, null, {h:true, s:true, v:true});
      }
    }

    IroColorWheelPrototype.watch = function (callback) {
      if (!this._watchCallback && "function" == typeof callback) {
        this._watchCallback = callback;
      }
    };

    IroColorWheelPrototype.unwatch = function () {
      this._watchCallback = undefined;
    };

    IroColorWheelPrototype._inputHandler = function (x, y) {
      var layout = this._layout;
      if (this._target == "slider") {
        x = Math.max(Math.min(x, layout.Sre), layout.Srs) - layout.Srs;
        // update color
        this.color.hsv = {v: ~~((100 / layout.Srw) * x)};
      }
      else if (this._target == "ring") {
        // angle in radians, anticlockwise starting at 12 o'clock
        var r = Math.atan2(x - layout.Rcx, y - layout.Rcy);
        // hue in degrees, clockwise from 3 o'clock
        var h = 360 - ~~(((r * (180 / Math.PI)) + 270) % 360);
        // distance from center
        var d = Math.min(Math.sqrt((layout.Rcx-x) * (layout.Rcx-x) + (layout.Rcy-y) * (layout.Rcy-y)), layout.Re);
        // update color
        this.color.hsv = {h: h, s: ~~((100 / layout.Re) * d)};
      }
    };

    IroColorWheelPrototype._inputStart = function (e) {
      e.preventDefault();
      e = e.touches ? e.changedTouches[0] : e;
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

    IroColorWheelPrototype._inputMove = function (e) {
      if (active) {
        e.preventDefault();
        e = e.touches ? e.changedTouches[0] : e;
        var rect = this.main.getBoundingClientRect();
        this._inputHandler(e.clientX - rect.left, e.clientY - rect.top);
      }
    };

    IroColorWheelPrototype._drawMarkerRing = function (x, y, color, lineWidth) {
      var ctx = this.overlayCtx;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.arc(x, y, this._layout.Mr, 0, 2 * Math.PI);
      ctx.stroke();
    };

    IroColorWheelPrototype._drawMarker = function (x, y) {
      this._drawMarkerRing(x, y, "#333", 4);
      this._drawMarkerRing(x, y, "#fff", 2);
    };

    IroColorWheelPrototype._updateMarker = function (marker, x, y) {
      this._overlayMarkers[marker] = {x:x, y:y};
      this.overlayCtx.clearRect(0, 0, this.width, this.height);
      if (this._overlayMarkers.ring){
        this._drawMarker(this._overlayMarkers.ring.x, this._overlayMarkers.ring.y);
      }
      if (this._overlayMarkers.slider){
        this._drawMarker(this._overlayMarkers.slider.x, this._overlayMarkers.slider.y);
      }
    };

    IroColorWheelPrototype._drawWheel = function (value) {
      var layout = this._layout;
      var ctx = this.mainCtx;
      // approximate a suitable line width based on the ring diameter
      ctx.lineWidth = Math.round(1 + layout.Rd / 100);
      ctx.clearRect(layout.Rx1, layout.Ry1, layout.Rd, layout.Rd);
      // draw the ring with a series of line segments
      for (var hue = 0; hue < 360; hue++) {
        // h = hue, a = hue angle in radians
        var hueRadians = hue * Math.PI / 180;
        ctx.beginPath();
        ctx.strokeStyle=["hsl(", hue, ", 100%, ", value / 2, "%)"].join("");
        ctx.moveTo(layout.Rcx, layout.Rcy);
        ctx.lineTo(layout.Rcx + layout.Rr * Math.cos(hueRadians), layout.Rcy + layout.Rr * Math.sin(hueRadians));
        ctx.stroke();
      }
      // draw saturation gradient
      var grad = ctx.createRadialGradient(layout.Rcx, layout.Rcy, 2, layout.Rcx, layout.Rcy, layout.Re);
      grad.addColorStop(0, "hsla(0, 0%, " + value + "%, 1)");
      grad.addColorStop(1, "hsla(0, 0%, " + value + "%, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(layout.Rx1, layout.Ry1, layout.Rd, layout.Rd);
    };

    IroColorWheelPrototype._drawSlider = function () {
      var layout = this._layout;
      var ctx = this.mainCtx;
      var grad = ctx.createLinearGradient(layout.Sx1, layout.Sy1, layout.Sx2, layout.Sy1);
      grad.addColorStop(0, "#000");
      grad.addColorStop(1, "#fff");
      ctx.fillStyle = grad;
      ctx.clearRect(layout.Sx1, layout.Sy1, layout.Sw, layout.Sh);
      ctx.beginPath();
      ctx.moveTo(layout.Sx1 + layout.Sr, layout.Sy1);
      // IE 9 has an issue with arcTo() not working properly, so we have to use the slightly-less-accurate quadraticCurveTo method
      if (browserIsIE) {
        // top edge
        ctx.lineTo(layout.Sx2 - layout.Sr, layout.Sy1);
        // top-right corner
        ctx.quadraticCurveTo(layout.Sx2, layout.Sy1, layout.Sx2, layout.Sy1 + layout.Sr);
        // right edge
        ctx.lineTo(layout.Sx2, layout.Sy2 - layout.Sr);
        // bottom-right corner
        ctx.quadraticCurveTo(layout.Sx2, layout.Sy2, layout.Sx2 - layout.Sr, layout.Sy2);
        // bottom edge
        ctx.lineTo(layout.Sx1 + layout.Sr, layout.Sy2);
        // bottom-left corner
        ctx.quadraticCurveTo(layout.Sx1, layout.Sy2, layout.Sx1, layout.Sy2 - layout.Sr);
        // left edge
        ctx.lineTo(layout.Sx1, layout.Sy1 + layout.Sr);
        // top-left corner
        ctx.quadraticCurveTo(layout.Sx1, layout.Sy1, layout.Sx1 + layout.Sr, layout.Sy1);
      } else {
        ctx.arcTo(layout.Sx2, layout.Sy1, layout.Sx2, layout.Sy2, layout.Sr);
        ctx.arcTo(layout.Sx2, layout.Sy2, layout.Sx1, layout.Sy2, layout.Sr);
        ctx.arcTo(layout.Sx1, layout.Sy2, layout.Sx1, layout.Sy1, layout.Sr);
        ctx.arcTo(layout.Sx1, layout.Sy1, layout.Sx2, layout.Sy1, layout.Sr);
      }
      ctx.closePath();
      ctx.fill();
    };

    IroColorWheelPrototype._update = function (newValue, oldValue, changed) {
      var layout = this._layout;
      if ("function" == typeof this._watchCallback) this._watchCallback.call(null, this.color, changed);
      if (changed.v) {
        this._drawWheel(newValue.v);
        var x = (newValue.v / 100) * layout.Srw;
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
