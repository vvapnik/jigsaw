import "reflect-metadata";
import {PreService} from "../../../Service/types";
import {isService} from "../../../consts/metadata";

export function validateService(target: PreService): boolean {
    if (!Reflect.getMetadata(isService, target)) throw Error(`${target.name} is not a service`)
    return true
}