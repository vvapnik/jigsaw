import {PreService} from "../../Service/types";
import {injectableUniqueName, paramTypes} from "../../consts/metadata";
import {InjectableMetadata} from "../types";
import {PreWidget} from "../../Widget/types";

export function getInjectableMetadata(target: PreService | PreWidget): InjectableMetadata {
    const uniqueName = Reflect.getMetadata(injectableUniqueName, target);
    const params = Reflect.getMetadata(paramTypes, target)
    return {uniqueName, params}
}