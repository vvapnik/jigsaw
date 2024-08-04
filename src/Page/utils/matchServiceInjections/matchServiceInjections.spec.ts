import {Service} from "../../../Service";
import {matchServiceInjections} from "./index";

describe('utils/matchServiceInjections', () => {
    it('should return empty array for services without dependencies', () => {
        @Service()
        class ServiceWithoutDeps {

        }

        const pool = []
        expect(matchServiceInjections(ServiceWithoutDeps, pool).length).toBe(0)
    })

    it('should return array of dependencies from pool in correct order', () => {
        @Service()
        class ServiceWithoutDeps1 {

        }

        @Service()
        class ServiceWithoutDeps2 {

        }

        @Service()
        class ServiceWithDeps {
            constructor(private service1: ServiceWithoutDeps2,
                        private service2: ServiceWithoutDeps1) {
            }
        }

        const pool = [new ServiceWithoutDeps1(), new ServiceWithoutDeps2()]
        const matched = matchServiceInjections(ServiceWithDeps, pool)
        expect(matched[0] === pool[1]).toBeTruthy()

    })

    it('should throw error if service has unresolved deps', () => {
        @Service()
        class ServiceWithoutDeps {

        }

        @Service()
        class ServiceWithDeps {
            constructor(private service1: ServiceWithoutDeps) {
            }
        }
        const pool = []
        expect(()=>matchServiceInjections(ServiceWithDeps, pool)).toThrowError(`service for class ServiceWithoutDeps {
        } is injected before initialization`)
    })
})