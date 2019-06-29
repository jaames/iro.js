/**
 * @desc listen to one or more events on an element
 * @param {Element} el target element
 * @param {Array} eventList the events to listen to
 * @param {Function} callback
 * @param {Object} params params to pass to addEventListener
 */
export declare function listen(el: any, eventList: any, callback: any, params?: {}): void;
/**
 * @desc remove an event listener on an element
 * @param {Element} el target element
 * @param {Array} eventList the events to remove
 * @param {Function} callback
 * @param {Object} params params to pass to removeEventListener
 */
export declare function unlisten(el: any, eventList: any, callback: any, params?: {}): void;
/**
 * @desc call fn callback when the page document has fully loaded
 * @param {Function} callback
 */
export declare function onDocumentReady(callback: any): void;
