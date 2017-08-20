import gradient from "ui/gradient";
import marker from "ui/marker";
import dom from "util/dom";

// Quick references to reused math functions
var PI = Math.PI,
    pow = Math.pow,
    sqrt = Math.sqrt,
    abs = Math.abs,
    round = Math.round;

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

/**
  * @constructor hue wheel UI
*/
let wheel = function (ctx, svg, opts) {
  this._ctx = ctx;
  this._opts = opts;
  this.type = "wheel";

  var defs = dom.appendNew(svg, "defs", {}, "SVG");

  var gradient = dom.appendNew(defs, "radialGradient", {
    "id": "wheelgradient"
  }, "SVG");

  var stop1 = dom.appendNew(gradient, "stop", {
    "offset": "0%",
    "stop-color": "#fff",
  }, "SVG");

  var stop2 = dom.appendNew(gradient, "stop", {
    "offset": "100%",
    "stop-color": "#fff",
    "stop-opacity": "0",
  }, "SVG");

  var group = dom.appendNew(svg, "g", {}, "SVG");

  for (var hue = 0; hue < 360; hue++) {
    dom.appendNew(group, "path", {
      "d": describeArc(opts.cX, opts.cY, opts.r/2, hue - 0.5, hue + 1.5),
      "stroke": "hsl(" + hue + ",100%," + (100 / 2) + "%)",
      "stroke-width": opts.r,
      "fill": "none",
    }, "SVG");
  }

  dom.appendNew(svg, "circle", {
    "r": opts.r + opts.border.w / 2,
    "fill": "url(#wheelgradient)",
    "stroke": opts.border.color,
    "stroke-width": opts.border.w,
    "cy": opts.cY,
    "cx": opts.cX,
  }, "SVG");

  this._lightnessLayer = dom.appendNew(svg, "circle", {
    "r": opts.r,
    "fill": "#000",
    "opacity": 1,
    "cy": opts.cY,
    "cx": opts.cX,
  }, "SVG");

  this.marker = new marker(svg, opts.marker);
};

wheel.prototype = {

  /**
    * @desc redraw this UI element
    * @param {Number} value - The hsv value component to use when drawing
  */
  draw: function (value) {
    dom.setAttr(this._lightnessLayer, {"opacity": 1 - (value / 100)});
    // var ctx = this._ctx;
    // var opts = this._opts;
    // var x = opts.cX,
    //     y = opts.cY,
    //     border = opts.border,
    //     borderWidth = border.w,
    //     radius = opts.r;

    // Clear the area where the wheel will be drawn
    // ctx.clearRect((x - radius) - borderWidth, (y - radius) - borderWidth, radius * 2, radius * 2);
    // ctx.lineWidth = radius;

    // The hue wheel is basically drawn with a series of thin "pie slices" - one slice for each hue degree
    // Here we calculate the angle for each slice, in radians
    // var sliceAngle = (2 * PI) / 360;

    // Create a loop to draw each slice
    // for (var hue = 0, sliceStart = 0; hue < 360; hue++, sliceStart += sliceAngle) {
    //   // Create a HSL color for the slice using the current hue value
    //   ctx.strokeStyle = "hsl(" + hue + ",100%," + (value / 2) + "%)";
    //   ctx.beginPath();
    //   // For whatever reason (maybe a rounding issue?) the slices had a slight gap between them, which caused rendering artifacts
    //   // So we make them overlap ever so slightly by adding a tiny value to the slice angle
    //   ctx.arc(x, y, radius / 2, sliceStart, sliceStart + sliceAngle + 0.04);
    //   ctx.stroke();
    // }

    // Create a radial gradient for "saturation"
    // var hslString = "hsla(0,0%," + value + "%,";
    // ctx.fillStyle = gradient.radial(ctx, x, y, 0, opts.rMax, {
    //   // The center of the color wheel should be pure white (0% saturation)
    //   0: hslString + "1)",
    //   // It gradially tapers to transparent white (or, visually, 100% saturation color already drawn) at the edge of the wheel
    //   1: hslString + "0)",
    // });
    // Draw a rect using the gradient as a fill style
    // ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  },

  /**
    * @desc updates this element to represent a new color value
    * @param {Object} color - an iroColor object with the new color value
    * @param {Object} changes - an object that gives a boolean for each HSV channel, indicating whether ot not that channel has changed
  */
  update: function (color, changes) {
    var opts = this._opts;
    var hsv = color.hsv;
    // If the V channel has changed, redraw the wheel UI with the new value
    if (changes.v) {
      this.draw(hsv.v);
    }
    // If the H or S channel has changed, move the marker to the right position
    if (changes.h || changes.s) {
      // convert the hue value to radians, since we'll use it as an angle
      var hueAngle = hsv.h * (PI/180);
      // convert the saturation value to a distance between the center of the ring and the edge
      var dist = (hsv.s / 100) * opts.rMax;
      // Move the marker based on the angle and distance
      this.marker.move(opts.cX + dist * Math.cos(hueAngle), opts.cY + dist * Math.sin(hueAngle));
    }
  },

  /**
    * @desc Takes a point at (x, y) and returns HSV values based on this input -- use this to update a color from mouse input
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Object} - new HSV color values (some channels may be missing)
  */
  input: function (x, y) {
    var opts = this._opts,
        cX = opts.cX,
        cY = opts.cY,
        radius = opts.r,
        rangeMax = opts.rMax;

    // Angle in radians, anticlockwise starting at 12 o'clock
    var angle = Math.atan2(x - cX, y - cY),
        // Calculate the hue by converting the angle to radians, and normalising the angle to 3 o'clock
        hue = 360 - (round(angle * (180 / PI)) + 270) % 360,
        // Find the point's distance from the center of the wheel
        // This is used to show the saturation level
        dist = Math.min(sqrt(pow(cX - x, 2) + pow(cY - y, 2)), rangeMax);

    // Return just the H and S channels, the wheel element doesn't do anything with the L channel
    return {
      h: hue,
      s: round((100 / rangeMax) * dist)
    };
  },

  /**
    * @desc Check if a point at (x, y) is inside this element
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Boolean} - true if the point is a "hit", else false
  */
  checkHit: function (x, y) {
    var opts = this._opts;

    // Check if the point is within the hue ring by comparing the point's distance from the centre to the ring's radius
    // If the distance is smaller than the radius, then we have a hit
    var dx = abs(x - opts.cX),
        dy = abs(y - opts.cY);
    return sqrt(dx * dx + dy * dy) < opts.r;
  }
};

module.exports = wheel;
