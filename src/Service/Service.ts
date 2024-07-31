import "reflect-metadata";
import {injectableUniqueName, isService, isServiceExecutable} from "../consts/metadata";
import {getUniqueName} from "../utils/getUniqueName";

export function Service(uniqueName?: string) {
    return function (target: Function) {
        Reflect.defineMetadata(injectableUniqueName, getUniqueName(target, uniqueName), target)
        Reflect.defineMetadata(isService, true, target)
        if (typeof target.prototype.exec === 'function') {
            Reflect.defineMetadata(isServiceExecutable, true, target)
        }
    }

}