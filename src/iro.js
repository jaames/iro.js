import { h } from 'preact';

import ColorPicker from './colorPicker';
import Color from './color';

import Component from 'ui/component';
import Handle from 'ui/handle';
import Slider from 'ui/slider';
import Wheel from 'ui/wheel';
import { usePlugins } from 'util/usePlugins';

export default usePlugins({
  Color,
  ColorPicker,
  ui: {
    h,
    Component,
    Handle,
    Slider,
    Wheel
  },
  version: VERSION,
});
