import {ReactNode} from "react";

export interface PreWidget extends Function {
    new(...args): WidgetInstance

    prototype: WidgetInstance
}

export interface WidgetInstance {
    resolve(): Promise<ReactNode>
}