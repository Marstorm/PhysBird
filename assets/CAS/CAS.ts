
import { _decorator, Component, Node, EventTouch } from 'cc';
import { Variable } from './Constant';
const { ccclass, property } = _decorator;

class CAS {

    public static nodes_map: Map<Variable, Variable> = new Map<Variable, Variable>();
    public static named_map: Map<string, Variable> = new Map<string, Variable>();
    public static active_var: Variable=null!;

    public static register_variable(name: string, variable: Variable){
        // find an suitable name
        let named_map = CAS.named_map;
        if(name=='' || named_map.size==0){
            name = 'A';
        }
        while(CAS.named_map.has(name)){
            let last_name = 'A';
            for (const [key, value] of named_map.entries()) {
                last_name=key;
            }
            name = String.fromCharCode(last_name?.charCodeAt(0)+1);
        }
        named_map.set(name, variable);

        // register click event
        if(!variable.constant){
            variable.node.on(Node.EventType.TOUCH_START,CAS.onValueClick);
        }
        return name;
    }

    public static onValueClick(event: EventTouch){
        let variable = event.target.getComponent(Variable);
        if(!variable)
        {return;}
        if(CAS.active_var){

            variable.value = CAS.active_var.value;
            variable.update_value();
            CAS.active_var = null!;
        }
        else{
            CAS.active_var = variable;
        }

    }


}


export {CAS};
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
