import { h } from "preact";

export default function IroMarker({ x, y, r }) {
  return (
    <svg class="iro__marker" x={ x } y={ y } overflow="visible">
      <circle 
        class="iro__marker__inner"
        r={ r }
        fill="none"
        stroke-width={ 5 }
        stroke="#000"
      />
      <circle 
        class="iro__marker__outer" 
        r={ r }
        fill="none"
        stroke-width={ 2 }
        stroke="#fff"
      />
    </svg>
  );
}