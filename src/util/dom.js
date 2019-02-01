/**
 * @desc listen to one or more events on an element
 * @param {Element} el target element
 * @param {Array} eventList the events to listen to
 * @param {Function} callback
 * @param {Object} params params to pass to addEventListener
 */
export function listen(el, eventList, callback, params={}) {
  for (var i = 0; i < eventList.length; i++) {
    el.addEventListener(eventList[i], callback, params);
  }
};

/**
 * @desc remove an event listener on an element
 * @param {Element} el target element
 * @param {Array} eventList the events to remove
 * @param {Function} callback
 * 
 */
export function unlisten(el, eventList, callback) {
  for (var i = 0; i < eventList.length; i++) {
    el.removeEventListener(eventList[i], callback);
  }
};

/**
 * @desc call fn callback when the page document has fully loaded
 * @param {Function} callback
 */
export function onDocumentReady(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    listen(document, ['DOMContentLoaded'], callback);
  }
};