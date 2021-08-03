import { _decorator, Component, Node, Label, Game, find, EventTouch, CCFloat, Sprite } from 'cc';
import {CAS} from './CAS'
const { ccclass, property } = _decorator;

@ccclass('CASVariable')
export class CASVariable extends Component {
    cas: CAS =null!;

    @property
    value: number = 0;

    @property
    public constant: boolean = true;

    @property
    public value_name: string = "";


    // _value: number = 0;
    

    public set_value(v: number){
        // if(!this.constant)
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
        if(this.constant==false)
            this.value = null!;
        this.update_value();
        this.node.on(Node.EventType.TOUCH_START, this.onValueClick, this);
    }
    onLoad(){
        if(this.label == null){
            var node = new Node()
            this.label = node.addComponent(Label)
            this.label.fontSize = 20
        }
        this.update_value()
    }

    public experssion(){
        if(this.value)
            return `${this.value.toFixed(1)}`
        return this.value_name;
    }

    public is_known(): boolean{
        if(this.constant)
            return true;
        if(this.value)
            return true;
        else
            return false;
    }


    public getvalue():number {
        return this.value;
    }

    public toString = () : string => {
        return this.experssion();
    }

    public update_value(){
        // this.label.string = `${this.value_name} = ${this.value.toPrecision(2)}`;
        if(this.label)
            this.label.string = this.experssion();
    }

    onValueClick(event: EventTouch){
        console.log('onValueClick',this);
        if(this.cas.active_var){
            if(this.constant==false){
                if(this.cas.active_var==this)
                {
                    this.value=null!;
                }else
                {
                    this.cas.connect(this.cas.active_var,this)
                }
            }
            const sprite=this.cas.active_var.getComponent(Sprite)
            if(sprite){
                sprite.enabled=false;
            }
            this.cas.active_var = null!;
        }
        else{
            this.cas.active_var = this;
            const sprite=this.getComponent(Sprite);
            if(sprite){
                sprite.enabled=true
            }
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
