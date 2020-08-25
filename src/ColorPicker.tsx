import { h, Component } from 'preact';
import { IroColor, IroColorValue, IroColorPickerOptions, iroColorPickerOptionDefaults } from '@irojs/iro-core';

import { IroInputType } from './ComponentBase';
import { IroWheel } from './Wheel';
import { IroSlider } from './Slider';
import { createWidget } from './createWidget';

interface ColorPickerEvents {
  [key: string]: Function[];
}

interface ColorDeferredEvents {
  [key: string]: Array<any>;
}

interface ColorPickerEventGuards {
  [key: string]: boolean;
}

interface ColorPickerLayoutDefinition {
  component: any;
  options?: any;
}

type ColorPickerLayoutShorthand = 'default';

export interface ColorPickerProps extends IroColorPickerOptions {
  display?: string;
  id?: null;
  layout?: ColorPickerLayoutDefinition[] | ColorPickerLayoutShorthand;
  colors?: IroColorValue[];
  transparency?: boolean;
  margin: number;
}

export interface ColorPickerState extends ColorPickerProps {
  layout: ColorPickerLayoutDefinition[] | ColorPickerLayoutShorthand;
  color: IroColor;
  colors: IroColor[];
}

export class IroColorPicker extends Component<ColorPickerProps, ColorPickerState> {

  public static defaultProps: ColorPickerProps = {
    ...iroColorPickerOptionDefaults,
    colors: [],
    display: 'block',
    id: null,
    layout: 'default',
    margin: null
  }

  public el: HTMLElement;
  public id: string;
  public colors: IroColor[] = [];
  public color: IroColor;
  public inputActive: boolean = false;

  private events: ColorPickerEvents = {};
  private activeEvents: ColorPickerEventGuards = {};
  private deferredEvents: ColorDeferredEvents = {};

  constructor(props: ColorPickerProps) {
    super(props);
    this.id = props.id;
    const colors = props.colors.length > 0 ? props.colors : [props.color];
    colors.forEach(colorValue => this.addColor(colorValue));
    this.setActiveColor(0);
    // Pass all the props into the component's state,
    // Except we want to add the color object and make sure that refs aren't passed down to children
    this.state = {
      ...props,
      color: this.color,
      colors: this.colors,
      layout: props.layout
    };
  }

  // Plubic multicolor API

   /**
   * @desc Add a color to the color picker
   * @param color new color to add
   * @param index optional color index
   */
  public addColor(color: IroColorValue, index: number = this.colors.length) {
    // Create a new iro.Color
    // Also bind it to onColorChange, so whenever the color changes it updates the color picker
    const newColor = new IroColor(color, this.onColorChange.bind(this));
    // Insert color @ the given index
    this.colors.splice(index, 0, newColor);
    // Reindex colors
    this.colors.forEach((color, index) => color.index = index);
    // Update picker state if necessary
    if (this.state) {
      this.setState({ colors: this.colors });
    }
    // Fire color init event
    this.deferredEmit('color:init', newColor);
  }

  /**
   * @desc Remove a color from the color picker
   * @param index color index
   */
  public removeColor(index: number) {
    const color = this.colors.splice(index, 1)[0];
    // Destroy the color object -- this unbinds it from the color picker
    color.unbind();
    // Reindex colors
    this.colors.forEach((color, index) => color.index = index);
    // Update picker state if necessary
    if (this.state) {
      this.setState({ colors: this.colors });
    }
    // If the active color was removed, default active color to 0
    if (color.index === this.color.index) {
      this.setActiveColor(0);
    }
    // Fire color remove event
    this.emit('color:remove', color);
  }

  /**
   * @desc Set the currently active color
   * @param index color index
   */
  public setActiveColor(index: number) {
    this.color = this.colors[index];
    if (this.state) {
      this.setState({ color: this.color });
    }
    // Fire color switch event
    this.emit('color:setActive', this.color);
  }

  /**
   * @desc Replace all of the current colorPicker colors
   * @param newColorValues list of new colors to add
   */
  public setColors(newColorValues: IroColorValue[]) {
    // Unbind color events
    this.colors.forEach(color => color.unbind());
    // Destroy old colors
    this.colors = [];
    // Add new colors
    newColorValues.forEach(colorValue => this.addColor(colorValue));
    // Reset active color
    this.setActiveColor(0);
    this.emit('color:setAll', this.colors);
  }

  // Public ColorPicker events API

