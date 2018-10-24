import { h } from "preact";

import IroComponent from "ui/component";
import Marker from "ui/marker";

import iroColor from "modules/color";

export default class IroSlider extends IroComponent {

  render(props) {

    const width = 300;
    const height = props.sliderHeight;
    const hsv = props.hsv;
    const hsl = iroColor.hsv2Hsl({h: hsv.h, s: hsv.s, v: 100});

    return (
      <svg class="iro__slider" x={ props.x } y={ props.y }>
        <defs>
          <linearGradient id="iroGradient1">
            <stop offset="0%" stop-color="#000" />
            <stop offset="100%" stop-color={ `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` } />
          </linearGradient>
        </defs>
        <rect 
          class="iro__slider__value"
          rx={ height / 2 } 
          ry={ height / 2 } 
          x={ 0 } 
          y={ 0 } 
          width={ width } 
          height={ height }
          stroke-width={ props.borderWidth }
          stroke={ props.borderColor }
          fill="url(#iroGradient1)"
          vectorEffect="non-scaling-stroke"
        />
        <Marker 
          r={ props.markerRadius }
          x={ (hsv.v / 100) * width }
          y={ height / 2 }
        />
      </svg>
    );
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
    var props = this.props;
    var width = props.width;
    var dist = Math.max(Math.min(x, width), 0);
    props.onInput(type, {
      v: Math.round((100 / width) * dist)
    });
  }
}