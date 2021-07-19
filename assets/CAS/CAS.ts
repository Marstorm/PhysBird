
import { _decorator, Component, Node, EventTouch } from 'cc';
import { CASVariable } from './Variable';
const { ccclass, property } = _decorator;

class CAS {

    public static nodes_map: Map<CASVariable, CASVariable> = new Map<CASVariable, CASVariable>();
    public static named_map: Map<string, CASVariable> = new Map<string, CASVariable>();
    public static active_var: CASVariable=null!;

    public static register_variable(name: string, variable: CASVariable){
        // find an suitable name
        let named_map = CAS.named_map;
        if(name=='' || named_map.size==0){
            name = 'A';
        }
        while(CAS.named_map.has(name)){
            name = String.fromCharCode(name?.charCodeAt(0)+1);
        }
        named_map.set(name, variable);

        // register click event
        if(!variable.constant){
            variable.node.on(Node.EventType.TOUCH_START,CAS.onValueClick);
        }
        return name;
    }

    public static onValueClick(event: EventTouch){
        let variable = event.target.getComponent(CASVariable);
        if(!variable)
        {return;}
        if(CAS.active_var){

            variable.set_value(CAS.active_var.value);
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
