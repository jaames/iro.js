import { h } from 'preact';
import {
  IroColor,
  resolveSvgUrl,
  getBoxStyles,
  getBoxDimensions,
  getBoxGradients,
  getBoxValueFromInput,
  getBoxHandlePosition,
  getHandleAtPoint
} from '@irojs/iro-core';

import { IroComponentBase, IroComponentProps, EventResult } from './ComponentBase';
import { IroHandle } from './Handle';

interface IroBoxProps extends IroComponentProps {
  colors: IroColor[];
}

export function IroBox(props: IroBoxProps) {
  const activeColor = props.color;
  const { width, height, radius } = getBoxDimensions(props);
  const gradients = getBoxGradients(props, activeColor);
  const handlePositions = props.colors.map(color => getBoxHandlePosition(props, color));

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
      activeColor.hsv = getBoxValueFromInput(props, x, y, bounds);
      props.onInput(type);
    }
  }

  return (
    <IroComponentBase {...props} onInput={ handleInput }>
      {(uid, rootProps, rootStyles) => (
        <svg 
          { ...rootProps }
          className="IroBox"
          width={ width }
          height={ height }
          style= {{
            ...rootStyles,
            ...getBoxStyles(props)
          }}
        >
          <defs>
            <linearGradient id={ 's' + uid } x1="0%" y1="0%" x2="100%" y2="0%">
              { gradients[0].map(([ offset, color ]) => (
                <stop offset={`${ offset }%`} stop-color={ color } />
              ))}
            </linearGradient>
            <linearGradient id={ 'l' + uid } x1="0%" y1="0%" x2="0%" y2="100%">
              { gradients[1].map(([ offset, color ]) => (
                <stop offset={`${ offset }%`} stop-color={ color } />
              ))}
            </linearGradient>
            <pattern id={ 'f' + uid } width="100%" height="100%">
              <rect x="0" y="0" width="100%" height="100%" fill={`url(${resolveSvgUrl( '#s' + uid )})`}></rect> }
              <rect x="0" y="0" width="100%" height="100%" fill={`url(${resolveSvgUrl( '#l' + uid )})`}></rect>
            </pattern>
          </defs>
          <rect 
            rx={ radius } 
            ry={ radius } 
            x={ props.borderWidth / 2 } 
            y={ props.borderWidth / 2 } 
            width={ width - props.borderWidth } 
            height={ height - props.borderWidth }
            stroke-width={ props.borderWidth }
            stroke={ props.borderColor }
            fill={ `url(${resolveSvgUrl('#f' + uid )})` }
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