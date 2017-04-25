import gradient from "./gradient.js";
import marker from "./marker.js";

// Quick references to reused math functions
var PI = Math.PI,
    pow = Math.pow,
    sqrt = Math.sqrt,
    abs = Math.abs,
    round = Math.round;

/**
  * @constructor hue wheel UI
*/
let wheel = function (layers, opts) {
  this._ctx = layers.main.ctx;
  this._opts = opts;
  this.type = "wheel";
  this.marker = new marker(layers.over.ctx, opts.marker);
};

wheel.prototype = {

  /**
    * @desc redraw this UI element
    * @param {Number} value - The hsv value component to use when drawing
  */
  draw: function (value) {
    var ctx = this._ctx;
    var opts = this._opts;
    var x = opts.cX,
        y = opts.cY,
        radius = opts.r;

    // Clear the area where the wheel will be drawn
    ctx.clearRect(x - radius, y - radius, radius * 2, radius * 2);
    ctx.lineWidth = radius;

    // The hue wheel is basically drawn with a series of thin "pie slices" - one slice for each hue degree
    // Here we calculate the angle for each slice, in radians
    var sliceAngle = (2 * PI) / 360;

    // Create a loop to draw each slice
    for (var hue = 0, sliceStart = 0; hue < 360; hue++, sliceStart += sliceAngle) {
      // Create a HSL color for the slice using the current hue value
      ctx.strokeStyle = "hsl(" + hue + ",100%," + (value / 2) + "%)";
      ctx.beginPath();
      // For whatever reason (maybe a rounding issue?) the slices had a slight gap between them, which caused rendering artifacts
      // So we make them overlap ever so slightly by adding a tiny value to the slice angle
      ctx.arc(x, y, radius / 2, sliceStart, sliceStart + sliceAngle + 0.02);
      ctx.stroke();
    }

    // Create a radial gradient for "saturation"
    var hslString = "hsla(0,0%," + value + "%,";
    ctx.fillStyle = gradient.radial(ctx, x, y, 0, opts.rMax, [
      // The center of the color wheel should be pure white (0% saturation)
      {at: 0, color: hslString + "1)" },
      // It gradially tapers to transparent white (or, visually, 100% saturation color already drawn) at the edge of the wheel
      {at: 1, color: hslString + "0)" },
    ]);
    // Draw a rect using the gradient as a fill style
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
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
