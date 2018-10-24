import { h } from "preact";

export default function IroMarker(props) {
  return (
    <svg class="iro__marker" x={ props.x } y={ props.y } overflow="visible">
      <circle 
        class="iro__marker__inner"
        r={ props.r }
        fill="none"
        stroke-width={ 5 }
        stroke="#000"
      />
      <circle 
        class="iro__marker__outer" 
        r={ props.r }
        fill="none"
        stroke-width={ 2 }
        stroke="#fff"
      />
    </svg>
  );
}

IroMarker.defaultProps = {
  x: 0,
  y: 0,
  r: 8
};