import { h } from 'preact';
import { resolveUrl } from '../util/svg';

function IroHandle({ x, y, r, origin, url }) {
  return (
    <svg class="iro__handle" x={ x - origin.x } y={ y - origin.y } overflow="visible">
      {url && (
        <use xlinkHref={resolveUrl(url)} x="0" y="0"/>
      )}
      {!url && (
        <circle 
          class="iro__handle__inner"
          r={ r }
          fill="none"
          stroke-width={ 2 }
          stroke="#000"
        />
      )}
      {!url && (
        <circle 
          class="iro__handle__outer" 
          r={ r - 2 }
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
  origin: {x: 0, y: 0}
};

export default IroHandle;