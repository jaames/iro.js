/**
 * @desc Turn a component into a widget
 * This returns a factory function that can be used to create an instance of the widget component
 * The first function param is a DOM element or CSS selector for the element to mount to,
 * The second param is for config options which are passed to the component as props
 * This factory function can also delay mounting the element into the DOM until the page is ready
 * @param {Component} widgetComonpent ui component to turn into a widget
 * @returns {Function} widget factory
 */
export declare function createWidget(widgetComponent: any): {
    (parent: any, props: any): any;
    prototype: any;
    __component: any;
};
