import { h } from 'preact';
import {
  IroColor,
  resolveSvgUrl,
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
  const activeIndex = props.activeIndex;
  const activeColor = (activeIndex !== undefined && activeIndex < props.colors.length) ? props.colors[activeIndex] : props.color;
  const gradients = getBoxGradients(props, activeColor);
  const handlePositions = colors.map(color => getBoxHandlePosition(props, color));

  function handleInput(x: number, y: number, inputType: IroInputType) {
    if (inputType === IroInputType.Start) {
      // getHandleAtPoint() returns the index for the handle if the point 'hits' it, or null otherwise
      const activeHandle = getHandleAtPoint(props, x, y, handlePositions);
      // If the input hit a handle, set it as the active handle, but don't update the color
      if (activeHandle !== null) {
        colorPicker.setActiveColor(activeHandle);
      } 
      // If the input didn't hit a handle, set the currently active handle to that position
      else {
        colorPicker.inputActive = true;
        activeColor.hsv = getBoxValueFromInput(props, x, y);
        props.onInput(inputType);
      }
    }
    // move is fired when the user has started dragging
    else if (inputType === IroInputType.Move) {
      colorPicker.inputActive = true;
      activeColor.hsv = getBoxValueFromInput(props, x, y);
    }
    // let the color picker fire input:start, input:move or input:end events
    props.onInput(inputType);
  }

  return (
    <IroComponentBase {...props} onInput={ handleInput }>
      {(uid, rootProps, rootStyles) => (
        <svg 
          { ...rootProps }
          className="IroBox"
          width={ width }
          height={ height }
          style= { rootStyles }
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
              <rect x="0" y="0" width="100%" height="100%" fill={`url(${resolveSvgUrl( '#s' + uid )})`}></rect>
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
              isActive={ false }
              index={ color.index }
              fill={ color.hslString }
              r={ props.handleRadius }
              url={ props.handleSvg }
              props={ props.handleProps }
              x={ handlePositions[color.index].x }
              y={ handlePositions[color.index].y }
            />
          ))}
          <IroHandle 
            isActive={ true }
            index={ activeColor.index }
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
