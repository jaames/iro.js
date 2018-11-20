import { h, Component } from "preact";

import IroWheel from "ui/wheel";
import IroSlider from "ui/slider";
import IroColor from "modules/color";
import IroStyleSheet from "modules/stylesheet";

// sniff useragent string to check if the user is running IE, Edge or Safari
const USER_AGENT = window.navigator.userAgent.toLowerCase();
const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(USER_AGENT);

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this._events = {};
    this._colorChangeActive = false;
    this.color = new IroColor();
    this.color.set(props.color);
    this.color._onChange = this.update.bind(this);
    this.state = {
      hsv: this.color.hsv
    };
    this.ui = [
      {element: IroWheel, options: {}},
      {element: IroSlider, options: {}},
    ];
  }

  componentDidMount() {
    this.el = this.base;
    this.stylesheet = new IroStyleSheet();
    this.updateStylesheet();
    this.emit("mount", this);
  }

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

  update(color) {
    this.setState({ hsv: color.hsv });
    this.updateStylesheet();
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
    const events = this._events;
    (events[eventType] || (events[eventType] = [])).push(callback);
  }

  /**
    * @desc Remove a callback function for an event added with on()
    * @param {String} eventType The name of the event
    * @param {Function} callback The watch callback to remove from the event
  */
  off(eventType, callback) {
    const callbackList = this._events[eventType];
    if (callbackList) callbackList.splice(callbackList.indexOf(callback), 1);
  }

  /**
    * @desc Emit an event
    * @param {String} eventType The name of the event to emit
    * @param {Array} args array of args to pass to callbacks
  */
  emit(eventType, ...args) {
    const callbackList = this._events[eventType] || [];
    for (let i = 0; i < callbackList.length; i++) {
      callbackList[i].apply(null, args); 
    }
  }

  handleInput(type, hsv) {
    this.color.hsv = hsv;
    if (type === "START") {
      this.emit("input:start", this.color);
    } else if (type === "END") {
      this.emit("input:end", this.color);
    }
  }

  render(props, { hsv }) {
    const urlBase = IS_SAFARI ? (location.protocol + "//" + location.host + location.pathname) : "";
    return (
      <div 
        class="iro__colorPicker"
        style={{
          "display": props.display || "flex",
          "flex-direction": "column",
          "touch-action": "none"
        }}
      >
        {this.ui.map(({element: UiElement, options: options}) => (
          <UiElement 
            parent={ this } 
            hsv={ hsv }
            width={ props.width }
            urlBase = { urlBase }
            onInput={ (type, hsv) => this.handleInput(type, hsv) } 
            {...props}
            {...options}
          />
        ))}
      </div>
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
  sliderHeight: 32,
  sliderMargin: 8,
  padding: 6,
  css: {}
}