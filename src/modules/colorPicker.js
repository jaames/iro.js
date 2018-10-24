import { h, Component } from "preact";

import IroWheel from "ui/wheel";
import IroSlider from "ui/slider";

import iroColor from "modules/color";
import iroStyleSheet from "modules/stylesheet";

// import { whenReady } from "util/dom";

export default class ColorPicker extends Component {

  constructor(props) {
    super(props);
    this._events = {};
    this._colorChangeActive = false;
    this.css = props.css || props.styles || undefined;
    this.color = new iroColor(props.color);
    this.state = {
      hsv: this.color.hsv
    };
  }

  componentDidMount() {
    // Create an iroStyleSheet for this colorWheel's CSS overrides
    this.stylesheet = new iroStyleSheet();
    this.el = this.base;
    this.emit("mount", this);
  }

  componentWillUnmount() {

  }

  /**
    * @desc update the selected color
    * @param {Object} hsv - new hsv value
    * @access protected
  */
  setHsv(hsv, changes) {
    this.color.hsv = hsv;
    this.setState({ hsv });

    var rgb = this.color.rgbString;
    var css = this.css;

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
        <IroWheel parent={this} hsv={state.hsv} x={0} y={0} radius={100} rMax={100} onInput={handleInput} {...props}/>
        <IroSlider parent={this} hsv={state.hsv} x={0} y={0} onInput={handleInput} {...props}/>
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