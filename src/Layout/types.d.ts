import {ReactNode} from "react";

export type Layout = (widgets: Record<string, ReactNode>) => Promise<ReactNode>