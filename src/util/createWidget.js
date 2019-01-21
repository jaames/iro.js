import { h, render } from 'preact';
import { onDocumentReady } from './dom';

export default function createWidget(widgetComponent) {

  const widgetFactory = function (parent, props) {
    let widget = null;
    let widgetRoot = document.createElement('div');

    render(
      h(widgetComponent, {
        ref: ref => widget = ref,
        ...props,
      }), 
      widgetRoot.parentNode,
      widgetRoot
    );
    // Widget is now an instance of the widget component class
    onDocumentReady(() => {
      const container = typeof parent === Element ? parent : document.querySelector(parent);
      container.appendChild(widget.base);
      widget.mounted();
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