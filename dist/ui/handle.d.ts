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
declare function IroHandle(props: IroHandleProps): h.JSX.Element;
declare namespace IroHandle {
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
export default IroHandle;
