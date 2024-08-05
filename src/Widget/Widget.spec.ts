import "reflect-metadata";
import {Widget} from "./Widget";
import {isWidget} from "../consts/metadata";
import {WidgetInstance} from "./types";

describe('Widget', () => {
    it('should assign metadata', () => {
        @Widget()
        class TestWidget implements WidgetInstance{
            async resolve() {
                return ''
            }
        }

        expect(Reflect.getMetadata(isWidget, TestWidget)).toBeTruthy()
    })
})