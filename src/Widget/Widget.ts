import "reflect-metadata";
import {injectableUniqueName, isWidget} from "../consts/metadata";
import {getUniqueName} from "../utils/getUniqueName";
import {Widgetable} from "./types";




export function Widget(uniqueName?: string) {
    return function (target: Widgetable) {
        Reflect.defineMetadata(injectableUniqueName, getUniqueName(target, uniqueName), target)
        Reflect.defineMetadata(isWidget, true, target)
    }
}