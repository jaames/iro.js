import { h, render, ComponentType } from 'preact';

// Turn a component into a widget
// This returns a factory function that can be used to create an instance of the widget component
// The first function param is a DOM element or CSS selector for the element to mount to,
// The second param is for config options which are passed to the component as props
// This factory function can also delay mounting the element into the DOM until the page is ready
export function createWidget(WidgetComponent: ComponentType) {

  const widgetFactory = function (parent: string | HTMLElement, props: any) {
    let widget: any; // will become an instance of the widget component class
    const widgetRoot = document.createElement('div');

    // Render widget into a temp DOM node
    render(
      h(WidgetComponent, {
        ref: ref => widget = ref,
        ...props,
      }),
      widgetRoot
    );
    
    function mountWidget() {
      const container = parent instanceof Element ? parent : document.querySelector(parent);
      container.appendChild(widget.base);
      widget.onMount(container);
    };
    // Mount it into the DOM when the page document is ready
    if (document.readyState !== 'loading') {
      mountWidget();
    } else {
      document.addEventListener('DOMContentLoaded', mountWidget);
    }

    return widget;
  }

  // Allow the widget factory to inherit component prototype + static class methods
  // This makes it easier for plugin authors to extend the base widget component
  widgetFactory.prototype = WidgetComponent.prototype;
  Object.assign(widgetFactory, WidgetComponent);
  // Add reference to base component too
  widgetFactory.__component = WidgetComponent; 

  return widgetFactory;

}