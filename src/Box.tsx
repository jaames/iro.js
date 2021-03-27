import { h } from 'preact';
import {
  IroColor,
  getBoxDimensions,
  getBoxGradients,
  getBoxValueFromInput,
  getBoxHandlePosition,
  getHandleAtPoint,
  cssBorderStyles,
  cssGradient,
  cssValue
} from '@irojs/iro-core';

import { IroComponentWrapper } from './ComponentWrapper';
import { IroComponentProps, IroInputType } from './ComponentTypes';
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
        props.onInput(inputType, props.id);
      }
    }
    // move is fired when the user has started dragging
    else if (inputType === IroInputType.Move) {
      colorPicker.inputActive = true;
      activeColor.hsv = getBoxValueFromInput(props, x, y);
    }
    // let the color picker fire input:start, input:move or input:end events
    props.onInput(inputType, props.id);
  }

  return (
    <IroComponentWrapper {...props} onInput={ handleInput }>
      {(uid, rootProps, rootStyles) => (
        <div
          { ...rootProps }
          className="IroBox"
          style={{ 
            width: cssValue(width),
            height: cssValue(height),
            position: 'relative',
            ...rootStyles
          }}
        >
          <div
            className="IroBox"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: cssValue(radius),
              ...cssBorderStyles(props),
              background: 
                cssGradient('linear', 'to bottom', gradients[1]) 
                + ',' + 
                cssGradient('linear', 'to right', gradients[0]),
            }}
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
            r={ props.activeHandleRadius || props.handleRadius }
            url={ props.handleSvg }
            props={ props.handleProps }
            x={ handlePositions[activeColor.index].x }
            y={ handlePositions[activeColor.index].y }
          />
        </div>
      )}
    </IroComponentWrapper>
  );
}
