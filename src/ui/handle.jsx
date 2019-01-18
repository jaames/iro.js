import { h } from 'preact';

export default function IroHandle({ x, y, r }) {
  return (
    <svg class="iro__handle" x={ x } y={ y } overflow="visible">
      <circle 
        class="iro__handle__inner"
        r={ r }
        fill="none"
        stroke-width={ 5 }
        stroke="#000"
      />
      <circle 
        class="iro__handle__outer" 
        r={ r }
        fill="none"
        stroke-width={ 2 }
        stroke="#fff"
      />
    </svg>
  );
}