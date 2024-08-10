import {Service} from "../../Service";
import {ServiceState} from "../types";
import {executeService} from "./executeService";

describe('Page/utils/executeService', () => {
    it('should execute service without deps immediately', async () => {
        const executionHandler = jest.fn()

        @Service()
        class ServiceWithoutParams {
            async exec() {
                executionHandler()
            }
        }

        const state: ServiceState = {
            dependencies: [],
            executed: false,
            instance: new ServiceWithoutParams(),
            mainClass: ServiceWithoutParams,
            params: [], uniqueName: ""
        }
        await executeService(state)
        expect(executionHandler.mock.calls.length).toBe(1)
        expect(state.executed).toBeTruthy()
    })

    it('should wait for dependencies before starting execution', async () => {
        let callback

        @Service()
        class StoppedService {
            exec(): Promise<void> {
                return new Promise((resolve) => {
                    callback = resolve
                })
            }

        }

        const stoppedServiceState: ServiceState = {
            dependencies: [],
            executed: false,
            instance: new StoppedService(),
            mainClass: StoppedService,
            params: [],
            uniqueName: ""
        }
        const handler = jest.fn()

        @Service()
        class ParentService {
            constructor(_: StoppedService) {
            }

            async exec() {
                handler()
            }
        }

        const parentServiceState: ServiceState = {
            dependencies: [stoppedServiceState],
            executed: false,
            instance: new ParentService(stoppedServiceState.instance),
            mainClass: ParentService,
            params: [StoppedService],
            uniqueName: ""
        }

        void executeService(stoppedServiceState)
        void executeService(parentServiceState)

        expect(handler.mock.calls.length).toBe(0)
        if (callback) callback()
        await parentServiceState.executionPromise
        expect(handler.mock.calls.length).toBe(1)
    })
})