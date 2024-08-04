import "reflect-metadata";
import {paramTypes} from "../../../consts/metadata";
import {ServiceInstance} from "../../../Service/types";

export function matchServiceInjections(target, sourcePool): ServiceInstance[] {
    const deps = Reflect.getMetadata(paramTypes, target)
    if (!deps || !deps.length) return []
    return deps.map(dep => {
        const service = sourcePool.find(service => service instanceof dep)
        if (!service) throw Error(`service for ${dep} is injected before initialization`)
        return service
    })
}
