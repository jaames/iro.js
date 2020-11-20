import { IroColor, IroColorPickerOptions } from '@irojs/iro-core';
import { IroColorPicker } from './ColorPicker'

export const enum IroInputType {
  Start,
  Move,
  End
};

export interface IroComponentProps extends IroColorPickerOptions {
  parent: IroColorPicker;
  index: number; // component index
  id?: string; // optional component id
  color: IroColor;
  colors: IroColor[];
  activeIndex?: number; // active color index (for optional overriding!)
  onInput: (type: IroInputType, id: string) => void;
}