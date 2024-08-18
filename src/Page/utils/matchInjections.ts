import {InjectableMetadata, ServiceState} from "../types";
import {ServicePool} from "../ServicePool";

export function matchInjections({params}: InjectableMetadata, servicePool: ServicePool): ServiceState[] {
    if (!params || !params.length) return []
    return params.map(dep => servicePool.getServiceByClass(dep))
}
