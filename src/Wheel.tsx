import { h } from 'preact';
import { 
  IroColor,
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

interface IroWheelProps extends IroComponentProps {
  colors: IroColor[];
}

export function IroWheel(props: IroWheelProps) {

  const { borderWidth } = props;
  const hsv = props.color.hsv;
  const { width, radius, cx, cy } = getWheelDimensions(props);

  const handlePositions = props.colors.map((color) => {
    // TODO refactor getWheelHandlePosition so that color is a second param
    return getWheelHandlePosition({...props, color});
  })

  function handleInput(x: number, y: number, bounds: DOMRect | ClientRect, type: EventResult) {
    // props.colors.length > 1 = the wheel uses multiple colors
    // in multi color mode, to start with we want to find the color that the user clicked
    if ((props.colors.length > 1) && (type === EventResult.start)) {
      let _x = x - bounds.left;
      let _y = y - bounds.top;
      for (let i = 0; i < handlePositions.length; i++) {
        const pos = handlePositions[i];
        const dist = Math.hypot(pos.x - _x, pos.y - _y);
        if (dist < props.handleRadius) {
          props.parent.setActiveColor(i);
          props.parent.inputActive = true;
          props.onInput(type);
          break;
        }
      }
    } else {
      props.parent.inputActive = true;
      props.color.hsv = getWheelValueFromInput(props, x, y, bounds);
      props.onInput(type);
    }
  }

  return (
    <IroComponentBase {...props} onInput={ handleInput }>
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
         { props.colors.map((color, index) => (
           <IroHandle 
              fill={ color.hslString }
              r={ props.handleRadius }
              url={ props.handleSvg }
              props={ props.handleProps }
              x={ handlePositions[index].x }
              y={ handlePositions[index].y }
            />
         ))}
         {/* <IroHandle 
            fill={ props.color.hslString }
            r={ props.handleRadius }
            url={ props.handleSvg }
            props={ props.handleProps }
            x={ handlePos.x }
            y={ handlePos.y }
          /> */}
       </svg>
      )}
    </IroComponentBase>
  );
}