export function getUniqueName(target: Function, explicitName?: string) {
    if (explicitName) return explicitName
    return target.name
}