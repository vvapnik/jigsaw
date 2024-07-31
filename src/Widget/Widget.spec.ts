import "reflect-metadata";
import {Widget} from "./Widget";
import {isWidget} from "../consts/metadata";
import {ProtoWidget} from "./types";

describe('Widget', () => {
    it('should assign metadata', () => {
        @Widget()
        class TestWidget implements ProtoWidget{
            exec() {
                return ''
            }
        }

        expect(Reflect.getMetadata(isWidget, TestWidget)).toBeTruthy()
    })
})