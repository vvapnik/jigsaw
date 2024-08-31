import {PreService} from "../Service";
import {PoolStatus} from "./ServicePool.c";

import {ServiceState} from "./types";
import {getInjectableMetadata} from "./utils/getInjectableMetadata";
import {validateService} from "./utils/metaValidation";
import {matchInjections} from "./utils/matchInjections";
import {executeService} from "./utils/executeService";

export class ServicePool {
    public status = PoolStatus.initializing
    protected services: ServiceState[] = []

    constructor(services: PreService[]) {
        services.forEach(service => this.initService(service))
        this.status = PoolStatus.pending
    }

    initService(service: PreService) {
        validateService(service)
        const metadata = getInjectableMetadata(service)
        const dependencies = matchInjections(metadata, this)
        this.services.push({
            ...metadata,
            mainClass: service,
            executed: false,
            instance: new service(...dependencies.map(state => state.instance)),
            dependencies
        })
    }


    public getServiceByClass(target: PreService): ServiceState {
        const service = this.services.find(serv => serv.mainClass === target)
        if (!service) throw Error(`service ${target} is injected before initialization`)
        return service
    }

    public async executeServices(): Promise<void> {
        this.status = PoolStatus.executing
        const promises = []
        for (let service of this.services) {
            promises.push(executeService(service))
        }
        await Promise.all(promises)
        this.status = PoolStatus.ready
    }

}
