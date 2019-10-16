import { IroColor } from './color';

export function getSliderDimensions(props: any) {
  let { width, sliderHeight, borderWidth, handleRadius } = props;
  sliderHeight = sliderHeight ? sliderHeight : props.padding * 2 + handleRadius * 2 + borderWidth * 2;
  return {
    radius: sliderHeight / 2,
    x: 0,
    y: 0,
    width: width,
    height: sliderHeight,
  }
}

export function getCurrentSliderValue(props: any) {
  const hsv = props.color.hsv;
  switch (props.sliderType) {
    case 'hue':
      return hsv.h /= 3.6;
    case 'saturation':
      return hsv.s;
    case 'value':
    default:
      return hsv.v;
  }
}

export function getSliderValueFromInput(props: any, x: number, y: number, bounds) {
  const handleRange = bounds.width - bounds.height;
  const cornerRadius = bounds.height / 2;
  let dist = x - (bounds.left + cornerRadius);
  dist = Math.max(Math.min(dist, handleRange), 0);
  return Math.round((100 / handleRange) * dist);
}

export function getSliderHandlePosition(props: any) {
  const { width, height, radius } = getSliderDimensions(props);
  const sliderValue = getCurrentSliderValue(props);
  const handleRange = width - radius * 2;
  const x = radius + (sliderValue / 100) * handleRange;
  const y = height / 2;
  return {x, y};
}

export function getSliderGradient(props: any) {
  const hsv = props.color.hsv;

  switch (props.sliderType) {
    case 'hue':
      return [
        {offset: '0',      color: '#f00'},
        {offset: '16.666', color: '#ff0'},
        {offset: '33.333', color: '#0f0'},
        {offset: '50',     color: '#0ff'},
        {offset: '66.666', color: '#00f'},
        {offset: '83.333', color: '#f0f'},
        {offset: '100',    color: '#f00'},
      ];
    case 'saturation':
      const noSat = IroColor.hsvToHsl({h: hsv.h, s: 0, v: hsv.v});
      const fullSat = IroColor.hsvToHsl({h: hsv.h, s: 100, v: hsv.v});
      return [
        {offset: '0', color: `hsl(${noSat.h}, ${noSat.s}%, ${noSat.l}%)`},
        {offset: '100', color: `hsl(${fullSat.h}, ${fullSat.s}%, ${fullSat.l}%)`}
      ];
    case 'value':
    default:
      const hsl = IroColor.hsvToHsl({h: hsv.h, s: hsv.s, v: 100});
      return [
        {offset: '0', color: '#000'},
        {offset: '100', color: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
      ];
  }
}