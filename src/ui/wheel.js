import IroComponent from "ui/component";
import Marker from "ui/marker";

// Quick references to reused math functions
var PI = Math.PI,
    sqrt = Math.sqrt,
    abs = Math.abs,
    round = Math.round;

function arcPath(cx, cy, radius, startAngle, endAngle) {
  var largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  startAngle *= Math.PI / 180;
  endAngle *= Math.PI / 180;
  var x1 = cx + radius * Math.cos(endAngle),
      y1 = cy + radius * Math.sin(endAngle),
      x2 = cx + radius * Math.cos(startAngle),
      y2 = cy + radius * Math.sin(startAngle);
  return ["M", x1, y1, "A", radius, radius, 0, largeArcFlag, 0, x2, y2].join(" ");
}

export default class IroWheel extends IroComponent {

  render(props) {
    return (
      <svg class="iro__wheel" x={0} y={0} ref={el => this.root = el}>
        <defs>
          <radialGradient id="iroGradient2">
            <stop offset="0%" stop-color="#fff" />
            <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle 
          class="iro__wheel__border"
          cx={0}
          cy={0}
          r={0}
          fill="#fff"
          stroke="#fff"
          stroke-width={2}
          vector-effect="non-scaling-stroke"
        />
        <g class="__hue" stroke-width={2} fill="none">
          { new Array(360).fill(0).map((_, hue) => (
            <path d={ arcPath(0, 0, hue, hue + 1.5) } stroke={`hsl(${ props.anticlockwise ? 360 - hue : hue }, 100%, 50%)`} />
          ))}
        </g>
        <circle 
          class="iro__wheel__saturation"
          cx={0}
          cy={0}
          r={0}
          fill="url(#iroGradient2)"
        />
        <circle 
          class="iro__wheel__lightness"
          cx={0}
          cy={0}
          r={0}
          opacity={0}
        />
        <Marker x={0} y={0} />
      </svg>
    );
  }
  /**
    * @desc updates this element to represent a new color value
    * @param {Object} color - an iroColor object with the new color value
    * @param {Object} changes - an object that gives a boolean for each HSV channel, indicating whether ot not that channel has changed
  */
  update(color, changes) {
    var opts = this._opts;
    var hsv = color.hsv;
    // If the V channel has changed, redraw the wheel UI with the new value
    if (changes.v && opts.lightness) {
      this._lightness.setAttrs({opacity: (1 - hsv.v / 100).toFixed(2) });
    }
    // If the H or S channel has changed, move the marker to the right position
    if (changes.h || changes.s) {
      // convert the hue value to radians, since we'll use it as an angle
      var hueAngle = (opts.anticlockwise ? 360 - hsv.h : hsv.h) * (PI / 180);
      // convert the saturation value to a distance between the center of the ring and the edge
      var dist = (hsv.s / 100) * opts.rMax;
      // Move the marker based on the angle and distance
      this.marker.move(this.cX + dist * Math.cos(hueAngle), this.cY + dist * Math.sin(hueAngle));
    }
  }

  /**
    * @desc Takes a point at (x, y) and returns HSV values based on this input -- use this to update a color from mouse input
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Object} - new HSV color values (some channels may be missing)
  */
  input(x, y, rect, type) {
    var opts = this._opts;
    var rangeMax = opts.rMax;
    var cX = rect.width / 2;
    var cY = rect.height / 2;

    x = cX - (x - rect.left);
    y = cY - (y - rect.top);

    var angle = Math.atan2(y, x),
        // Calculate the hue by converting the angle to radians
        hue = round(angle * (180 / PI)) + 180,
        // Find the point's distance from the center of the wheel
        // This is used to show the saturation level
        dist = Math.min(sqrt(x * x + y * y), rangeMax);
    
    hue = (opts.anticlockwise ? 360 - hue : hue);

    // Return just the H and S channels, the wheel element doesn't do anything with the L channel
    return {
      h: hue,
      s: round((100 / rangeMax) * dist)
    };
  }

  // /**
  //   * @desc Check if a point at (x, y) is inside this element
  //   * @param {Number} x - point x coordinate
  //   * @param {Number} y - point y coordinate
  //   * @return {Boolean} - true if the point is a "hit", else false
  // */
  // checkHit(x, y) {
  //   var opts = this._opts;

  //   // Check if the point is within the hue ring by comparing the point's distance from the centre to the ring's radius
  //   // If the distance is smaller than the radius, then we have a hit
  //   var dx = abs(x - opts.cX),
  //       dy = abs(y - opts.cY);
  //   return sqrt(dx * dx + dy * dy) < opts.r;
  // }
}