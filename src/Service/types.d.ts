export interface ServiceInstance extends Object {
    exec?: () => Promise<void>
}

export interface PreService extends Function {
    //TODO: proper types
    new(...args): ServiceInstance

    prototype: ServiceInstance
}