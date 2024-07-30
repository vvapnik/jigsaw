import {makeMetadataKey} from "./makeMetadataKey";

export const propTypes = 'design:paramtypes'
export const isService = makeMetadataKey('isService', 'service')
export const isServiceExecutable = makeMetadataKey('isExecutable', 'service')

export const injectableUniqueName = makeMetadataKey('uniqueName')