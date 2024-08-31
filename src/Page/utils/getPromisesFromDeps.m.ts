import {Service} from "../../Service";
import {ServiceState} from "../types";

@Service()
class ServiceWithoutDeps {
    async exec() {
    }
}

export const ServiceWithoutDepsState: ServiceState = {
    uniqueName: 'ServiceWithoutDeps',
    params: [],
    mainClass: ServiceWithoutDeps,
    instance: new ServiceWithoutDeps(),
    executed: false,
    dependencies: [],
    executionPromise: new Promise(() => {
    })
}

@Service()
class ServiceWithoutDepsExecuted {
    async exec() {

    }
}

export const ServiceWithoutDepsExecutedState: ServiceState = {
    uniqueName: 'ServiceWithoutDeps',
    params: [],
    mainClass: ServiceWithoutDeps,
    instance: new ServiceWithoutDeps(),
    executed: true,
    executionPromise: new Promise(() => {
    }),
    dependencies: []
}

@Service()
class ServiceWithDeps {
    constructor(private _: ServiceWithoutDeps, private __: ServiceWithoutDepsExecuted) {
    }

    async exec() {

    }
}

export const ServiceWithDepsState: ServiceState = {
    uniqueName: 'ServiceWithDeps',
    params: [ServiceWithoutDeps],
    mainClass: ServiceWithDeps,
    executed: false,
    dependencies: [ServiceWithoutDepsState],
    instance: new ServiceWithDeps(ServiceWithoutDepsState.instance as ServiceWithoutDeps, ServiceWithoutDepsExecutedState.instance as ServiceWithoutDepsExecuted)
}
