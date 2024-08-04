import {makeMetadataKey} from "../utils/makeMetadataKey/makeMetadataKey";

export const propTypes = 'design:paramtypes'
export const isService = makeMetadataKey('isService', 'service')
export const isServiceExecutable = makeMetadataKey('isExecutable', 'service')

export const injectableUniqueName = makeMetadataKey('uniqueName')

export const isWidget = makeMetadataKey('isWidget', 'widget')

export const isLayout = makeMetadataKey('isLayout', 'layout')

export const paramTypes = 'design:paramtypes'