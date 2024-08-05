export interface ServiceInstance {
    exec: () => Promise<void>
}

export interface PreService extends Function {
    prototype: ServiceInstance
}