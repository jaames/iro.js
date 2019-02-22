import { h } from 'preact';

import IroComponent from 'ui/component';
import IroHandle from 'ui/handle';
import { resolveUrl, createArcPath } from '../util/svg';


export default class IroWheel extends IroComponent {

  render(props) {
    let { width, borderWidth, handleRadius } = props;
    const hsv = props.color.hsv;
    const radius = (width / 2) - borderWidth;
    const handleAngle = (360 - hsv.h) * (Math.PI / 180);
    const handleDist = (hsv.s / 100) * (radius - props.padding - handleRadius - borderWidth);
    const cX = radius + borderWidth;
    const cY = radius + borderWidth;
    
    return (
      <svg 
        class="iro__wheel"
        width={ width }
        height={ width }
        style={{
          overflow: 'visible',
          display: 'block'
        }}
      >
        <defs>
          <radialGradient id={ this.uid }>
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <g class="iro__wheel__hue" stroke-width={ radius } fill="none">
          {Array.apply(null, { length: 360 }).map((_, hue) => (
            <path 
              key={ hue }
              d={ createArcPath(cX, cY, radius / 2, hue, hue + 1.5) } 
              stroke={ `hsl(${360 - hue}, 100%, 50%)` }
            />
          ))}
        </g>
        <circle 
          class="iro__wheel__saturation"
          cx={ cX }
          cy={ cY }
          r={ radius }
          fill={ `url(${resolveUrl('#' + this.uid)})` }
        />
        { props.wheelLightness && (
          <circle 
            class="iro__wheel__lightness"
            cx={ cX }
            cy={ cY }
            r={ radius }
            fill="#000"
            opacity={ 1 - hsv.v / 100 }
          />
        )}
        <circle 
          class="iro__wheel__border"
          cx={ cX }
          cy={ cY }
          r={ radius }
          fill="none"
          stroke={ props.borderColor }
          stroke-width={ borderWidth }
        />
        <IroHandle 
          r={ handleRadius }
          url={ props.handleSvg }
          origin={ props.handleOrigin }
          x={ cX + handleDist * Math.cos(handleAngle) }
          y={ cY + handleDist * Math.sin(handleAngle) }
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
  handleInput(x, y, { left, top }, type) {
    const props = this.props;
    const radius = props.width / 2;
    const handleRange = (radius - props.padding - props.handleRadius - props.borderWidth);
    const cX = radius;
    const cY = radius;

    x = cX - (x - left);
    y = cY - (y - top);

    let handleAngle = Math.atan2(y, x);
    // Calculate the hue by converting the angle to radians
    let hue = 360 - (Math.round(handleAngle * (180 / Math.PI)) + 180);
    // Find the point's distance from the center of the wheel
    // This is used to show the saturation level
    let handleDist = Math.min(Math.sqrt(x * x + y * y), handleRange);
    props.onInput(type, {
      h: hue,
      s: Math.round((100 / handleRange) * handleDist)
    });
  }
}