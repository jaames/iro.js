import { h } from 'preact';
import {
  resolveSvgUrl,
  getSliderDimensions, 
  getSliderValueFromInput, 
  getSliderHandlePosition, 
  getSliderGradient,
} from 'iro-core';

import { IroComponentBase, IroComponentProps, EventResult } from './component';
import { IroHandle } from './handle';

interface IroSliderProps extends IroComponentProps {
  sliderType: string;
}

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

  function handleInput(x: number, y: number, bounds: DOMRect | ClientRect, type: EventResult) {
    const value = getSliderValueFromInput(this.props, x, y, bounds);
    let channel;
    switch (this.props.sliderType) {
      case 'hue':
        channel = 'h';
        break;
      case 'saturation':
        channel = 's';
        break;
      case 'value':
      default:
        channel = 'v';
        break;
    }
    this.props.onInput(type, {
      [channel]: value
    });
  }

  return (
    <IroComponentBase onInput={ handleInput.bind(this) }>
      {(uid, rootProps, rootStyles) => (
        <svg 
          { ...rootProps }
          className="iro__slider"
          width={ width }
          height={ height }
          style= {{
            ...rootStyles,
            marginTop: props.sliderMargin,
          }}
        >
          <defs>
            <linearGradient id={ uid }>
              { gradient.map(([ offset, color ]) => (
                <stop offset={`${ offset }%`} stop-color={ color } />
              ))}
            </linearGradient>
          </defs>
          <rect 
            className="iro__slider__value"
            rx={ radius } 
            ry={ radius } 
            x={ props.borderWidth / 2 } 
            y={ props.borderWidth / 2 } 
            width={ width - props.borderWidth } 
            height={ height - props.borderWidth }
            stroke-width={ props.borderWidth }
            stroke={ props.borderColor }
            fill={ `url(${resolveSvgUrl('#' + uid)})` }
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