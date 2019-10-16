import { h } from 'preact';
import { IroColor } from 'iro-core';

import { IroColorPickerWidget } from './colorPicker';
import { IroComponent } from './ui/component';
import { IroHandle }  from './ui/handle';
import { IroSlider } from './ui/slider';
import { IroWheel } from './ui/wheel';
import { usePlugins } from './util/usePlugins';

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
  version: VERSION,
});

