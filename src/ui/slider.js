import { h } from "preact";

import IroComponent from "ui/component";
import Marker from "ui/marker";

import iroColor from "modules/color";

export default class IroSlider extends IroComponent {

  render(props) {
    const width = props.width;
    const height = props.sliderHeight;
    const radius = height / 2;
    const range = width - radius * 2;
    const borderWidth = props.borderWidth;
    const hsv = props.hsv;
    const hsl = iroColor.hsv2Hsl({h: hsv.h, s: hsv.s, v: 100});

    return (
      <svg 
        class="iro__slider"
        x={ props.x }
        y={ props.y }
        width={ width }
        height={ height }
      >
        <defs>
          <linearGradient id="iroGradient1">
            <stop offset="0%" stop-color="#000" />
            <stop offset="100%" stop-color={ `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` } />
          </linearGradient>
        </defs>
        <rect 
          class="iro__slider__value"
          rx={ radius } 
          ry={ radius } 
          x={ borderWidth / 2 } 
          y={ borderWidth / 2 } 
          width={ width - borderWidth } 
          height={ height - borderWidth }
          stroke-width={ borderWidth }
          stroke={ props.borderColor }
          fill="url(#iroGradient1)"
        />
        <Marker 
          r={ props.markerRadius }
          x={ radius + ((hsv.v / 100) * range) }
          y={ height / 2 }
        />
      </svg>
    );
  }

  /**
    * @desc handles mouse input for this component
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @param {DOMRect} rect - bounding client rect for the component's base element
    * @param {String} type - input type: "START", "MOVE" or "END"
  */
  handleInput(x, y, rect, type) {
    var props = this.props;
    var radius = props.sliderHeight / 2;
    var range = props.width - (radius * 2);
    x = x - (rect.left + radius);
    var dist = Math.max(Math.min(x, range), 0);
    props.onInput(type, {
      v: Math.round((100 / range) * dist)
    });
  }
}