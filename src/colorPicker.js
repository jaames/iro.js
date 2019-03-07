import { h, Component } from 'preact';

import IroWheel from 'ui/wheel';
import IroSlider from 'ui/slider';
import IroColor from './color';
import { createWidget } from 'util/createWidget';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.emitHook('init:before');
    this._events = {};
    this._mounted = false;
    this._colorChangeActive = false;
    this.color = new IroColor();
    // Whenever the color changes, update the color wheel
    this.color._onChange = this.updateColor.bind(this);
    this.state = {
      ...props,
      color: this.color,
    };
    // set color value
    this.color.set(props.color);
    this.emitHook('init:state');

    if (props.layout) {
      this.layout = props.layout;
    } else {
      this.layout = [
        {component: IroWheel, options: {}},
        {component: IroSlider, options: {}},
      ];
    }
    this.emitHook('init:after');
  }

  // Public ColorPicker events API

  /**
   * @desc Set a callback function for an event
   * @param {String} eventType The name of the event to listen to
   * @param {Function} callback
   */
  on(eventType, callback) {
    const events = this._events;
    this.emitHook('event:on', eventType, callback);
    (events[eventType] || (events[eventType] = [])).push(callback);
    // Fire mount event immediately if the color picker has already mounted
    if (eventType === 'mount' && this._mounted) {
      this.emit('mount', this);
    }
    // Fire color change immediately if the color picker has already initiated
    if (eventType === 'color:change' && this._mounted) {
      this.emit('color:change', this.color, { h: false, s: false, v: false, a: false });
    }
  }

  /**
   * @desc Remove a callback function for an event added with on()
   * @param {String} eventType The name of the event
   * @param {Function} callback
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

  // Public utility methods

  /**
   * @desc Resize the color picker
   * @param {Number} width
   */
  resize(width) {
    this.setState({width});
  }

  /**
   * @desc Reset the color picker to the initial color provided in the color picker options
   */
  reset() {
    this.color.set(this.props.color);
  }

  // Plugin hooks API

  /**
   * @desc Set a callback function for a hook
   * @param {String} hookType The name of the hook to listen to
   * @param {Function} callback
   */
  static addHook(hookType, callback) {
    const pluginHooks = ColorPicker.pluginHooks;
    (pluginHooks[hookType] || (pluginHooks[hookType] = [])).push(callback);
  }

  /**
   * @desc Emit a callback hook
   * @access private
   * @param {String} hookType The type of hook event to emit
   */
  emitHook(hookType, ...args) {
    const callbackList = ColorPicker.pluginHooks[hookType] || [];
    for (let i = 0; i < callbackList.length; i++) {
      callbackList[i].apply(this, args); 
    }
  }

  // Internal methods

  /**
   * @desc Called by the createWidget wrapper when the element is mounted into the page
   * @access private
   * @param {Element} container the container element for this ColorPicker instance
   */
  onMount(container) {
    this.el = container;
    this._mounted = true;
    this.emit('mount', this);
    this.emit('color:change', this.color, { h: false, s: false, v: false, a: false });
  }

  /**
   * @desc React to a color update
   * @access private
   * @param {IroColor} color current color
   * @param {Object} changes shows which h,s,v color channels changed
   */
  updateColor(color, changes) {
    this.emitHook('color:beforeUpdate', color, changes);
    this.setState({ color: color });
    this.emitHook('color:afterUpdate', color, changes);
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
   * @access private
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

  render(props, state) {
    return (
      <div 
        class="iro__colorPicker"
        style={{
          display: state.display,
          width: state.width
        }}
      >
        {this.layout.map(({component: UiComponent, options: options}) => (
          <UiComponent
            {...state}
            {...options}
            onInput={ (type, hsv) => this.handleInput(type, hsv) }
            parent={ this }
          />
        ))}
      </div>
    )
  }
}

ColorPicker.pluginHooks = {};

ColorPicker.defaultProps = {
  width: 300,
  height: 300,
  handleRadius: 8,
  handleSvg: null,
  handleOrigin: {x: 0, y: 0},
  color: '#fff',
  borderColor: '#fff',
  borderWidth: 0,
  display: 'block',
  wheelLightness: true,
  sliderHeight: null,
  sliderMargin: 12,
  padding: 6,
  layout: null,
}

export default createWidget(ColorPicker);