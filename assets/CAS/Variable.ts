import { _decorator, Component, Node, Label, Game, find, EventTouch } from 'cc';
import {CAS} from './CAS'
const { ccclass, property } = _decorator;


@ccclass('CASVariable')
export class CASVariable extends Component {
    cas: CAS =null!;

    @property
    public constant: boolean = true;

    @property
    public value_name: string = "";

    // _value: number = 0;
    @property
    value: number = 0;

    public set_value(v: number){
        if(!this.constant)
            this.value=v;
        this.update_value();
    }
    

    @property(Label)
    label: Label = null!;

    start () {
        // [3]
        if(this.label == null){
            this.label = this.node.getComponent(Label)!;
        }
        let root = find('Canvas')!;
        this.cas = root.getComponentInChildren(CAS)!;

        this.value_name = this.cas.register_variable(this.value_name, this);
        this.update_value();
        
        this.node.on(Node.EventType.TOUCH_START, this.onValueClick, this);
    }

    public update_value(){
        // this.label.string = `${this.value_name} = ${this.value.toPrecision(2)}`;
        this.label.string = `${this.value.toPrecision(2)}(${this.value_name})`;
    }

    onValueClick(event: EventTouch){
        console.log('onValueClick',this);
        let node = event.target.getComponent(CASVariable);
        if(node.cas.active_var){
            node.set_value(node.cas.active_var.value);
            node.cas.active_var = null!;
        }
        else{
            node.cas.active_var = node;
        }
    }
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
