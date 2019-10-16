/**
 * Parse a css unit string - either regular int or a percentage number
 */
export function parseUnit(str: string, max: number): number {
  const isPercentage = str.indexOf('%') > -1;
  const num = parseFloat(str);
  return isPercentage ? (max / 100) * num : num;
}

/**
 * Parse hex str to an int
 */
export function parseHexInt(str: string): number {
  return parseInt(str, 16);
}

/**
 * Convert into to 2-digit hex
 */
export function intToHex(int: number): string {
  return int.toString(16).padStart(2, '0');
}