import { IroColor, IroColorPickerOptions } from '@irojs/iro-core';
import { IroColorPicker } from './ColorPicker';

export const enum IroInputType {
  Start,
  Move,
  End
};

export interface IroComponentProps extends IroColorPickerOptions {
  parent: IroColorPicker;
  index: number; // component index
  color: IroColor;
  colors: IroColor[];
  activeIndex?: number; // active color index (for optional overriding!)
  onInput: (type: IroInputType) => void;
}