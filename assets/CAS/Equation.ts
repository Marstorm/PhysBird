
import { _decorator, Component, Node, EventTouch, find, math } from 'cc';
import { CASVariable } from './Variable';
import {CAS} from './CAS'

const { ccclass, property } = _decorator;

function removeItemOnce(arr:Array, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
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
        // return this.variableSet.length;
        // TODO: 判断当前有几个未知量
    }

    public abstract  experssion(): String;


    calculate_result(){
        //const variables = this.getComponentsInChildren(CASVariable)!;
        var var_list=this.variables_list();
        for (const v of var_list) {
            if(v.is_known())
            {
                removeItemOnce(var_list,v);
            }
        }
        // 不知道什么问题。有时候unknown的变量没删干净
        for (const v of var_list) {
            if(v.is_known())
            {
                removeItemOnce(var_list,v);
            }
        }
        if(var_list.length==1){
            const equations = [this.experssion(),var_list[0].experssion()];
            console.log(equations);
            var v = var_list[0];
            var res = nerdamer.solveEquations(this.experssion(),v.experssion()).map(
                solution => nerdamer(solution).evaluate().toDecimal());
            
            console.log(res)
            v.value=(parseFloat(res[0])) 
            v.update_value()
        }
        // TODO: 完成计算逻辑
        return null;
    }

    public variables_list(){
        let variables=[];
        for(let variable of this.getComponentsInChildren(CASVariable)){
            if(variable.constant==false)
                variables.push(variable)
        }
        return variables;
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
