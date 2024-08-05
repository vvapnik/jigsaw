import {PreService} from "../Service/types";
import {PoolStatus} from "./ServicePool.c";

//TODO: check config
// @ts-ignore
import {InjectableMetadata, ServiceState} from "./types.d.ts";
import {getInjectableMetadata} from "./utils/metadata/getInjectableMetadata";
import {validateService} from "./utils/metaValidations";
import {matchInjections} from "./utils/matchInjections";

export class ServicePool {
    public status = PoolStatus.initializing
    protected services: ServiceState[]

    constructor(services: PreService[]) {
        services.forEach(service => this.initService(service))

    }

    initService(service: PreService) {
        validateService(service)
        const metadata = getInjectableMetadata(service)
        const dependencies = matchInjections(metadata, this)
        this.services.push({
            ...metadata,
            mainClass: service,
            executed: false,
            instance: service(),
            dependencies
        })
    }

    public async execServices() {


    }

    public getServiceByClass(target: PreService): ServiceState {
        const service = this.services.find(serv => serv.mainClass === target)
        if (!service) throw Error(`service ${target} is injected before initialization`)
        return service
    }
}
