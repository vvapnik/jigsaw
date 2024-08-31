import {ServiceState} from "../types";
import {getPromisesFromDeps} from "./getPromisesFromDeps";

export function executeService(service: ServiceState) {
    const preConditions = getPromisesFromDeps(service)
    let currentPromise
    if (preConditions.length) {
        currentPromise = Promise.all(preConditions).then(() => {
                if (typeof service.instance.exec === 'function') {
                    return service.instance.exec()
                } else {
                    return Promise.resolve()
                }
            }
        )
    } else {
        if (typeof service.instance.exec === 'function') {
            currentPromise = service.instance.exec()
        } else {
            currentPromise = Promise.resolve()
        }
    }
    service.executionPromise = currentPromise.then(() => {
        service.executed = true
    })
    return service.executionPromise
}