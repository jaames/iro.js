/**
 * @desc Parse a css unit string - either regular int or a percentage number
 * @param {String} str input string
 * @param {String} max max number for converting percentages
 * @returns {Number} 
 */
export function parseUnit(str, max) {
  const isPercentage = str.indexOf('%') > -1;
  const num = parseFloat(str);
  return isPercentage ? (max / 100) * num : num;
}

/**
 * @desc Parse hex str to an int
 * @param {String} str input string
 * @returns {Number} 
 */
export function parseHexInt(str) {
  return parseInt(str, 16);
}

/**
 * @desc Convert into to 2-digit hex
 * @param {Number} int input number
 * @returns {String} 
 */
export function intToHex(int) {
  return int.toString(16).padStart(2, '0');
}