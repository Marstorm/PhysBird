import { _decorator, Component, Node, EventTouch, find, math } from 'cc';
import { CASVariable } from './Variable';
import { CASEquation } from './Equation';
import {CAS} from './CAS'
const { ccclass, property } = _decorator;

@ccclass('GravityEquation')
export class GravityEquation extends CASEquation {
    public experssion(): String {
        return `${this.g} * ${this.t}* ${this.t} /2 = ${this.y}`;
    }

    @property(CASVariable)
    g: CASVariable = null!;

    @property(CASVariable)
    t: CASVariable = null!;

    @property(CASVariable)
    y: CASVariable = null!;

    start(){
        super.start()
    }
}