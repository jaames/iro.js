import { h } from 'preact';
import {
  IroColor,
  SliderShape,
  SliderType,
  sliderDefaultOptions,
  resolveSvgUrl,
  getSliderDimensions, 
  getSliderValueFromInput, 
  getSliderHandlePosition, 
  getSliderGradient,
  getSliderGradientCoords,
} from '@irojs/iro-core';

import { IroComponentBase, IroComponentProps, IroInputType } from './ComponentBase';
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
  const isAlpha = props.sliderType === 'alpha';

  function handleInput(x: number, y: number, type: IroInputType) {
    const value = getSliderValueFromInput(props, x, y);
    props.parent.inputActive = true;
    activeColor[props.sliderType] = value;
    props.onInput(type);
  }

  return (
    <IroComponentBase {...props} onInput={ handleInput }>
      {(uid, rootProps, rootStyles) => (
        <svg 
          { ...rootProps }
          className="IroSlider"
          width={ width }
          height={ height }
          style= { rootStyles }
        >
          <defs>
            <linearGradient id={ 'g' + uid } {...getSliderGradientCoords(props)}>
              { gradient.map(([ offset, color ]) => (
                <stop offset={`${ offset }%`} stop-color={ color } />
              ))}
            </linearGradient>
            { isAlpha && (
              <pattern id={ 'b' + uid } width="8" height="8" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="8" height="8" fill="#fff"/>
                <rect x="0" y="0" width="4" height="4" fill="#ccc"/>
                <rect x="4" y="4" width="4" height="4" fill="#ccc"/>
              </pattern>
            )}
            { isAlpha && (
              <pattern id={ 'f' + uid } width="100%" height="100%">
                <rect x="0" y="0" width="100%" height="100%" fill={`url(${resolveSvgUrl( '#b' + uid )})`}></rect>
                <rect x="0" y="0" width="100%" height="100%" fill={`url(${resolveSvgUrl( '#g' + uid )})`}></rect>
              </pattern>
            )}
          </defs>
          <rect 
            className="IroSliderBg"
            rx={ radius } 
            ry={ radius } 
            x={ props.borderWidth / 2 } 
            y={ props.borderWidth / 2 } 
            width={ width - props.borderWidth } 
            height={ height - props.borderWidth }
            stroke-width={ props.borderWidth }
            stroke={ props.borderColor }
            fill={ `url(${resolveSvgUrl( (isAlpha ? '#f' : '#g') + uid )})` }
          />
          <IroHandle
            isActive={ true }
            index={ activeColor.index }
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

IroSlider.defaultProps = {
  ...sliderDefaultOptions
};