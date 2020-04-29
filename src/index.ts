import { h as _h } from 'preact';
import { IroColor } from '@irojs/iro-core';
import { IroComponentBase } from './ComponentBase';
import { IroHandle } from './Handle';
import { IroSlider } from './Slider';
import { IroBox } from './Box';
import { IroWheel } from './Wheel';
import { IroColorPicker, IroColorPickerWidget } from './ColorPicker';

namespace iro {
  export const version = VERSION; // replaced by @rollup/plugin-replace; see rollup.config.js

  export type Color = IroColor;
  export const Color = IroColor;
  export type ColorPicker = IroColorPicker;
  export const ColorPicker = IroColorPickerWidget;

  export namespace ui {
    export const h = _h;
    export const ComponentBase = IroComponentBase;
    export const Handle = IroHandle;
    export const Slider = IroSlider;
    export const Wheel = IroWheel;
    export const Box = IroBox;
  }
}

export default iro;
