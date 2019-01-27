import { h } from 'preact';

import IroComponent from 'ui/component';
import IroHandle from 'ui/handle';
import IroColor from '../color';
import { resolveUrl } from '../util/svg';

export default class IroSlider extends IroComponent {

  render(props) {
    let { width, sliderHeight, borderWidth, handleRadius } = props;
    sliderHeight = sliderHeight ? sliderHeight : props.padding * 2 + handleRadius * 2 + borderWidth * 2;
    this.width = width;
    this.height = sliderHeight;
    const cornerRadius = sliderHeight / 2;
    const range = width - cornerRadius * 2
    const hsv = props.color.hsv;
    const hsl = IroColor.hsvToHsl({h: hsv.h, s: hsv.s, v: 100});

    return (
      <svg 
        class="iro__slider"
        width={ width }
        height={ sliderHeight }
        style= {{
          marginTop: props.sliderMargin,
          overflow: 'visible',
          display: 'block'
        }}
      >
        <defs>
          <linearGradient id={ this.uid }>
            <stop offset="0%" stop-color="#000" />
            <stop offset="100%" stop-color={ `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` } />
          </linearGradient>
        </defs>
        <rect 
          class="iro__slider__value"
          rx={ cornerRadius } 
          ry={ cornerRadius } 
          x={ borderWidth / 2 } 
          y={ borderWidth / 2 } 
          width={ width - borderWidth } 
          height={ sliderHeight - borderWidth }
          stroke-width={ borderWidth }
          stroke={ props.borderColor }
          fill={ `url(${resolveUrl('#' + this.uid)})` }
        />
        <IroHandle
          r={ handleRadius }
          url={ props.handleUrl }
          origin={ props.handleOrigin }
          x={ cornerRadius + ((hsv.v / 100) * range) }
          y={ sliderHeight / 2 }
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
  handleInput(x, y, { left, right }, type) {
    const handleRange = this.width - this.height;
    const cornerRadius = this.height / 2;
    x = x - (left + cornerRadius);
    let dist = Math.max(Math.min(x, handleRange), 0);
    this.props.onInput(type, {
      v: Math.round((100 / handleRange) * dist)
    });
  }
}