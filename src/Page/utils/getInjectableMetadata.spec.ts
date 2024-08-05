import {Service} from "../../Service";
import {getInjectableMetadata} from "./getInjectableMetadata";

describe('getInjectableMetadata', () => {
    it('should get metadata from injectable class', () => {
        @Service()
        class ChildService {
            async exec() {

            }
        }

        @Service()
        class InjectableService {
            constructor(private service1: ChildService) {
            }

            async exec() {

            }
        }

        const metadata = getInjectableMetadata(InjectableService)
        expect(metadata.uniqueName === InjectableService.name)
        expect(metadata.params[0] === ChildService)
    })
})