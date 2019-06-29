/**
 * @desc Resolve an SVG URL
 * This is required to work around how Safari handles gradient URLS under certain conditions
 * If a page is using a client-side routing library which makes use of the HTML <base> tag,
 * Safari won't be able to render SVG gradients properly (as they are referenced by URLs)
 * More info on the problem:
 * https://stackoverflow.com/questions/19742805/angular-and-svg-filters/19753427#19753427
 * https://github.com/jaames/iro.js/issues/18
 * https://github.com/jaames/iro.js/issues/45
 * @param {String} url resource url (should be an id selector e.g "#example")
 * @returns {String} resolved url
 */
export declare function resolveUrl(url: any): any;
/**
 * @desc create the path commands to draw an svg arc
 * @param {Number} cx center point x
 * @param {Number} cy center point y
 * @param {Number} radius arc radius
 * @param {Number} startAngle arc start angle (degrees)
 * @param {Number} endAngle arc end angle (degrees)
 * @returns {String} arc path commands
 */
export declare function createArcPath(cx: any, cy: any, radius: any, startAngle: any, endAngle: any): string;
