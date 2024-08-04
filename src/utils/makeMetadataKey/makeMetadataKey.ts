const libPrefix = 'jigsaw'

export function makeMetadataKey(param: string, context?: string) {
    return context ? `${libPrefix}:${context}:${param}` : `${libPrefix}:${param}`
}