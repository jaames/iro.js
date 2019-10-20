import { h } from 'preact';
interface IroHandleProps {
    x: number;
    y: number;
    r: number;
    url: string;
    origin: {
        x: number;
        y: number;
    };
}
export declare function IroHandle(props: IroHandleProps): h.JSX.Element;
export declare namespace IroHandle {
    var defaultProps: {
        x: number;
        y: number;
        r: number;
        url: any;
        origin: {
            x: number;
            y: number;
        };
    };
}
export {};
