import { h, Component } from 'preact';

import IroWheel from 'ui/wheel';
import IroSlider from 'ui/slider';
import IroColor from './color';
import IroStyleSheet from './stylesheet';
import { createWidget } from 'util/createWidget';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.emitHook('init:before');
    this._events = {};
    this._colorChangeActive = false;
    this.color = new IroColor(props.color);
    // Whenever the color changes, update the color wheel
    this.color._onChange = this.update.bind(this);
    this.state = {
      color: this.color
    };
    this.emitHook('init:state');
    this.ui = [
      {element: IroWheel, options: {}},
      {element: IroSlider, options: {}},
    ];
    // deprecated -- use colorPicker.forceUpdate() instead
    // Fix for a gradient rendering but when certain cliet-side routing libraries in Safari
    // See https://github.com/jaames/iro.js/issues/18
    // this.on('history:stateChange', () => {
    //   this.setState({ urlBase: getUrlBase() });
    // });
    this.emitHook('init:after');
  }

  componentDidMount() {
    this.el = this.base;
    this.stylesheet = new IroStyleSheet();
    this.updateStylesheet();
    this.emitHook('init:mount');
  }

  mounted() {
    this.emit('mount', this);
  }

  render(props, { color }) {
    return (
      <div 
        class="iro__colorPicker"
        style={{
          display: props.display,
          width: props.width
        }}
      >
        {this.ui.map(({element: UiElement, options: options}) => (
          <UiElement 
            {...props}
            {...options}
            onInput={ (type, hsv) => this.handleInput(type, hsv) }
            parent={ this }
            color={ color }
            width={ props.width }
          />
        ))}
      </div>
    )
  }

  /**
    * @desc Set a callback function for an event
    * @param {String} eventType The name of the event to listen to, pass "*" to listen to all events
    * @param {Function} callback The watch callback
  */
  on(eventType, callback) {
    const events = this._events;
    this.emitHook('event:on', eventType, callback);
    (events[eventType] || (events[eventType] = [])).push(callback);
  }

  /**
    * @desc Remove a callback function for an event added with on()
    * @param {String} eventType The name of the event
    * @param {Function} callback The watch callback to remove from the event
  */
  off(eventType, callback) {
    const callbackList = this._events[eventType];
    this.emitHook('event:off', eventType, callback);
    if (callbackList) callbackList.splice(callbackList.indexOf(callback), 1);
  }

  /**
    * @desc Emit an event
    * @param {String} eventType The name of the event to emit
    * @param {Array} args array of args to pass to callbacks
  */
  emit(eventType, ...args) {
    // Events are plugin hooks too
    this.emitHook(eventType, ...args);
    const callbackList = this._events[eventType] || [];
    for (let i = 0; i < callbackList.length; i++) {
      callbackList[i].apply(null, args); 
    }
  }

  static addHook(hookType, callback) {
    const pluginHooks = ColorPicker.pluginHooks;
    (pluginHooks[hookType] || (pluginHooks[hookType] = [])).push(callback);
  }

  emitHook(hookType, ...args) {
    const callbackList = ColorPicker.pluginHooks[hookType] || [];
    for (let i = 0; i < callbackList.length; i++) {
      callbackList[i].apply(this, args); 
    }
  }

  /**
    * @desc Update dynamic stylesheet to match the current color
  */
  updateStylesheet() {
    const css = this.props.css;
    const rgb = this.color.rgbString;
    for (let selector in css) {
      let properties = css[selector];
      for (let property in properties) {
        this.stylesheet.setRule(selector, property, rgb);
      }
    }
  }

  /**
    * @desc React to the color updating
    * @param {IroColor} color current color
    * @param {Object} changes shows which h,s,v color channels changed
  */
  update(color, changes) {
    this.emitHook('color:beforeUpdate', color, changes);
    this.setState({ color: color });
    this.emitHook('color:afterUpdate', color, changes);
    this.updateStylesheet();
    // Prevent infinite loops if the color is set inside a `color:change` callback
    if (!this._colorChangeActive) {
      // While _colorChangeActive = true, this event cannot be fired
      this._colorChangeActive = true;
      this.emit('color:change', color, changes);
      this._colorChangeActive = false;
    }
  }

  /**
    * @desc Handle input from a UI control element
    * @param {String} type "START" | "MOVE" | "END"
    * @param {Object} hsv new hsv values for the color
  */
  handleInput(type, hsv) {
    // Setting the color HSV here will automatically update the UI
    // Since we bound the color's _onChange callback
    this.color.hsv = hsv;
    let eventType = { START: 'input:start', MOVE: 'input:move', END: 'input:end' }[type];
    this.emit(eventType, this.color);
  }
}

ColorPicker.pluginHooks = {};

ColorPicker.defaultProps = {
  width: 300,
  height: 300,
  handleRadius: 8,
  color: "#fff",
  borderColor: "#fff",
  borderWidth: 0,
  display: 'block',
  anticlockwise: false,
  sliderHeight: 32,
  sliderMargin: 8,
  padding: 6,
  css: {}
}

export default createWidget(ColorPicker);