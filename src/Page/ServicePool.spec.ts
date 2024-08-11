import {Service} from "../Service";
import {ServicePool} from "./ServicePool";
import {EmptyService} from "../Service/EmptyService";
import {wait} from "../utils/wait";

describe('Page/ServicePool', () => {
    it('should find a service by class', async () => {
        const handler = jest.fn()

        @Service()
        class SimpleService {
            async exec() {
                handler()
            }
        }

        const services = new ServicePool([SimpleService])

        const simpleInstance = services.getServiceByClass(SimpleService)
        await simpleInstance.instance.exec()
        expect(handler.mock.calls.length).toBe(1)
        expect(simpleInstance.mainClass === SimpleService).toBeTruthy()
    })
    it('should initiate services in correct order', () => {
        const results = []

        @Service()
        class Service1 extends EmptyService {
            constructor() {
                super()
                results.push('1')
            }
        }

        @Service()
        class Service2 extends EmptyService {
            constructor(_: Service1) {
                super();
                results.push('2')
            }

        }

        @Service()
        class Service3 extends EmptyService {
            constructor(_: Service1, __: Service2) {
                super();
                results.push('3')
            }
        }

        new ServicePool([Service1, Service2, Service3])
        expect(results.join('')).toBe('123')
    })

    it('should throw an error if services initialise in wrong order', () => {
        const results = []

        @Service()
        class Service1 extends EmptyService {
            constructor() {
                super()
                results.push('1')
            }
        }

        @Service()
        class Service2 extends EmptyService {
            constructor(_: Service1) {
                super();
                results.push('2')
            }

        }

        @Service()
        class Service3 extends EmptyService {
            constructor(_: Service1, __: Service2) {
                super();
                results.push('3')
            }
        }

        expect(() => new ServicePool([Service2, Service3, Service1])).toThrow()
    })
    it('should execute services in correct order', async () => {
        const results = []

        @Service()
        class Service1 {
            async exec() {
                await wait(300)
                results.push('1')
            }
        }

        @Service()
        class Service2 {
            constructor(_: Service1) {
            }

            async exec() {
                await wait(200)
                results.push('2')
            }
        }

        @Service()
        class Service3 {
            constructor(_: Service1, __: Service2) {
            }

            async exec() {
                await wait(100)
                results.push('3')
            }
        }

        const services = new ServicePool([Service1, Service2, Service3])
        await services.executeServices()
        expect(results.join('')).toBe('123')
    })
})