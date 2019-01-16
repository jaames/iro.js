import { h, render } from 'preact';
import { whenReady } from './dom';

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
    // widgetRoot is now the widget's root element
    
    whenReady(() => {
      const container = typeof parent === Element ? parent : document.querySelector(parent);
      container.appendChild(widgetRoot);
    });

    return widget;
  }

}