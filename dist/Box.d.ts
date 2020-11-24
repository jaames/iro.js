import { h } from 'preact';
import { IroColor } from '@irojs/iro-core';
import { IroComponentProps } from './ComponentTypes';
interface IroBoxProps extends IroComponentProps {
    colors: IroColor[];
}
export declare function IroBox(props: IroBoxProps): h.JSX.Element;
export {};
