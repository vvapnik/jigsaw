import {getPromisesFromDeps} from "./getPromisesFromDeps";
import {ServiceWithDepsState, ServiceWithoutDepsState} from "./getPromisesFromDeps.m";

describe('Page/utils/GetPromisesFromDeps', () => {
    it('should return empty array for service without dependencies', () => {
        expect(getPromisesFromDeps(ServiceWithoutDepsState).length).toBe(0)
    })

    it('should return an array of promises for deps', () => {
        const promises = getPromisesFromDeps(ServiceWithDepsState)
        expect(promises.length).toBe(1)
        expect(promises[0] === ServiceWithoutDepsState.executionPromise).toBeTruthy()
    })
})