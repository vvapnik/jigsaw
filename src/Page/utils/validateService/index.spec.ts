import {validateService} from "./index";
import {Service} from "../../../Service";

describe('Page/utils/validateService', () => {
    it('should reject not a service', () => {
        class NotAService {
        }

        expect(() => validateService(NotAService)).toThrow('NotAService is not a service')
    })
    it('should pass with proper service', () => {
        @Service()
        class RealService {

        }

        expect(validateService(RealService)).toBeTruthy()
    })
})