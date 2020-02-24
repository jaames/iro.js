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

import { IroComponentBase, IroComponentProps, IroInputType } from './ComponentBase';
import { IroHandle } from './Handle';

interface IroBoxProps extends IroComponentProps {
  colors: IroColor[];
}

export function IroBox(props: IroBoxProps) {
  const { width, height, radius } = getBoxDimensions(props);
  const { colors } = props;

  const colorPicker = props.parent;
  const activeColor = props.color;
  const gradients = getBoxGradients(props, activeColor);
  const isMulticolor = colors.length > 1;
  const handlePositions = colors.map(color => getBoxHandlePosition(props, color));

  function handleInput(x: number, y: number, inputType: IroInputType) {
    // In non-multicolor mode, the user should be able to click anywhere to set the color
    if (!isMulticolor) {
      // Setting inputActive lets the color picker know it needs to fire input:change when the color changes
      colorPicker.inputActive = true;
      activeColor.hsv = getBoxValueFromInput(props, x, y);
      props.onInput(inputType);
    }
    // In multicolor mode, the color should only be set if the user intentionally clicks the handle and drags it around
    else {
      if (inputType === IroInputType.Start) {
        // getHandleAtPoint() returns the index for the handle if the point 'hits' it, or null otherwise
        const activeHandle = getHandleAtPoint(props, x, y, handlePositions);
        if (activeHandle !== null) {
          colorPicker.activeHandle = activeHandle;
          colorPicker.setActiveColor(activeHandle);
          props.onInput(inputType);
        }
      }
      else if ((colorPicker.activeHandle !== null) && (inputType === IroInputType.Move)) {
        colorPicker.inputActive = true;
        activeColor.hsv = getBoxValueFromInput(props, x, y);
        props.onInput(inputType);
      }
      else if ((colorPicker.activeHandle !== null) && (inputType === IroInputType.End)) {
        colorPicker.activeHandle = null;
        colorPicker.inputActive = true;
        activeColor.hsv = getBoxValueFromInput(props, x, y);
        props.onInput(inputType);
      }
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
          { colors.filter(color => color !== activeColor).map(color => (
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