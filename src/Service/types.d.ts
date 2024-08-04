export interface ServiceInstance {

}

export interface PreService extends Function {
    prototype: ServiceInstance
}