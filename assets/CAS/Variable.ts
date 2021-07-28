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
    value: number = null!;

    public set_value(v: number){
        if(!this.constant)
            this.value=v;
        this.update_value();
    }
    

    @property(Label)
    label: Label = null!;

    start () {
        // [3]
        
        let root = find('Canvas')!;
        this.cas = root.getComponentInChildren(CAS)!;

        this.value_name = this.cas.register_variable(this.value_name, this);
        this.update_value();
        
        this.node.on(Node.EventType.TOUCH_START, this.onValueClick, this);
    }
    onLoad(){
        if(this.label == null){
            this.label = this.node.getComponent(Label)!;
        }
        this.label.string = this.toString();
    }

    public experssion(){
        if(this.constant)
            return this.value.toPrecision(2).toString();
        if(this.value){
            return `${this.value_name} = ${this.value.toPrecision(2)}`;
        }
        else
            return this.value_name;
    }
    public getvalue():number|String {
        if(this.constant)
            return this.value;
        else
            return this.value_name;
    }

    public toString = () : string => {
        return `${this.getvalue()}`;
    }

    public update_value(){
        // this.label.string = `${this.value_name} = ${this.value.toPrecision(2)}`;
        this.label.string = this.experssion();
    }

    onValueClick(event: EventTouch){
        console.log('onValueClick',this);
        if(this.cas.active_var){
            this.cas.connect(this.cas.active_var,this)
            this.cas.active_var = null!;
        }
        else{
            this.cas.active_var = this;
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
