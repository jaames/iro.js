import { h } from 'preact';

import IroComponent from 'ui/component';
import IroHandle from 'ui/handle';
import IroColor from '../color';
import { resolveUrl } from '../util/svg';

export default class IroSlider extends IroComponent {

  renderGradient(props) {
    const hsv = props.color.hsv;
    let stops = [];

    switch (props.sliderType) {
      case 'hue':
        stops = [
          {offset: '0',      color: '#f00'},
          {offset: '16.666', color: '#ff0'},
          {offset: '33.333', color: '#0f0'},
          {offset: '50',     color: '#0ff'},
          {offset: '66.666', color: '#00f'},
          {offset: '83.333', color: '#f0f'},
          {offset: '100',    color: '#f00'},
        ];
        break;
      case 'saturation':
        var noSat = IroColor.hsvToHsl({h: hsv.h, s: 0, v: hsv.v});
        var fullSat = IroColor.hsvToHsl({h: hsv.h, s: 100, v: hsv.v});
        stops = [
          {offset: '0', color: `hsl(${noSat.h}, ${noSat.s}%, ${noSat.l}%)`},
          {offset: '100', color: `hsl(${fullSat.h}, ${fullSat.s}%, ${fullSat.l}%)`}
        ];
        break;
      case 'value':
      default:
        var hsl = IroColor.hsvToHsl({h: hsv.h, s: hsv.s, v: 100});
        stops = [
          {offset: '0', color: '#000'},
          {offset: '100', color: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
        ];
        break;
    }

    return (
      <linearGradient id={ this.uid }>
        {stops.map(stop => (
          <stop offset={`${stop.offset}%`} stop-color={ stop.color } />
        ))}
      </linearGradient>
    )
  }

  render(props) {
    let { width, sliderHeight, borderWidth, handleRadius } = props;
    sliderHeight = sliderHeight ? sliderHeight : props.padding * 2 + handleRadius * 2 + borderWidth * 2;
    this.width = width;
    this.height = sliderHeight;
    const cornerRadius = sliderHeight / 2;
    const range = width - cornerRadius * 2
    const hsv = props.color.hsv;
    
    let sliderValue;
    switch (props.sliderType) {
      case 'hue':
        sliderValue = hsv.h /= 3.6;
        break;
      case 'saturation':
        sliderValue = hsv.s;
        break;
      case 'value':
      default:
        sliderValue = hsv.v;
        break;
    }

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
          { this.renderGradient(props) }
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
          url={ props.handleSvg }
          origin={ props.handleOrigin }
          x={ cornerRadius + (sliderValue / 100) * range }
          y={ sliderHeight / 2 }
        />
      </svg>
    );
  }

  getValueFromPoint(x, y, { left }) {
    const handleRange = this.width - this.height;
    const cornerRadius = this.height / 2;
    x = x - (left + cornerRadius);
    let dist = Math.max(Math.min(x, handleRange), 0);
    return Math.round((100 / handleRange) * dist);
  }

  /**
    * @desc handles mouse input for this component
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @param {DOMRect} rect - bounding client rect for the component's base element
    * @param {String} type - input type: "START", "MOVE" or "END"
  */
  handleInput(x, y, bounds, type) {
    let value = this.getValueFromPoint(x, y, bounds);
    let channel;
    switch (this.props.sliderType) {
      case 'hue':
        channel = 'h';
        value *= 3.6;
        break;
      case 'saturation':
        channel = 's';
        break;
      case 'value':
      default:
        channel = 'v';
        break;
    }
    this.props.onInput(type, {
      [channel]: value
    });
  }
}