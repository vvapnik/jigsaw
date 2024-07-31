import {Service} from "./Service";
import {isService, isServiceExecutable} from "../consts/metadata";

describe('Service', () => {
    it('should assign metadata to empty class', () => {
        @Service()
        class Test {

        }

        expect(Reflect.getMetadata(isService, Test)).toBeTruthy()
    })
    it('should assign executable tag to service with exec method', () => {
        @Service()
        class TestExec {
            exec() {
                console.log(1)
            }
        }

        expect(Reflect.getMetadata(isServiceExecutable, TestExec)).toBeTruthy()
    })
})