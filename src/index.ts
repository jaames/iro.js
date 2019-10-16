declare const VERSION: string;

import { h } from 'preact';

import { IroColorPickerWidget } from './colorPicker';
import { IroColor } from './color';

import { IroComponent } from './ui/component';
import { IroHandle }  from './ui/handle';
import { IroSlider } from './ui/slider';
import { IroWheel } from './ui/wheel';
import { usePlugins } from './util/usePlugins';
import { resolveUrl, createArcPath } from './util/svg';
import { parseUnit, parseHexInt, intToHex } from './util/colorUtils';

export default usePlugins({
  Color: IroColor,
  ColorPicker: IroColorPickerWidget,
  ui: {
    h,
    Component: IroComponent,
    Handle: IroHandle,
    Slider: IroSlider,
    Wheel: IroWheel,
  },
  util: {
    resolveUrl, 
    createArcPath,
    parseUnit,
    parseHexInt,
    intToHex
  },
  version: VERSION,
});

