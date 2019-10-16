export function translateWheelAngle(props: any, angle: number) {
  const wheelAngle = props.wheelAngle;
    if (props.wheelDirection === 'clockwise') {
      angle = -360 + angle - wheelAngle;
    } else {
      angle = wheelAngle - angle
    }
    // javascript's modulo operator doesn't produce positive numbers with negative input
    // https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e
    return (angle % 360 + 360) % 360;
}

export function getWheelCenter(props: any) {
  const dist = (props.width / 2);
  return {
    x: dist,
    y: dist
  };
}

export function getWheelHandlePosition(props: any) {
  const hsv = props.color.hsv;
  const { width, borderWidth, padding, handleRadius, wheelDirection } = props;
  const radius = width / 2 - borderWidth;
  const center = getWheelCenter(props);
  const handleAngle = translateWheelAngle(props, hsv.h) * (Math.PI / 180);
  const handleRange = radius - padding - handleRadius - borderWidth;
  const handleDist = (hsv.s / 100) * handleRange;
  const direction = wheelDirection === 'clockwise' ? -1 : 1;
  return {
    x: center.x + handleDist * Math.cos(handleAngle) * direction,
    y: center.y + handleDist * Math.sin(handleAngle) * direction,
  }
}

export function getWheelValueFromInput(props: any, x: number, y: number, bounds) {
  const { left, top } = bounds;
  const radius = props.width / 2;
  const handleRange = (radius - props.padding - props.handleRadius - props.borderWidth);
  const cX = radius;
  const cY = radius;
  x = cX - (x - left);
  y = cY - (y - top);
  const handleAngle = Math.atan2(y, x);
  // Calculate the hue by converting the angle to radians
  const hue = translateWheelAngle(props, Math.round(handleAngle * (180 / Math.PI)) + 180);
  // Find the point's distance from the center of the wheel
  // This is used to show the saturation level
  const handleDist = Math.min(Math.sqrt(x * x + y * y), handleRange);
  return {
    h: hue,
    s: Math.round((100 / handleRange) * handleDist)
  };
}