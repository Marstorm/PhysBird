
import { _decorator, Component, Node, EventTouch } from 'cc';
import { CASVariable } from './Variable';
const { ccclass, property } = _decorator;

@ccclass('Equation')
export class Equation extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
        this.node.on(Node.EventType.TOUCH_START, this.onValueChanged, this);
    }

    onCalculation(event: EventTouch){
        console.log('onCalculation', event);
        this.calculate_result();
    }

    onValueChanged(event: EventTouch){
        console.log('onValueChanged', event, this);
        // TODO: 判断当前有几个未知量
    }

    calculate_result(){
        const variables = this.getComponentsInChildren(CASVariable)!;
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
