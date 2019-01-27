export function parseUnit(str, max) {
  const isPercentage = str.indexOf('%') > -1;
  const num = parseFloat(str);
  return isPercentage ? (max / 100) * num : num;
}

export function parseHexInt(str) {
  return parseInt(str, 16);
}

export function intToHex(int) {
  return int.toString(16).padStart(2, '0');
}