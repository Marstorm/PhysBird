import { _decorator, Component, Node, EventTouch, find, math } from 'cc';
import { CASVariable } from './Variable';
import { CASEquation } from './Equation';
import {CAS} from './CAS'
const { ccclass, property } = _decorator;

@ccclass('DistanceEquation')
export class DistanceEquation extends CASEquation {
    public experssion(): String {
        return `${this.v} * ${this.t} = ${this.x}`;
    }

    @property(CASVariable)
    v: CASVariable = null!;

    @property(CASVariable)
    t: CASVariable = null!;

    @property(CASVariable)
    x: CASVariable = null!;

    start(){
        super.start()
        this.x.constant = true;
        this.x.value = 10;
    }


}