/**
 * Fix related to how Safari handles gradient URLS under certain conditions
 * TL;DR if a page is using a client-side routing library which makes use of the HTML <base> tag, 
 * Safari won't be able to render SVG gradients properly (as they are referenced by URLs)
 * More info on the problem: 
 * https://stackoverflow.com/questions/19742805/angular-and-svg-filters/19753427#19753427
 * https://github.com/jaames/iro.js/issues/18
 * https://github.com/jaames/iro.js/issues/45
*/

export function resolveUrl(url) {
  // Sniff useragent string to check if the user is running Safari
  const isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
  const location = window.location;
  const path = isSafari ? `${location.protocol}//${location.host}${location.pathname}${location.search}${url}` : url;
  return `url(${path})`;
}

export function createArcPath(cx, cy, radius, startAngle, endAngle) {
  var largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  startAngle *= Math.PI / 180;
  endAngle *= Math.PI / 180;
  var x1 = cx + radius * Math.cos(endAngle);
  var y1 = cy + radius * Math.sin(endAngle);
  var x2 = cx + radius * Math.cos(startAngle);
  var y2 = cy + radius * Math.sin(startAngle);
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${x2} ${y2}`;
}