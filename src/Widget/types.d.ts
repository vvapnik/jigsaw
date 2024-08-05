import {ReactNode} from "react";

export interface PreWidget extends Function {
    prototype: WidgetInstance
}

export interface WidgetInstance {
    resolve(): Promise<ReactNode>
}