  /**
   * @desc Set a callback function for an event
   * @param eventList event(s) to listen to
   * @param callback - Function called when the event is fired
   */
  public on(eventList: string[] | string, callback: Function) {
    const events = this.events;
    // eventList can be an eventType string or an array of eventType strings
    (!Array.isArray(eventList) ? [eventList] : eventList).forEach(eventType => {
      // Add event callback
      (events[eventType] || (events[eventType] = [])).push(callback);
      // Call deferred events
      // These are events that can be stored until a listener for them is added
      if (this.deferredEvents[eventType]) {
        // Deffered events store an array of arguments from when the event was called
        this.deferredEvents[eventType].forEach(args => {
          callback.apply(null, args); 
        });
        // Clear deferred events
        this.deferredEvents[eventType] = [];
      }
    });
  }

  /**
   * @desc Remove a callback function for an event added with on()
   * @param eventList - event(s) to listen to
   * @param callback - original callback function to remove
   */
  public off(eventList: string[] | string, callback: Function) {
    (!Array.isArray(eventList) ? [eventList] : eventList).forEach(eventType => {
      const callbackList = this.events[eventType];
      // this.emitHook('event:off', eventType, callback);
      if (callbackList) callbackList.splice(callbackList.indexOf(callback), 1);
    });
  }

  /**
   * @desc Emit an event
   * @param eventType event to emit
   */
  public emit(eventType: string, ...args: any) {
    const activeEvents = this.activeEvents;
    const isEventActive = activeEvents.hasOwnProperty(eventType) ? activeEvents[eventType] : false;
    // Prevent event callbacks from firing if the event is already active
    // This stops infinite loops if something in an event callback causes the same event to be fired again
    // (e.g. setting the color inside a color:change callback)
    if (!isEventActive) {
      activeEvents[eventType] = true;
      const callbackList = this.events[eventType] || [];
      callbackList.forEach(fn => fn.apply(this, args));
      activeEvents[eventType] = false;
    }
  }

  /**
   * @desc Emit an event now, or save it for when the relevent event listener is added
   * @param eventType - The name of the event to emit
   */
  public deferredEmit(eventType: string, ...args: any) {
    const deferredEvents = this.deferredEvents;
    this.emit(eventType, ...args);
    (deferredEvents[eventType] || (deferredEvents[eventType] = [])).push(args);
  }

  // Public utility methods

  public setOptions(newOptions: Partial<ColorPickerState>) {
    this.setState({ ...this.state, ...newOptions });
  }

  /**
   * @desc Resize the color picker
   * @param width - new width
   */
  public resize(width: number) {
    this.setOptions({ width })
  }

  /**
   * @desc Reset the color picker to the initial color provided in the color picker options
   */
  public reset() {
    this.colors.forEach(color => color.reset());
    this.setState({ colors: this.colors });
  }

  /**
   * @desc Called by the createWidget wrapper when the element is mounted into the page
   * @param container - the container element for this ColorPicker instance
   */
  public onMount(container: HTMLElement) {
    this.el = container;
    this.deferredEmit('mount', this);
  }

  // Internal methods

  /**
   * @desc React to a color update
   * @param color - current color
   * @param changes - shows which h,s,v,a color channels changed
   */
  private onColorChange(color: IroColor, changes: any) {
    this.setState({ color: this.color });
    if (this.inputActive) {
      this.inputActive = false;
      this.emit('input:change', color, changes);
    } 
    this.emit('color:change', color, changes);
  }

  /**
   * @desc Handle input from a UI control element
   * @param type - event type
   */
  private emitInputEvent(type: IroInputType) {
    if (type === IroInputType.Start) {
      this.emit('input:start', this.color);
    }
    else if (type === IroInputType.Move) {
      this.emit('input:move', this.color);
    }
    else if (type === IroInputType.End) {
      this.emit('input:end', this.color);
    }
  }

  public render(props, state) {
    let layout = state.layout;

    // use layout shorthands
    if (!Array.isArray(layout)) {
      switch (layout) {
        // TODO: implement some?
        default:
          layout = [
            { component: IroWheel },
            { component: IroSlider },
          ];
      }
      // add transparency slider to the layout
      if (state.transparency) {
        layout.push({
          component: IroSlider,
          options: {
            sliderType: 'alpha'
          }
        })
      }
    }

    return (
      <div 
        class="IroColorPicker"
        id={ state.id }
        style={{
          display: state.display
        }}
      >
        { layout.map(({component: UiComponent, options: options }, componentIndex: number) => (
          <UiComponent
            {...state}
            {...options}
            ref={ undefined }
            onInput={ this.emitInputEvent.bind(this) }
            parent={ this }
            index={ componentIndex }
          />
        ))}
      </div>
    )
  }
}

export const IroColorPickerWidget = createWidget(IroColorPicker);
