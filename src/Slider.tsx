import { h } from 'preact';
import {
  IroColor,
  SliderShape,
  SliderType,
  sliderDefaultOptions,
  getSliderDimensions, 
  getSliderValueFromInput, 
  getSliderHandlePosition, 
  getSliderGradient,
  cssBorderStyles,
  cssGradient,
  cssValue
} from '@irojs/iro-core';

import { IroComponentWrapper } from './ComponentWrapper';
import { IroComponentProps, IroInputType } from './ComponentTypes';
import { IroHandle } from './Handle';

interface IroSliderProps extends IroComponentProps {
  sliderType: SliderType;
  sliderShape: SliderShape;
  minTemperature: number;
  maxTemperature: number;
};

export function IroSlider(props: IroSliderProps) {
  const activeIndex = props.activeIndex;
  const activeColor = (activeIndex !== undefined && activeIndex < props.colors.length) ? props.colors[activeIndex] : props.color;
  const { width, height, radius } = getSliderDimensions(props);
  const handlePos = getSliderHandlePosition(props, activeColor);
  const gradient = getSliderGradient(props, activeColor);

  function handleInput(x: number, y: number, type: IroInputType) {
    const value = getSliderValueFromInput(props, x, y);
    props.parent.inputActive = true;
    activeColor[props.sliderType] = value;
    props.onInput(type, props.id);
  }

  return (
    <IroComponentWrapper {...props} onInput={ handleInput }>
      {(uid, rootProps, rootStyles) => (
        <div
          { ...rootProps }
          className="IroSlider"
          style={{ 
            position: 'relative',
            width: cssValue(width),
            height: cssValue(height),
            borderRadius: cssValue(radius),
            // checkered bg to represent alpha
            background: `conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)`,
            backgroundSize: '8px 8px',
            ...rootStyles
          }}
        >
          <div
            className="IroSliderGradient"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `100%`,
              height: `100%`,
              borderRadius: cssValue(radius),
              background: cssGradient(
                'linear', 
                props.layoutDirection === 'horizontal' ? 'to top' : 'to right',
                gradient
              ),
              ...cssBorderStyles(props)
            }}
          />
          <IroHandle
            isActive={ true }
            index={ activeColor.index }
            r={ props.handleRadius }
            url={ props.handleSvg }
            props={ props.handleProps }
            x={ handlePos.x }
            y={ handlePos.y } // todo: use percentage
          />
        </div>
      )}
    </IroComponentWrapper>
  );
}

IroSlider.defaultProps = {
  ...sliderDefaultOptions
};