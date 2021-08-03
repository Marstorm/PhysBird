import { _decorator, Component, Node, EventTouch, find, math } from 'cc';
import { CASVariable } from './Variable';
import { CASEquation } from './Equation';
import {CAS} from './CAS'
const { ccclass, property } = _decorator;

@ccclass('CollideEquation')
export class CollideEquation extends CASEquation {
    public experssion(): String {
        return `${this.v1} * ${this.m1l} = ${this.v2} * (${this.m1r}+${this.m2})`;
    }

    @property(CASVariable)
    v1: CASVariable = null!;

    @property(CASVariable)
    v2: CASVariable = null!;

    @property(CASVariable)
    m1l: CASVariable = null!;

    @property(CASVariable)
    m1r: CASVariable = null!;

    @property(CASVariable)
    m2: CASVariable = null!;

    start(){
        super.start()
    }
}