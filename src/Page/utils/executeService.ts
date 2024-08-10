import {ServiceState} from "../types";
import {getPromisesFromDeps} from "./getPromisesFromDeps";

export function executeService(service: ServiceState) {
    const preConditions = getPromisesFromDeps(service)
    let currentPromise
    if (preConditions.length) {
        currentPromise = Promise.all(preConditions).then(service.instance.exec)
    } else {
        currentPromise = service.instance.exec()
    }
    service.executionPromise = currentPromise.then(() => {
        service.executed = true
    })
    return service.executionPromise
}