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
  const cx = radius;
  const cy = radius;

  return (
    <svg 
      className={`IroHandle IroHandle--${props.index} ${props.isActive ? 'IroHandle--isActive' : ''}`}
      style={{
        transform: `translate(${ cssValue(props.x) }, ${ cssValue(props.y) })`,
        willChange: 'transform',
        top: cssValue(-radius),
        left: cssValue(-radius),
        width: cssValue(radius * 2),
        height: cssValue(radius * 2),
        position: 'absolute',
        overflow: 'visible'
      }}
    >
      {url && (
        <use xlinkHref={resolveSvgUrl(url)} { ...props.props }/>
      )}
      {!url && (
        <circle
          cx={ cx }
          cy={ cy }
          r={ radius }
          fill="none"
          stroke-width={ 2 }
          stroke="#000"
        />
      )}
      {!url && (
        <circle 
          cx={ cx }
          cy={ cy }
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