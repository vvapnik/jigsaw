import {ServiceState} from "../types";

export function getPromisesFromDeps(service: ServiceState): Promise<void>[] {
    return service.dependencies
        .filter(dep => dep.executed === false)
        .map(dep => dep.executionPromise)
}