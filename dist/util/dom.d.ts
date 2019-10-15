/**
 * Listen to one or more events on an element
 */
export declare function listen(el: EventTarget, eventList: string[], callback: any, params?: AddEventListenerOptions): void;
/**
 * Remove an event listener on an element
 */
export declare function unlisten(el: EventTarget, eventList: string[], callback: any, params?: AddEventListenerOptions): void;
/**
 * Call fn callback when the page document has fully loaded
 */
export declare function onDocumentReady(callback: Function): void;
