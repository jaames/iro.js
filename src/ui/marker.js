import { h } from "preact";

export default function IroMarker(props) {
  return (
    <svg class="iro__marker" x={ props.x } y={ props.y } overflow="visible">
      <circle 
        class="iro__marker__outer" 
        x={ 0 }
        y={ 0 }
        r={ props.r }
        fill="none"
        stroke-width={ 5 }
        stroke="#000"
        vector-effect="non-scaling-stroke"
      />
      <circle 
        class="iro__marker__inner"
        x={ 0 }
        y={ 0 }
        r={ props.r }
        fill="none"
        stroke-width={ 7 }
        stroke="#fff"
        vector-effect="non-scaling-stroke"
      />
    </svg>
  );
}

IroMarker.defaultProps = {
  x: 0,
  y: 0,
  r: 8
};