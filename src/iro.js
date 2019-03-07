import { h } from 'preact';

import ColorPicker from './colorPicker';
import Color from './color';

import Component from 'ui/component';
import Handle from 'ui/handle';
import Slider from 'ui/slider';
import Wheel from 'ui/wheel';
import { usePlugins } from 'util/usePlugins';
import { resolveUrl, createArcPath } from 'util/svg';
import { parseUnit, parseHexInt, intToHex } from 'util/colorUtils';

export default usePlugins({
  Color,
  ColorPicker,
  ui: {
    h,
    Component,
    Handle,
    Slider,
    Wheel,
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
