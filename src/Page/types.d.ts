import {PreService, ServiceInstance} from "../Service/types";

export type ServiceState = InjectableMetadata & {
    mainClass: PreService,
    instance: ServiceInstance,
    executed: boolean,
    executionPromise?: Promise<void>
    dependencies: ServiceState[]
}


export type InjectableMetadata = {
    uniqueName: string,
    params: PreService[]
}