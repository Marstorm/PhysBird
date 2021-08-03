
import { _decorator, Component, Node, EventTouch } from 'cc';
import { CASEquation } from './Equation';
import { CASVariable } from './Variable';
// import {nerdamer} from './Nerdamer'

const { ccclass, property } = _decorator;

@ccclass('CAS')
class CAS extends Component{

    public nodes_map: Map<CASVariable, CASVariable> = new Map<CASVariable, CASVariable>();
    public named_map: Map<string, CASVariable> = new Map<string, CASVariable>();
    public active_var: CASVariable=null!;
    public dynamic=true;

    public register_variable(name: string, variable: CASVariable){
        // find an suitable name
        let named_map = this.named_map;
        if(name=='' || named_map.size==0){
            name = 'a';
        }
        while(this.named_map.has(name)){
            name = String.fromCharCode(name?.charCodeAt(0)+1);
        }
        named_map.set(name, variable);
        return name;
    }

    public get_equations(){
        let expression_list = new Array<String>()
        for(let variable of this.getComponentsInChildren(CASVariable)){
            if(variable.constant || variable.value==null)
                continue;
            expression_list.push(variable.experssion())
        }
        for(var equation of this.getComponentsInChildren(CASEquation)){
            expression_list.push(equation.experssion())
        }

        for(var [a,b] of this.nodes_map){

            expression_list.push(`${a} = ${b}`)
        }
        // 现在返回 ["A", "B", "b = 5.0", "v", "t", "v * t = 10", "4 = t"]
        // 返回 ["v * t = 10", "4 = t"] 时能求解！
        console.log(expression_list)
        return expression_list;
    }

    public connect(a:CASVariable, b: CASVariable){
        // a to b
        //this.nodes_map.set(a,b);
        if(a.is_known())
            b.set_value(a.value)
    }
    onSolveDynamic(event: TouchEvent){
        console.log(this.solve_dynamic('v'))
    }

    start(){
        cc.cas = this;
    }

    solve_dynamic(target: String){
        var es = this.get_equations()
        console.log(es);
        for ( var ans of nerdamer.solveEquations(es)){
            if(ans[0]==target){
                return ans[1]       
            }
        }
        return null;
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
