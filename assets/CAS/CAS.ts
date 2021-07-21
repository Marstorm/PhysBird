
import { _decorator, Component, Node, EventTouch } from 'cc';
import { CASVariable } from './Variable';
const { ccclass, property } = _decorator;

@ccclass('CAS')
class CAS extends Component{

    public nodes_map: Map<CASVariable, CASVariable> = new Map<CASVariable, CASVariable>();
    public named_map: Map<string, CASVariable> = new Map<string, CASVariable>();
    public active_var: CASVariable=null!;

    public register_variable(name: string, variable: CASVariable){
        // find an suitable name
        let named_map = this.named_map;
        if(name=='' || named_map.size==0){
            name = 'A';
        }
        while(this.named_map.has(name)){
            name = String.fromCharCode(name?.charCodeAt(0)+1);
        }
        named_map.set(name, variable);
        return name;
    }
}
export {CAS}
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
