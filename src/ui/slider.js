import IroComponent from "ui/component";
import Marker from "ui/marker";

import iroColor from "modules/color";

export default class IroSlider extends IroComponent {

  render(props) {
    return (
      <svg class="iro__slider" x={0} y={0} ref={el => this.root = el}>
        <defs>
          <linearGradient id="iroGradient1">
            <stop offset="0%" stop-color="#000" />
            <stop offset="100%" stop-color="#fff" />
          </linearGradient>
        </defs>
        <rect 
          class="iro__slider__value"
          rx={0} 
          ry={0} 
          x={0} 
          y={0} 
          width={0} 
          height={0}
          stroke-width={2}
          stroke="#fff"
          fill="url(#iroGradient1)"
          vectorEffect="non-scaling-stroke"
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
    var range = opts.range;
    var hsv = color.hsv;
    var hsl = iroColor.hsv2Hsl({h: hsv.h, s: hsv.s, v: 100});
    if (opts.sliderType == "v") {
      if (changes.h || changes.s) {
        this._gradient.stops[1].setAttrs({stopColor: "hsl(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%)"});
      }
      if (changes.v) {
        var percent = (hsv.v / 100);
        this.marker.move(range.min + (percent * range.w), (opts.h / 2));
      }
    }
  }

  /**
    * @desc Takes a point at (x, y) and returns HSV values based on this input -- use this to update a color from mouse input
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Object} - new HSV color values (some channels may be missing)
  */
  input(x, y, rect, type) {
    x = x - rect.left;
    y = y - rect.top;
    var opts = this._opts;
    var range = opts.range;
    var dist = Math.max(Math.min(x, range.max), range.min) - range.min;
    return {
      v: Math.round((100 / range.w) * dist),
    };
  }
}