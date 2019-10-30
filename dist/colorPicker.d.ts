import { h, Component, ComponentType } from 'preact';
import { IroColor, IroColorValue, IroColorPickerOptions } from '@irojs/iro-core';
interface ColorPickerLayoutDefinition {
    component: ComponentType;
    options: any;
}
export interface ColorPickerProps extends IroColorPickerOptions {
    display?: string;
    id?: null;
    layout?: ColorPickerLayoutDefinition[];
}
export interface ColorPickerState extends ColorPickerProps {
    color: IroColor;
}
export declare class IroColorPicker extends Component<ColorPickerProps, ColorPickerState> {
    static pluginHooks: {};
    static defaultProps: {
        display: string;
        id: any;
        layout: any;
        width?: number;
        height?: number;
        handleRadius?: number;
        handleSvg?: string;
        handleProps?: any;
        color?: IroColorValue;
        borderColor?: string;
        borderWidth?: number;
        wheelLightness?: boolean;
        wheelAngle?: number;
        wheelDirection?: import("@irojs/iro-core").WheelDirection;
        layoutDirection?: import("@irojs/iro-core").LayoutDirection;
        sliderSize?: number;
        sliderMargin?: number;
        padding?: number;
    };
    el: HTMLElement;
    id: string;
    defaultColor: IroColorValue;
    color: IroColor;
    inputActive: boolean;
    private events;
    private deferredEvents;
    private colorUpdateActive;
    constructor(props: any);
    /**
     * @desc Set a callback function for an event
     * @param eventList event(s) to listen to
     * @param callback - Function called when the event is fired
     */
    on(eventList: string[] | string, callback: Function): void;
    /**
     * @desc Remove a callback function for an event added with on()
     * @param eventList - event(s) to listen to
     * @param callback - original callback function to remove
     */
    off(eventList: string[] | string, callback: Function): void;
    /**
     * @desc Emit an event
     * @param eventType event to emit
     */
    emit(eventType: string, ...args: any): void;
    /**
     * @desc Emit an event now, or save it for when the relevent event listener is added
     * @param eventType - The name of the event to emit
     */
    deferredEmit(eventType: string, ...args: any): void;
    updateOptions(newOptions: Partial<ColorPickerState>): void;
    /**
     * @desc Resize the color picker
     * @param width - new width
     */
    resize(width: number): void;
    /**
     * @desc Reset the color picker to the initial color provided in the color picker options
     */
    reset(): void;
    /**
     * @desc Set a callback function for a hook
     * @param hookType - The name of the hook to listen to
     * @param callback
     */
    static addHook(hookType: string, callback: Function): void;
    /**
     * @desc Emit a callback hook
     * @param hookType - The type of hook event to emit
     */
    private emitHook;
    /**
     * @desc Called by the createWidget wrapper when the element is mounted into the page
     * @param container - the container element for this ColorPicker instance
     */
    onMount(container: HTMLElement): void;
    /**
     * @desc React to a color update
     * @param color - current color
     * @param changes - shows which h,s,v,a color channels changed
     */
    private onColorChange;
    /**
     * @desc Handle input from a UI control element
     * @param type - event type
     */
    private handleInput;
    render(props: any, state: any): h.JSX.Element;
}
export declare const IroColorPickerWidget: {
    (parent: HTMLElement, props: any): any;
    prototype: any;
    __component: ComponentType<{}>;
};
export {};
