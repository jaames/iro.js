const EVENT_READYSTATE_CHANGE = "readystatechange",
READYSTATE_COMPLETE = "complete";

/**
  * @desc listen to one or more events on an element
  * @param {Element} el target element
  * @param {Array} eventList the events to listen to
  * @param {Function} callback the event callback function
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
* @param {Function} callback the event callback function
*/
export function unlisten(el, eventList, callback) {
  for (var i = 0; i < eventList.length; i++) {
    el.removeEventListener(eventList[i], callback);
  }
};

/**
* @desc call fn callback when the page document is ready
* @param {Function} callback callback function to be called
*/
export function whenReady(callback) {
  var _this = this;
  if (document.readyState == READYSTATE_COMPLETE) {
    callback();
  }
  else {
    listen(document, [EVENT_READYSTATE_CHANGE], function stateChange(e) {
      if (document.readyState == READYSTATE_COMPLETE) {
        callback();
        unlisten(document, [EVENT_READYSTATE_CHANGE], stateChange);
      }
    });
  }
};