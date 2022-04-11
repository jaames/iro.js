import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
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
  showInput: boolean; // show input fields for manual value input
  disabled: boolean; // enable / disable manual value input
};

export function IroSlider(props: IroSliderProps) {
  const activeIndex = props.activeIndex;
  const activeColor = (activeIndex !== undefined && activeIndex < props.colors.length) ? props.colors[activeIndex] : props.color;
  const { width, height, radius } = getSliderDimensions(props);
  const handlePos = getSliderHandlePosition(props, activeColor);
  const gradient = getSliderGradient(props, activeColor);
  const [sliderValue, setSliderValue] = useState(activeColor[props.sliderType]);
  setSliderValue(activeColor[props.sliderType])

  function handleInput(x: number, y: number, type: IroInputType) {
    const value = getSliderValueFromInput(props, x, y);
    props.parent.inputActive = true;
    activeColor[props.sliderType] = value;
    if (props.sliderType === 'alpha') {
      setSliderValue(value.toFixed(2));
    } else {
      setSliderValue(Math.round(value));
    }
    props.onInput(type, props.id);
  }

  const handleSliderValue = useCallback((e) => {
    e.preventDefault();
    // regex for digit or dot (.)
    if (!/^([0-9]|\.)$/i.test(e.key)) {
      return;
    }

    let maxlen: number;
    if (props.sliderType === 'alpha') {
      maxlen = 4;
    } else if (props.sliderType === 'kelvin') {
      maxlen = 10;
    } else {
      maxlen = 3;
    }
    const value = (e.target as HTMLInputElement).value.toString();
    const valueString = value.length + 1 > maxlen ? value : value + e.key.toString();
    let clampedValue: number;

    function clamp(num: number, min: number, max: number) {
      return Math.min(Math.max(num, min), max);
    }

    switch(props.sliderType) {
      case 'hue':
        clampedValue = clamp(+valueString, 0, 360);
        break;
      case 'saturation':
      case 'value':
        clampedValue = clamp(+valueString, 0, 100);
        break;
      case 'red':
      case 'green':
      case 'blue':
        clampedValue = clamp(+valueString, 0, 255);
        break;
      case 'alpha':
        if (valueString === '0.') {
          clampedValue = 0.01;
        } else {
          clampedValue = clamp(+valueString, 0, 1);
        }
        break;
      case 'kelvin': // TODO
        break;
    }
    activeColor[props.sliderType] = +clampedValue;
    return clampedValue;
  }, [setSliderValue, props.sliderType]);

  return (
    <IroComponentWrapper {...props} onInput={ handleInput }>
      {(uid, rootProps, rootStyles) => (
        // add wrapper element
        <div
          className="IroSliderWrapper"
          style={{
            width: 'max-content',
            flexDirection: props.layoutDirection === 'horizontal' ? 'column' : 'row',
            alignItems: 'baseline',
            ...rootStyles
          }}
        >
          <div
            { ...rootProps }
            className="IroSlider"
            style={{
              position: 'relative',
              display: 'block',
              width: cssValue(width),
              height: cssValue(height),
              borderRadius: cssValue(radius),
              // checkered bg to represent alpha
              background: `conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)`,
              backgroundSize: '8px 8px',
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
          <span
            className="IroSliderLabel"
            style={{
              display: props.showInput ? 'block' : 'none',
              marginLeft: props.layoutDirection === 'vertical' ?
                          cssValue(props.handleRadius) : cssValue(0),
              width: cssValue(10)
            }}
          >
            {props.sliderType[0].toUpperCase()}
          </span>
          <input
            onKeyPress={ handleSliderValue }
            className="IroSliderInput"
            style={{
              display: props.showInput ? 'block' : 'none',
              width: cssValue(33),
              height: cssValue(18),
              fontSize: '12px',
              marginLeft: props.layoutDirection === 'vertical' ?
                          cssValue(5) : cssValue(0)
            }}
            type="text"
            disabled={ props.disabled }
            value={ sliderValue }
          >
          </input>
        </div>
      )}
    </IroComponentWrapper>
  );
}

IroSlider.defaultProps = {
  ...sliderDefaultOptions
};