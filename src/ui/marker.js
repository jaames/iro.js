export default function IroMarker(props) {
  return (
    <svg class="iro__marker" x={props.x} y={props.y} overflow="visible">
      <circle class="iro__marker__outer" x={0} y={0} fill="none" stroke-width={5} stroke="#000" vectorEffect="non-scaling-stroke"></circle>
      <circle class="iro__marker__inner" x={0} y={0} fill="none" stroke-width={7} stroke="#fff" vectorEffect="non-scaling-stroke"></circle>
    </svg>
  );
}