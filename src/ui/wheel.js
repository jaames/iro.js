import { h } from "preact";

import IroComponent from "ui/component";
import Marker from "ui/marker";

function arcPath(cx, cy, radius, startAngle, endAngle) {
  var largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  startAngle *= Math.PI / 180;
  endAngle *= Math.PI / 180;
  var x1 = cx + radius * Math.cos(endAngle);
  var y1 = cy + radius * Math.sin(endAngle);
  var x2 = cx + radius * Math.cos(startAngle);
  var y2 = cy + radius * Math.sin(startAngle);
  return ["M", x1, y1, "A", radius, radius, 0, largeArcFlag, 0, x2, y2].join(" ");
}

export default class IroWheel extends IroComponent {
  
  render(props) {
    const hsv = props.hsv;

    const radius = (props.width / 2) - props.borderWidth;
    const markerAngle = (props.anticlockwise ? 360 - hsv.h : hsv.h) * (Math.PI / 180);
    const markerDist = (hsv.s / 100) * (radius - props.padding - props.markerRadius);
    const cX = props.x + radius + props.borderWidth;
    const cY = props.y + radius + props.borderWidth;
    
    return (
      <svg class="iro__wheel" width={props.width} height={props.height} x={ props.x } y={ props.y }>
        <defs>
          <radialGradient id="iroGradient2">
            <stop offset="0%" stop-color="#fff" />
            <stop offset="100%" stop-color="#fff" stop-opacity={ 0 }/>
          </radialGradient>
        </defs>
        <g class="iro__wheel__hue" stroke-width={ radius } fill="none">
          {Array.apply(null, { length: 360 }).map((_, hue) => (
            <path 
              key={ hue }
              d={ arcPath(cX, cY, radius / 2, hue, hue + 1.5) } 
              stroke={ `hsl(${ props.anticlockwise ? 360 - hue : hue }, 100%, 50%)` }
            />
          ))}
        </g>
        <circle 
          class="iro__wheel__saturation"
          cx={ cX }
          cy={ cY }
          r={ radius }
          fill="url(#iroGradient2)"
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
          stroke={ props.borderColor }
          stroke-width={ props.borderWidth }
        />
        <Marker 
          r={ props.markerRadius }
          x={ cX + markerDist * Math.cos(markerAngle) }
          y={ cY + markerDist * Math.sin(markerAngle) }
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
    var radius = props.width / 2;
    var markerRange = (radius - props.padding - props.markerRadius);
    var cX = props.x + radius;
    var cY = props.y + radius;

    x = cX - (x - rect.left);
    y = cY - (y - rect.top);

    var angle = Math.atan2(y, x);
    // Calculate the hue by converting the angle to radians
    var hue = Math.round(angle * (180 / Math.PI)) + 180;
    // Find the point's distance from the center of the wheel
    // This is used to show the saturation level
    var dist = Math.min(Math.sqrt(x * x + y * y), markerRange);
    
    hue = (props.anticlockwise ? 360 - hue : hue);
    props.onInput(type, {
      h: hue,
      s: Math.round((100 / markerRange) * dist)
    });
  }
}