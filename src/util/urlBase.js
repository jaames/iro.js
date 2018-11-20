// Fix related to how Safari handles gradient URLS under certain conditions

// TL;DR if a page is using a client-side routing library which makes use of the HTML <base> tag, 
// Safari won't be able to render SVG gradients properly (as they are referenced by URLs)
// More info on the problem: 
// https://stackoverflow.com/questions/19742805/angular-and-svg-filters/19753427#19753427
// https://github.com/jaames/iro.js/issues/18

// TODO: fix for https://github.com/jaames/iro.js/issues/45

export default function getUrlBase() {
  // Sniff useragent string to check if the user is running IE, Edge or Safari
  const isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
  return isSafari ? `${location.protocol}//${location.host}${location.pathname}` : "";
}