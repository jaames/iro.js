(function () {

  'use strict';

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
    // set color from CSS color string
    // supports rgb hexadecimal (including shorthands), rgb(a) and hsl(a)
    IroColor.prototype.setFromString = function (str) {
      var value;
      // (try to) detect the type of the color string using regex -- needs a lof of improvement
      var parsed = str.match(/(^rgba?|^hsla?)(?=\(.*?\))|(^#)(?=[a-f0-9])/i);
      switch (parsed ? parsed[0] : null) {
        case "#":
          value = rgbToHsv(hexSringToRgb(str));
          break;
        case "rgb":
        case "rgba":
          var parsedStr = str.match(/(rgba?)\((\d+)(?:\D+?)(\d+)(?:\D+?)(\d+)(?:\D+?)?([0-9\.]+?)?\)/i);
          value = rgbToHsv({
            r: parseInt(parsedStr[2]),
            g: parseInt(parsedStr[3]),
            b: parseInt(parsedStr[4])
          });
          break;
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
      return {
        h: this.value.h,
        s: ~~(s * 100),
        l: ~~(p * 50),
      };
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
        if (typeof this._watchCallback === "function") this._watchCallback(this.value, this._oldValue, changed);
      };
      // update the old value
      this._oldValue = newValue;
    };

    return IroExtendedColor;

  })();

  var styleSheetWriter = (function () {
    // CSSRule index reference storage
    var selectorMap = {};
    var supportsInsertRule;

    return {
      getSheet: (function () {
        var sheet = false;
        return function () {
          if (!sheet) {
            var style = document.createElement("style");
            style.setAttribute("media", "screen");
            style.appendChild(document.createTextNode(""));
            style.title = "iroStyleSheet";
            document.head.appendChild(style);
            sheet = style.sheet;
            supportsInsertRule = (sheet.insertRule) ? true : false;
          };
          return sheet;
        }
      })(),
      setRule: function (selector, property, value) {
        var sheet = this.getSheet();
        var rules = sheet.rules || sheet.cssRules;
        // convert property to snake-case
        property = property.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
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

    document.body.addEventListener('mousemove', function (e) {
      if (active) active._mousemoveHandler(e);
    }, false);

    document.body.addEventListener('mouseup', function (e) {
      if (active){
        active._mouseTarget = undefined;
        active = undefined;
      }
    }, false);

    function _createCanvas(width, height, useInlineStyles) {
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
      if (!el) {
        console.warn("IroColorPicker error - no element specified");
        return false;
      }
      this.el = (typeof el === "string") ? (document.querySelector(el)) : (el);
      this.width = opts.width || parseInt(this.el.getAttribute("width")) || 500;
      this.height = opts.height || parseInt(this.el.getAttribute("height")) || 500;

      var useInlineStyles = opts.useInlineStyles || true;

      this.main = _createCanvas(this.width, this.height, useInlineStyles);
      this.el.appendChild(this.main);
      this.overlay = _createCanvas(this.width, this.height, useInlineStyles);
      this.el.appendChild(this.overlay);

      this.mainCtx = this.main.getContext("2d");
      this.overlayCtx = this.overlay.getContext("2d");

      var padding = 6;
      var sliderMargin = 24;
      var markerRadius = 8;
      var sliderHeight = (markerRadius * 2) + (padding * 2);
      // d = the max diameter for the ring that fits the remaining space
      var d = Math.min(this.height - sliderHeight - sliderMargin, this.width);
      // m = the horizontal margin
      var m = (this.width - d) / 2;

      this._layout = {
        // marker radius
        Mr: markerRadius,
        // ring diameter
        Rd: d,
        // ring radius
        Rr: d/2,
        // ring marker limit (Ring End)
        Re: (d/2) - (markerRadius + padding),
        // ring center x
        Rcx: m + d/2,
        // ring center y
        Rcy: d/2,
        // ring bounds x1 (left)
        Rx1: m,
        // ring bounds x2 (right)
        Rx2: m + d,
        // ring bounds y1 (top)
        Ry1: 0,
        // ring bounds y2 (bottom)
        Ry2: d,
        // slider width
        Sw: d,
        // slider height
        Sh: sliderHeight,
        // slider radius
        Sr: sliderHeight / 2,
        // slider rail width
        Srw: d - ((markerRadius + padding) * 2),
        // slider rail start
        Srs: m + (markerRadius + padding),
        // slider rail end
        Sre: (m + d) - (markerRadius + padding),
        // slider bounds x1 (left)
        Sx1: m,
        // slider bounds x1 (right)
        Sx2: m + d,
        // slider bounds y1 (top)
        Sy1: d + sliderMargin,
        // slider bounds y2 (bottom)
        Sy2: d + sliderHeight + sliderMargin,
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

      this.css = opts.css || undefined;
      this._watchCallback = opts.watchCallback || undefined;
      this._overlayMarkers = {};
      this._mouseTarget;

      this.el.addEventListener("mousedown", this._mousedownHandler.bind(this), false);
      this._drawSlider();
      this.color = ExtendedColor();
      this.color.watch(this._update.bind(this));
      // prevent the color watch callback from accidentally being overwritten
      this.color.watch = this.color.unwatch = undefined;
      this.color.setFromString(opts.color || "#fff");
    };

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
      if (this._mouseTarget == 'slider') {
        x = Math.max(Math.min(x, layout.Sre), layout.Srs) - layout.Srs;
        // update color
        this.color.set({v: ~~((100 / layout.Srw) * x)});
      }
      else if (this._mouseTarget == 'ring') {
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

    IroColorWheel.prototype._mousedownHandler = function (e) {
      active = this;
      var rect = this.main.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      if (this._layout.isPointInSlider(x, y)) {
        this._mouseTarget = "slider";
        this._inputHandler(x, y);
      }
      else if (this._layout.isPointInRing(x, y)) {
        this._mouseTarget = "ring";
        this._inputHandler(x, y);
      }
    };

    IroColorWheel.prototype._mousemoveHandler = function (e) {
      if (active) {
        var rect = this.main.getBoundingClientRect();
        this._inputHandler(e.clientX - rect.left, e.clientY - rect.top);
      }
    };

    IroColorWheel.prototype._drawMarkerAtPos = function (x, y) {
      this.overlayCtx.lineWidth = 4;
      this.overlayCtx.beginPath();
      this.overlayCtx.strokeStyle="#333";
      this.overlayCtx.arc(x, y, this._layout.Mr, 0, 2*Math.PI);
      this.overlayCtx.stroke();
      this.overlayCtx.lineWidth = 2;
      this.overlayCtx.beginPath();
      this.overlayCtx.strokeStyle="#fff";
      this.overlayCtx.arc(x, y, this._layout.Mr, 0, 2*Math.PI);
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

    IroColorWheel.prototype._drawWheel = function (v) {
      // clamp value between 0 and 100
      v = (v === undefined) ? 100 : Math.min(Math.max(v, 0), 100);
      var layout = this._layout;
      // approximate a suitable line width based on the ring diameter
      this.mainCtx.lineWidth = Math.round(layout.Rd / 100);
      this.mainCtx.clearRect(layout.Rx1, layout.Ry1, layout.Rd, layout.Rd);
      // draw the ring with a series of line segments
      for (var h = 0; h < 360; h++) {
        // h = hue, a = hue angle in radians
        var a = h * Math.PI / 180;
        // c = cosine value, s = sine value
        var c = Math.cos(a),
            s = Math.sin(a);
        this.mainCtx.beginPath();
        this.mainCtx.strokeStyle=["hsl(", h, ", 100%, ", v/2, "%)"].join("");
        this.mainCtx.moveTo(layout.Rcx, layout.Rcy);
        this.mainCtx.lineTo(layout.Rcx + layout.Rr * c, layout.Rcy + layout.Rr * s);
        this.mainCtx.stroke();
      }
      // draw saturation gradient
      var grad = this.mainCtx.createRadialGradient(layout.Rcx, layout.Rcy, 2, layout.Rcx, layout.Rcy, layout.Re);
      grad.addColorStop(0, "hsla(0, 0%, " + v + "%, 1)");
      grad.addColorStop(1, "hsla(0, 0%, " + v + "%, 0)");
      this.mainCtx.fillStyle = grad;
      this.mainCtx.fillRect(layout.Rx1, layout.Ry1, layout.Rd, layout.Rd);
    };

    IroColorWheel.prototype._drawSlider = function () {
      var layout = this._layout;
      this.mainCtx.clearRect(layout.Sx1, layout.Sy1, layout.Sw, layout.Sh);
      this.mainCtx.beginPath();
      this.mainCtx.moveTo(layout.Sx1 + layout.Sr, layout.Sy1);
      this.mainCtx.arcTo(layout.Sx2, layout.Sy1, layout.Sx2, layout.Sy2, layout.Sr);
      this.mainCtx.arcTo(layout.Sx2, layout.Sy2, layout.Sx1, layout.Sy2, layout.Sr);
      this.mainCtx.arcTo(layout.Sx1, layout.Sy2, layout.Sx1, layout.Sy1, layout.Sr);
      this.mainCtx.arcTo(layout.Sx1, layout.Sy1, layout.Sx2, layout.Sy1, layout.Sr);
      this.mainCtx.closePath();

      var grad = this.mainCtx.createLinearGradient(layout.Sx1, layout.Sy1, layout.Sx2, layout.Sy1);
      grad.addColorStop(0, "#000");
      grad.addColorStop(1, "#fff");

      this.mainCtx.fillStyle = grad;
      this.mainCtx.fill();
    };

    IroColorWheel.prototype._update = function (newValue, oldValue, changed) {
      var layout = this._layout;
      if ("function" == typeof this._watchCallback) this._watchCallback.call(this, this.color, changed);
      if (changed.v) {
        this._drawWheel(newValue.v);
        var x = ((newValue.v / 100) * layout.Srw);
        this._updateMarker('slider', layout.Srs + x, layout.Sy1 + (layout.Sh / 2));
      }
      if (changed.h || changed.s) {
        var h = changed.h ? newValue.h : oldValue.h;
        var s = changed.s ? newValue.s : oldValue.s;
        var hR = h * (Math.PI/180);
        var d = (s / 100) * layout.Re;
        this._updateMarker('ring', layout.Rcx + d * Math.cos(hR), layout.Rcy + d * Math.sin(hR));
      }
      if (this.css) {
        var color = this.color.getRgbString();
        var css = this.css;
        for (var selector in css){
          var ruleSet = css[selector];
          for (var property in ruleSet) {
            // var value = ruleSet[property];
            styleSheetWriter.setRule(selector, property, color);
          }
        }
      }
    };

    return IroColorWheel;

  })();

  // assign iro to a global object
  window.iro = {
    styleSheetWriter: styleSheetWriter,
    Color: Color,
    ExtendedColor: ExtendedColor,
    ColorWheel: ColorWheel
  }

})();
