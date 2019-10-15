/**
 * Listen to one or more events on an element
 */
export function listen(el: EventTarget, eventList: string[], callback: any, params?: AddEventListenerOptions) {
  for (var i = 0; i < eventList.length; i++) {
    el.addEventListener(eventList[i], callback, params);
  }
};

/**
 * Remove an event listener on an element
 */
export function unlisten(el: EventTarget, eventList: string[], callback: any, params?: AddEventListenerOptions) {
  for (var i = 0; i < eventList.length; i++) {
    el.removeEventListener(eventList[i], callback, params);
  }
};

/**
 * Call fn callback when the page document has fully loaded
 */
export function onDocumentReady(callback: Function) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    listen(document, ['DOMContentLoaded'], callback);
  }
};