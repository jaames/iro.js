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
    this._deferredEvents = {};
    this._colorUpdateActive = false;
    this._colorUpdateSrc = null;
    this.color = new IroColor(props.color);
    this.deferredEmit('color:init', this.color, { h: false, s: false, v: false, a: false });
    // Whenever the color changes, update the color wheel
    this.color._onChange = this.updateColor.bind(this);
    this.state = {
      ...props,
      color: this.color,
    };
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
   * @param {String | Array} eventList event(s) to listen to
   * @param {Function} callback
   */
  on(eventList, callback) {
    const events = this._events;
    (!Array.isArray(eventList) ? [eventList] : eventList).forEach(eventType => {
      this.emitHook('event:on', eventType, callback);
      (events[eventType] || (events[eventType] = [])).push(callback);
      // Call deferred events
      if (this._deferredEvents[eventType]) {
        this._deferredEvents[eventType].forEach(args => {
          callback.apply(null, args); 
        });
        this._deferredEvents[eventType] = [];
      }
    });
  }

  /**
   * @desc Remove a callback function for an event added with on()
   * @param {String | Array} eventList The name of the event
   * @param {Function} callback
   */
  off(eventList, callback) {
    (!Array.isArray(eventList) ? [eventList] : eventList).forEach(eventType => {
      const callbackList = this._events[eventType];
      this.emitHook('event:off', eventType, callback);
      if (callbackList) callbackList.splice(callbackList.indexOf(callback), 1);
    });
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

  /**
   * @desc Emit an event now, or save it for when the relevent event listener is added
   * @param {String} eventType The name of the event to emit
   * @param {Array} args array of args to pass to callbacks
   */
  deferredEmit(eventType, ...args) {
    const deferredEvents = this._deferredEvents;
    this.emit(eventType, ...args);
    (deferredEvents[eventType] || (deferredEvents[eventType] = [])).push(args);
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
    this.deferredEmit('mount', this);
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
    // Prevent infinite loops if the color is set inside a color:change or input:change callback
    if (!this._colorUpdateActive) {
      // While _colorUpdateActive == true, this event cannot be fired
      this._colorUpdateActive = true;
      // If the color change originates from user input, fire input:change
      if (this._colorUpdateSrc == 'input') {
        this.emit('input:change', color, changes);
      } 
      // Always fire color:change event
      this.emit('color:change', color, changes);
      this._colorUpdateActive = false;
    }
  }

  /**
   * @desc Handle input from a UI control element
   * @access private
   * @param {String} type "START" | "MOVE" | "END"
   * @param {Object} hsv new hsv values for the color
   */
  handleInput(type, hsv) {
    // Fire input start and move events before color update
    if (type === 'START') this.emit('input:start', this.color);
    if (type === 'MOVE') this.emit('input:move', this.color);
    // Set the color update source
    this._colorUpdateSrc = 'input';
    // Setting the color HSV here will automatically update the UI
    // Since we bound the color's _onChange callback
    this.color.hsv = hsv;
    // Fire input end event after color update
    if (type === 'END') this.emit('input:end', this.color);
    // Reset color update source so it doesn't interfere with future color updates
    // Super important to do this here and not in updateColor()
    this._colorUpdateSrc = null;
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