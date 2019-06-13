import { h, render } from 'preact';
import { onDocumentReady } from './dom';

/**
 * @desc Turn a component into a widget
 * This returns a factory function that can be used to create an instance of the widget component
 * The first function param is a DOM element or CSS selector for the element to mount to,
 * The second param is for config options which are passed to the component as props
 * This factory function can also delay mounting the element into the DOM until the page is ready
 * @param {Component} widgetComonpent ui component to turn into a widget
 * @returns {Function} widget factory
 */
export function createWidget(widgetComponent) {

  const widgetFactory = function (parent, props) {
    let widget = null; // will become an instance of the widget component class
    let widgetRoot = document.createElement('div');

    // Render widget into a temp DOM node
    render(
      h(widgetComponent, {
        ref: ref => widget = ref,
        ...props,
      }),
      widgetRoot
    );
    // Mount it into the DOM when the page document is ready
    onDocumentReady(() => {
      const container = parent instanceof Element ? parent : document.querySelector(parent);
      container.appendChild(widget.base);
      widget.onMount(container);
    });

    return widget;
  }

  // Allow the widget factory to inherit component prototype + static class methods
  // This makes it easier for plugin authors to extend the base widget component
  widgetFactory.prototype = widgetComponent.prototype;
  Object.assign(widgetFactory, widgetComponent);
  // Add reference to base component too
  widgetFactory.__component = widgetComponent; 

  return widgetFactory;

}