import { h } from 'preact';
import { IroColor } from 'iro-core';

import { IroColorPickerWidget } from './colorPicker';
import { IroComponent } from './ui/component';
import { IroHandle }  from './ui/handle';
import { IroSlider } from './ui/slider';
import { IroWheel } from './ui/wheel';
import { usePlugins } from './util/usePlugins';

declare const VERSION: string;