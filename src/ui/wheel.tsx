import { h } from 'preact';
import { 
  resolveSvgUrl,
  getSvgArcPath,
  translateWheelAngle, 
  getWheelCenter,
  getWheelHandlePosition,
  getWheelValueFromInput
} from 'iro-core';

import { IroComponentBase, IroComponentProps, EventResult } from './component';
import { IroHandle } from './handle';

const HUE_STEPS = Array.apply(null, {length: 360}).map((_, index) => index);

interface IroWheelProps extends IroComponentProps {}

export function IroWheel(props: IroWheelProps) {

  let { width, borderWidth } = props;
  const hsv = props.color.hsv;
  const radius = (width / 2) - borderWidth;
  const center = getWheelCenter(props);
  const cX = center.x;
  const cY = center.y;

  const handlePos = getWheelHandlePosition(props);

  function handleInput(x: number, y: number, bounds: DOMRect | ClientRect, type: EventResult) {
    this.props.onInput(type, getWheelValueFromInput(this.props, x, y, bounds));
  }

  return (
    <IroComponentBase onInput={ handleInput.bind(this) }>
      {(uid, rootProps, rootStyles) => (
        <svg
          { ...rootProps }
          className="iro__wheel"
          width={ width }
          height={ width }
          style={ rootStyles } 
        >
         <defs>
           <radialGradient id={ uid }>
             <stop offset="0%" stop-color="#fff"/>
             <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
           </radialGradient>
         </defs>
         <g className="iro__wheel__hue" stroke-width={ radius } fill="none">
           { HUE_STEPS.map(angle => (
             <path 
               key={ angle }
               d={ getSvgArcPath(cX, cY, radius / 2, angle, angle + 1.5) } 
               stroke={ `hsl(${translateWheelAngle(props, angle)}, 100%, 50%)` }
             />
           ))}
         </g>
         <circle 
           className="iro__wheel__saturation"
           cx={ cX }
           cy={ cY }
           r={ radius }
           fill={ `url(${resolveSvgUrl('#' + uid)})` }
           stroke={ props.borderColor }
           stroke-width={ borderWidth }
         />
         { props.wheelLightness && (
           <circle 
             className="iro__wheel__lightness"
             cx={ cX }
             cy={ cY }
             r={ radius }
             fill="#000"
             opacity={ 1 - hsv.v / 100 }
           />
         )}
         <circle 
           className="iro__wheel__border"
           cx={ cX }
           cy={ cY }
           r={ radius }
           fill="none"
           stroke={ props.borderColor }
           stroke-width={ borderWidth }
         />
         <IroHandle 
           r={ props.handleRadius }
           url={ props.handleSvg }
           origin={ props.handleOrigin }
           x={ handlePos.x }
           y={ handlePos.y }
         />
       </svg>
      )}
    </IroComponentBase>
  );
}