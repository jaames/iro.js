import { h } from "preact";

import IroComponent from "ui/component";
import Handle from "ui/handle";

function arcPath(cx, cy, radius, startAngle, endAngle) {
  var largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  startAngle *= Math.PI / 180;
  endAngle *= Math.PI / 180;
  var x1 = cx + radius * Math.cos(endAngle);
  var y1 = cy + radius * Math.sin(endAngle);
  var x2 = cx + radius * Math.cos(startAngle);
  var y2 = cy + radius * Math.sin(startAngle);
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${x2} ${y2}`;
}

export default class IroWheel extends IroComponent {
  
  render({ hsv, width, padding, borderWidth, borderColor, handleRadius, anticlockwise, urlBase }) {
    const radius = (width / 2) - borderWidth;
    const handleAngle = (anticlockwise ? 360 - hsv.h : hsv.h) * (Math.PI / 180);
    const handleDist = (hsv.s / 100) * (radius - padding - handleRadius - borderWidth);
    const cX = radius + borderWidth;
    const cY = radius + borderWidth;
    
    return (
      <svg class="iro__wheel" width={ width } height={ width } style={{ "overflow": "visible" }}>
        <defs>
          <radialGradient id="iroWheel">
            <stop offset="0%" stop-color="#fff" />
            <stop offset="100%" stop-color="#fff" stop-opacity={ 0 }/>
          </radialGradient>
        </defs>
        <g class="iro__wheel__hue" stroke-width={ radius } fill="none">
          {Array.apply(null, { length: 360 }).map((_, hue) => (
            <path 
              key={ hue }
              d={ arcPath(cX, cY, radius / 2, hue, hue + 1.5) } 
              stroke={ `hsl(${ anticlockwise ? 360 - hue : hue }, 100%, 50%)` }
            />
          ))}
        </g>
        <circle 
          class="iro__wheel__saturation"
          cx={ cX }
          cy={ cY }
          r={ radius }
          fill={ `url(${urlBase}#iroWheel)` }
        />
        <circle 
          class="iro__wheel__lightness"
          cx={ cX }
          cy={ cY }
          r={ radius }
          fill="#000"
          opacity={ 1 - hsv.v / 100 }
        />
        <circle 
          class="iro__wheel__border"
          cx={ cX }
          cy={ cY }
          r={ radius }
          fill="none"
          stroke={ borderColor }
          stroke-width={ borderWidth }
        />
        <Handle 
          r={ handleRadius }
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
    const { width, padding, handleRadius, borderWidth, anticlockwise, onInput } = this.props;
    const radius = width / 2;
    const handleRange = (radius - padding - handleRadius - borderWidth);
    const cX = radius;
    const cY = radius;

    x = cX - (x - left);
    y = cY - (y - top);

    let handleAngle = Math.atan2(y, x);
    // Calculate the hue by converting the angle to radians
    let hue = Math.round(handleAngle * (180 / Math.PI)) + 180;
    hue = (anticlockwise ? 360 - hue : hue);
    // Find the point's distance from the center of the wheel
    // This is used to show the saturation level
    let handleDist = Math.min(Math.sqrt(x * x + y * y), handleRange);
    onInput(type, {
      h: hue,
      s: Math.round((100 / handleRange) * handleDist)
    });
  }
}