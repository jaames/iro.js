import { ComponentType } from 'preact';
export declare function createWidget(WidgetComponent: ComponentType): {
    (parent: HTMLElement, props: any): any;
    prototype: any;
    __component: ComponentType<{}>;
};
