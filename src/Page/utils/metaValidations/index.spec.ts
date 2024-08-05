import {validateService, validateWidget} from "./index";
import {Service} from "../../../Service";
import {Widget} from "../../../Widget/Widget";

describe('Page/utils/metaValidations', () => {
    it('validateService should reject not a service', () => {
        class NotAService {
            async exec(){

            }
        }

        expect(() => validateService(NotAService)).toThrow('NotAService is not a service')
    })
    it('validateService should pass with proper service', () => {
        @Service()
        class RealService {
            async exec(){

            }
        }

        expect(validateService(RealService)).toBeTruthy()
    })
    it('should validate widget', () => {
        @Widget()
        class RealWidget {
            async resolve() {
                return ''
            }
        }

        expect(validateWidget(RealWidget)).toBeTruthy()
    })
    it('should throw a error for invalid widget', () => {

        class FakeWidget {
            async resolve() {
                return ''
            }
        }

        expect(() => validateWidget(FakeWidget)).toThrow()
    })
})