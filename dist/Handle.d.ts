import { h } from 'preact';
interface IroHandleProps {
    isActive: boolean;
    index: number;
    x: number | string;
    y: number | string;
    r: number;
    url: string;
    props: any;
    fill?: string;
}
export declare function IroHandle(props: IroHandleProps): h.JSX.Element;
export declare namespace IroHandle {
    var defaultProps: {
        fill: string;
        x: number;
        y: number;
        r: number;
        url: any;
        props: {
            x: number;
            y: number;
        };
    };
}
export {};
