import "reflect-metadata";
import {isService, isServiceExecutable} from "../consts/metadata";

export function Service(target) {
    Reflect.defineMetadata(isService, true, target)
    if (target.exec === 'function') {
        Reflect.defineMetadata(isServiceExecutable, true, target)
    }
}