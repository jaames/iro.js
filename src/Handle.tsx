import { h } from 'preact';
import { resolveSvgUrl, cssValue } from '@irojs/iro-core';

interface IroHandleProps {
  isActive: boolean;
  index: number;
  x: number | string;
  y: number | string;
  r: number;
  url: string;
  props: any;
  fill?: string;
}

export function IroHandle(props: IroHandleProps) {
  const radius = props.r;
  const url = props.url;

  return (
    <svg 
      className={`IroHandle IroHandle--${props.index} ${props.isActive ? 'IroHandle--isActive' : ''}`}
      style={{
        top: cssValue(props.y),
        left: cssValue(props.x),
        width: '1px',
        height: '1px',
        position: 'absolute',
        overflow: 'visible'
      }}
    >
      {url && (
        <use xlinkHref={resolveSvgUrl(url)} { ...props.props }/>
      )}
      {!url && (
        <circle 
          r={ radius }
          fill="none"
          stroke-width={ 2 }
          stroke="#000"
        />
      )}
      {!url && (
        <circle 
          r={ radius - 2 }
          fill={ props.fill } 
          stroke-width={ 2 }
          stroke="#fff"
        />
      )}
    </svg>
  );
}

IroHandle.defaultProps = {
  fill: 'none',
  x: 0,
  y: 0,
  r: 8,
  url: null,
  props: {x: 0, y: 0}
};