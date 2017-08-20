import marker from "ui/marker";

// Quick references to reused math functions
var PI = Math.PI,
    pow = Math.pow,
    sqrt = Math.sqrt,
    abs = Math.abs,
    round = Math.round;

/**
  * @constructor hue wheel UI
*/
let wheel = function (svg, opts) {
  this._opts = opts;
  this.type = "wheel";

  var gradient = svg.gradient("radial", {
    0: "#fff",
    100: "#fff",
  });

  var group = svg.insert(null, "g", {
    sw: opts.r,
    f: "none",
  });

  for (var hue = 0; hue < 360; hue++) {
    svg.arc(opts.cX, opts.cY, opts.r / 2, hue - 0.5, hue + 1.5, group, {
      s: "hsl(" + hue + ",100%," + (100 / 2) + "%)"
    });
  }

  gradient.setAttr(1, "stop-opacity", 0);

  svg.circle(opts.cX, opts.cY, opts.r + opts.border.w / 2, null, {
    f: gradient.url,
    s: opts.border.color,
    sw: opts.border.w,
  });

  this._lightness = svg.circle(opts.cX, opts.cY, opts.r, null, {
    f: "#000",
  });

  this.marker = new marker(svg, opts.marker);
};

wheel.prototype = {
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
      this._lightness.setAttribute("opacity", 1 - (hsv.v / 100));
      // this.draw(hsv.v);
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
