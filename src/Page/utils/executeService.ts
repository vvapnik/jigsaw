import {ServiceState} from "../types";
import {getPromisesFromDeps} from "./getPromisesFromDeps";

export function executeService(service: ServiceState) {
    const preConditions = getPromisesFromDeps(service)
    const exec = service.instance.exec ?? (() => Promise.resolve())
    let currentPromise
    if (preConditions.length) {
        currentPromise = Promise.all(preConditions).then(exec)
    } else {
        currentPromise = exec()
    }
    service.executionPromise = currentPromise.then(() => {
        service.executed = true
    })
    return service.executionPromise
}