import {ReactNode} from "react";

interface PreWidget extends Function {
    prototype: ProtoWidget
}

interface ProtoWidget {
    exec(): ReactNode
}