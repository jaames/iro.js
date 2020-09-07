import { h as _h } from 'preact';
import { IroColor } from '@irojs/iro-core';
import { IroComponentBase } from './ComponentBase';
import { IroHandle } from './Handle';
import { IroSlider } from './Slider';
import { IroBox } from './Box';
import { IroWheel } from './Wheel';
import { IroColorPicker } from './ColorPicker';
declare namespace iro {
    const version = "5.2.3";
    type Color = IroColor;
    const Color: typeof IroColor;
    type ColorPicker = IroColorPicker;
    const ColorPicker: {
        (parent: string | HTMLElement, props: any): any;
        prototype: any;
        __component: import("preact").ComponentType<{}>;
    };
    namespace ui {
        const h: typeof _h;
        const ComponentBase: typeof IroComponentBase;
        const Handle: typeof IroHandle;
        const Slider: typeof IroSlider;
        const Wheel: typeof IroWheel;
        const Box: typeof IroBox;
    }
}
export default iro;
