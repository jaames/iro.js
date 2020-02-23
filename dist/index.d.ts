import { h } from 'preact';
import { IroColor } from '@irojs/iro-core';
import { IroComponentBase } from './ComponentBase';
import { IroHandle } from './Handle';
import { IroSlider } from './Slider';
import { IroBox } from './Box';
import { IroWheel } from './Wheel';
declare const _default: {
    Color: typeof IroColor;
    ColorPicker: {
        (parent: HTMLElement, props: any): any;
        prototype: any;
        __component: import("preact").ComponentType<{}>;
    };
    ui: {
        h: typeof h;
        ComponentBase: typeof IroComponentBase;
        Handle: typeof IroHandle;
        Slider: typeof IroSlider;
        Wheel: typeof IroWheel;
        Box: typeof IroBox;
    };
    version: string;
};
export default _default;
