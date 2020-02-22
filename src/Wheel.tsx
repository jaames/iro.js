import { h } from 'preact';
import { 
  IroColor,
  resolveSvgUrl,
  getSvgArcPath,
  translateWheelAngle, 
  getWheelDimensions,
  getWheelHandlePosition,
  getWheelValueFromInput,
  getHandleAtPoint
} from '@irojs/iro-core';

import { IroComponentBase, IroComponentProps, EventResult } from './ComponentBase';
import { IroHandle } from './Handle';

const HUE_STEPS = Array.apply(null, {length: 360}).map((_, index) => index);

interface IroWheelProps extends IroComponentProps {
  colors: IroColor[];
}

export function IroWheel(props: IroWheelProps) {

  const activeColor = props.color;
  const hsv = activeColor.hsv;
  const { borderWidth } = props;
  const { width, radius, cx, cy } = getWheelDimensions(props);
  const handlePositions = props.colors.map(color => getWheelHandlePosition(props, color));

  function handleInput(x: number, y: number, bounds: DOMRect | ClientRect, type: EventResult) {
    // props.colors.length > 1 = the wheel uses multiple colors
    // in multi color mode, to start with we want to find the color that the user clicked
    if ((props.colors.length > 1) && (type === EventResult.start)) {
      const activeHandle = getHandleAtPoint(props, x - bounds.left, y - bounds.top, handlePositions);
      if (activeHandle !== null) {
        props.parent.setActiveColor(activeHandle);
        props.parent.inputActive = true;
        props.onInput(type);
      }
    } else {
      props.parent.inputActive = true;
      activeColor.hsv = getWheelValueFromInput(props, x, y, bounds);
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
         { props.colors.filter(color => color !== activeColor).map(color => (
           <IroHandle 
              fill={ color.hslString }
              r={ props.handleRadius }
              url={ props.handleSvg }
              props={ props.handleProps }
              x={ handlePositions[color.index].x }
              y={ handlePositions[color.index].y }
            />
         ))}
         <IroHandle 
            fill={ activeColor.hslString }
            r={ props.handleRadius }
            url={ props.handleSvg }
            props={ props.handleProps }
            x={ handlePositions[activeColor.index].x }
            y={ handlePositions[activeColor.index].y }
          />
       </svg>
      )}
    </IroComponentBase>
  );
}