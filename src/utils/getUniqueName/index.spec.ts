import {getUniqueName} from "./index";
import {explicitClassName} from "./index.m";

describe('utils/getUniqueName', () => {
    it('should return explicit className', () => {
            class Test {
            }

            expect(getUniqueName(Test, explicitClassName)).toBe(explicitClassName)
        }
    )

    it('should return class name if explicit name is undefined', ()=>{
        class Test {

        }

        expect(getUniqueName(Test)).toBe('Test')
    })
})