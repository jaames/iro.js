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
export function resolveUrl(url) {
  // Sniff useragent string to check if the user is running Safari
  const ua = window.navigator.userAgent;
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isIos = /iPhone|iPod|iPad/i.test(ua);
  const location = window.location;
  return (isSafari || isIos) ? `${location.protocol}//${location.host}${location.pathname}${location.search}${url}` : url;
}

/**
 * @desc create the path commands to draw an svg arc
 * @param {Number} cx center point x
 * @param {Number} cy center point y
 * @param {Number} radius arc radius
 * @param {Number} startAngle arc start angle (degrees)
 * @param {Number} endAngle arc end angle (degrees)
 * @returns {String} arc path commands
 */
export function createArcPath(cx, cy, radius, startAngle, endAngle) {
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  startAngle *= Math.PI / 180;
  endAngle *= Math.PI / 180;
  const x1 = cx + radius * Math.cos(endAngle);
  const y1 = cy + radius * Math.sin(endAngle);
  const x2 = cx + radius * Math.cos(startAngle);
  const y2 = cy + radius * Math.sin(startAngle);
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${x2} ${y2}`;
}