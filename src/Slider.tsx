import { h } from 'preact';
import {
  IroColor,
  SliderShape,
  SliderType,
  sliderDefaultOptions,
  resolveSvgUrl,
  getSliderStyles,
  getSliderDimensions, 
  getSliderValueFromInput, 
  getSliderHandlePosition, 
  getSliderGradient,
  getSliderGradientCoords
} from 'iro-core';

import { IroComponentBase, IroComponentProps, EventResult } from './ComponentBase';
import { IroHandle } from './Handle';

interface IroSliderProps extends IroComponentProps {
  sliderType: SliderType;
  sliderShape: SliderShape;
  minTemperature: number;
  maxTemperature: number;
};

export function IroSlider(props: IroSliderProps) {
  const {
    x, 
    y,
    width,
    height,
    radius
  } = getSliderDimensions(props);
  
  const handlePos = getSliderHandlePosition(props);
  const gradient = getSliderGradient(props);
  const isAlpha = props.sliderType === 'alpha';

  function handleInput(x: number, y: number, bounds: DOMRect | ClientRect, type: EventResult) {
    const value = getSliderValueFromInput(this.props, x, y, bounds);
    let hsv = {};
    switch (this.props.sliderType) {
      case 'alpha':
        hsv = {a: value};
        break;
      case 'temperature':
        hsv = IroColor.rgbToHsv(IroColor.kelvinToRgb(value));
        break;
      case 'hue':
        hsv = {h: value};
        break;
      case 'saturation':
          hsv = {s: value};
        break;
      case 'value':
      default:
          hsv = {v: value};
        break;
    }
    this.props.onInput(type, hsv);
  }

  return (
    <IroComponentBase onInput={ handleInput.bind(this) }>
      {(uid, rootProps, rootStyles) => (
        <svg 
          { ...rootProps }
          className="IroSlider"
          width={ width }
          height={ height }
          style= {{
            ...rootStyles,
            ...getSliderStyles(props)
          }}
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
                <rect x="0" y="0" width="100%" height="100%" fill={`url(${resolveSvgUrl( '#b' + uid )})`}></rect> }
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
            r={ props.handleRadius }
            url={ props.handleSvg }
            origin={ props.handleOrigin }
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