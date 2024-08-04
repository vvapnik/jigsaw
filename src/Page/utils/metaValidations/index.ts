import "reflect-metadata";
import {PreService} from "../../../Service/types";
import {isService, isWidget} from "../../../consts/metadata";
import {PreWidget} from "../../../Widget/types";

export function validateService(target: PreService): boolean {
    if (!Reflect.getMetadata(isService, target)) throw Error(`${target.name} is not a service`)
    return true
}

export function validateWidget(target: PreWidget): boolean {
    if (!Reflect.getMetadata(isWidget, target)) throw Error(`${target.name} is not a widget`)
    return true
}