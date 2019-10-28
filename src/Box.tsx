import { h } from 'preact';
import {
  resolveSvgUrl,
  getBoxStyles,
  getBoxDimensions,
  getBoxGradients,
  getBoxValueFromInput,
  getBoxHandlePosition
} from 'iro-core';

import { IroComponentBase, IroComponentProps, EventResult } from './ComponentBase';
import { IroHandle } from './Handle';

interface IroBoxProps extends IroComponentProps {}

export function IroBox(props: IroBoxProps) {
  const { width, height, radius } = getBoxDimensions(props);
  const gradients = getBoxGradients(props);
  const handlePos = getBoxHandlePosition(props);

  function handleInput(x: number, y: number, bounds: DOMRect | ClientRect, type: EventResult) {
    props.parent.inputActive = true;
    props.color.hsv = getBoxValueFromInput(props, x, y, bounds);
    props.onInput(type);
  }

  return (
    <IroComponentBase onInput={ handleInput }>
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