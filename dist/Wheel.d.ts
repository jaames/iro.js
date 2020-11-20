import { h } from 'preact';
import { IroColor } from '@irojs/iro-core';
import { IroComponentProps } from './ComponentTypes';
interface IroWheelProps extends IroComponentProps {
    colors: IroColor[];
}
export declare function IroWheel(props: IroWheelProps): h.JSX.Element;
export {};
