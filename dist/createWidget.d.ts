import { ComponentType } from 'preact';
export interface Widget {
    base?: Element | Text;
    onMount: (root: Element) => void;
}
export declare function createWidget<C extends Widget, P>(WidgetComponent: ComponentType): {
    (parent: string | HTMLElement, props: Partial<P>): C;
    prototype: any;
    __component: ComponentType<{}>;
};
