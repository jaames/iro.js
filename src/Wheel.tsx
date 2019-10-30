import { h } from 'preact';
import { 
  resolveSvgUrl,
  getSvgArcPath,
  translateWheelAngle, 
  getWheelDimensions,
  getWheelHandlePosition,
  getWheelValueFromInput
} from '@irojs/iro-core';

import { IroComponentBase, IroComponentProps, EventResult } from './ComponentBase';
import { IroHandle } from './Handle';

const HUE_STEPS = Array.apply(null, {length: 360}).map((_, index) => index);

interface IroWheelProps extends IroComponentProps {}

export function IroWheel(props: IroWheelProps) {

  const { borderWidth } = props;
  const hsv = props.color.hsv;
  const { width, radius, cx, cy } = getWheelDimensions(props);

  const handlePos = getWheelHandlePosition(props);

  function handleInput(x: number, y: number, bounds: DOMRect | ClientRect, type: EventResult) {
    props.parent.inputActive = true;
    props.color.hsv = getWheelValueFromInput(props, x, y, bounds);
    props.onInput(type);
  }

  return (
    <IroComponentBase onInput={ handleInput }>
      {(uid, rootProps, rootStyles) => (
        <svg
          { ...rootProps }
          className="IroWheel"
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
         <g className="IroWheelHue" stroke-width={ radius } fill="none">
           { HUE_STEPS.map(angle => (
             <path 
               key={ angle }
               d={ getSvgArcPath(cx, cy, radius / 2, angle, angle + 1.5) } 
               stroke={ `hsl(${translateWheelAngle(props, angle)}, 100%, 50%)` }
             />
           ))}
         </g>
         <circle 
           className="IroWheelSaturation"
           cx={ cx }
           cy={ cy }
           r={ radius }
           fill={ `url(${resolveSvgUrl('#' + uid)})` }
         />
         { props.wheelLightness && (
           <circle 
             className="IroWheelLightness"
             cx={ cx }
             cy={ cy }
             r={ radius }
             fill="#000"
             opacity={ 1 - hsv.v / 100 }
           />
         )}
         <circle 
           className="IroWheelBorder"
           cx={ cx }
           cy={ cy }
           r={ radius }
           fill="none"
           stroke={ props.borderColor }
           stroke-width={ borderWidth }
         />
         <IroHandle 
           r={ props.handleRadius }
           url={ props.handleSvg }
           props={ props.handleProps }
           x={ handlePos.x }
           y={ handlePos.y }
         />
       </svg>
      )}
    </IroComponentBase>
  );
}