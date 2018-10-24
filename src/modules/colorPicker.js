import { h, Component } from "preact";

import IroWheel from "ui/wheel";
import IroSlider from "ui/slider";

import IroColor from "modules/color";
import IroStyleSheet from "modules/stylesheet";

export default class ColorPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hsv: {h: 0, s: 0, v: 0}
    };
    this._events = {};
    this._colorChangeActive = false;
    this.css = props.css || props.styles || undefined;
    this.ui = [
      {element: IroWheel, options: {}},
      {element: IroSlider, options: {}},
    ];
  }

  componentDidMount() {
    this.el = this.base;
    this.stylesheet = new IroStyleSheet();
    this.color = new IroColor();
    this.color._onChange = this.update.bind(this);
    this.color.set(this.props.color);
    this.emit("mount", this);
  }

  // componentWillUnmount() {

  // }

  update(color, changes) {
    this.setState({ hsv: color.hsv });

    var css = this.css;
    var rgb = color.rgbString;

    for (var selector in css) {
      var properties = css[selector];
      for (var prop in properties) {
        this.stylesheet.setRule(selector, prop, rgb);
      }
    } 
    // Prevent infinite loops if the color is set inside a `color:change` callback
    if (!this._colorChangeActive) {
      // While _colorChangeActive = true, this event cannot be fired
      this._colorChangeActive = true;
      this.emit("color:change", this.color);
      this._colorChangeActive = false;
    }
  }

  /**
    * @desc Set a callback function for an event
    * @param {String} eventType Name of the event to listen to, pass "*" to listen to all events
    * @param {Function} callback Event callback
  */
  on(eventType, callback) {
    var events = this._events;
    (events[eventType] || (events[eventType] = [])).push(callback);
  }

  /**
    * @desc Remove a callback function for an event added with on()
    * @param {String} eventType The name of the event
    * @param {Function} callback The watch callback to remove from the event
  */
  off(eventType, callback) {
    var eventList = this._events[eventType];
    if (eventList) eventList.splice(eventList.indexOf(callback), 1);
  }

  /**
    * @desc Emit an event
    * @param {String} eventType The name of the event to emit
    * @param {Array} args array of args to pass to callbacks
  */
  emit(eventType, ...args) {
    var events = this._events,
        callbackList = (events[eventType] || []).concat((events["*"] || []));
    for (var i = 0; i < callbackList.length; i++) {
      callbackList[i].apply(null, args); 
    }
  }

  handleInput(type, hsv) {
    this.color.hsv = hsv;
    if (type === "START") {
      this.emit("input:start", this.color);
    } else if (type === "END") {
      this.emit("input:end", this.color)
    };
  }

  render(props, state) {
    const handleInput = (type, hsv) => this.handleInput(type, hsv);
    return (
      <svg 
        class="iro__svg"
        width={ props.width } 
        height={ props.height } 
        viewBox={`0 0 ${ props.width } ${ props.height }`}
        style={{
          "display": props.display || "block",
          "touch-action": "none"
        }}
      >
        {this.ui.map(({element: UiElement, options: options}) => (
          <UiElement parent={this} hsv={state.hsv} x={0} y={0} radius={100} rMax={100} onInput={handleInput} {...props}/>
        ))}
      </svg>
    )
  }
}

ColorPicker.defaultProps = {
  width: 300,
  height: 300,
  markerRadius: 8,
  color: "#fff",
  borderColor: "#fff",
  borderWidth: 0,
  anticlockwise: false,
  sliderHeight: 24,
  sliderMargin: 8
}