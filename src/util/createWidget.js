import { h, render } from 'preact';
import { onDocumentReady } from './dom';

export default function(WidgetComponent) {

  return function (parent, props) {
    let widget = null;
    let widgetRoot = document.createElement('div');

    render(
      h(WidgetComponent, {
        ref: ref => widget = ref,
        ...props,
      }), 
      widgetRoot.parentNode,
      widgetRoot
    );
    // widget is now an instance of the widget component class
    onDocumentReady(() => {
      const container = typeof parent === Element ? parent : document.querySelector(parent);
      container.appendChild(widget.base);
      widget.mounted();
    });

    return widget;
  }

}