/**
 * @desc Parse a css unit string - either regular int or a percentage number
 * @param {String} str input string
 * @param {String} max max number for converting percentages
 * @returns {Number}
 */
export declare function parseUnit(str: any, max: any): number;
/**
 * @desc Parse hex str to an int
 * @param {String} str input string
 * @returns {Number}
 */
export declare function parseHexInt(str: any): number;
/**
 * @desc Convert into to 2-digit hex
 * @param {Number} int input number
 * @returns {String}
 */
export declare function intToHex(int: any): any;
