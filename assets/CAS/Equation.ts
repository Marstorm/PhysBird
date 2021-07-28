
import { _decorator, Component, Node, EventTouch, find, math } from 'cc';
import { CASVariable } from './Variable';
import {CAS} from './CAS'
const { ccclass, property } = _decorator;

// @ccclass('Equation')
export abstract class CASEquation extends Component {
    private CASRoot     : CAS = null!
    start () {
        // [3]
        let root = find('Canvas')!;
        this.CASRoot = root.getComponentInChildren(CAS)!;
        // this.node.on(Node.EventType.TOUCH_START, this.onValueChanged, this);
    }

    onCalculation(event: EventTouch){
        console.log('onCalculation', event);
        this.calculate_result();
    }

    onValueChanged(event: EventTouch){
        
        console.log('onValueChanged', event, this);
        return this.variableSet.length;
        // TODO: 判断当前有几个未知量
    }

    public abstract  experssion(): String;


    calculate_result(){
        //const variables = this.getComponentsInChildren(CASVariable)!;
        let CASVarMap = this.CASRoot.named_map;

        for(let i = 0; i < this.variableSet.length; i++){
            let varName = this.variableSet[i];
            if(varName != this.variableToGet){
                let targetVar = CASVarMap.get(varName);
                this.variableMap.set(varName, targetVar?.value);
            }
        }
        // TODO: 完成计算逻辑
        return null;
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
