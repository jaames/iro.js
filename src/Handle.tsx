import { h } from 'preact';
import { resolveSvgUrl } from '@irojs/iro-core';

interface IroHandleProps {
  x: number;
  y: number;
  r: number;
  url: string;
  props: any;
}

export function IroHandle(props: IroHandleProps) {
  const radius = props.r;
  const url = props.url;

  return (
    <svg className="IroHandle" x={ props.x } y={ props.y } style={{ overflow: 'visible' }}>
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
          fill="none"
          stroke-width={ 2 }
          stroke="#fff"
        />
      )}
    </svg>
  );
}

IroHandle.defaultProps = {
  x: 0,
  y: 0,
  r: 8,
  url: null,
  props: {x: 0, y: 0}
};