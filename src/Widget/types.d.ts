import {ReactNode} from "react";

interface Widgetable extends Function {
    prototype: ProtoWidget
}

interface ProtoWidget {
    exec(): ReactNode
}