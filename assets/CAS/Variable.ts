import { _decorator, Component, Node, Label, Game, find, CCInteger, CCFloat } from 'cc';
import { CAS } from './CAS';
const { ccclass, property } = _decorator;


@ccclass('CASVariable')
export class CASVariable extends Component {

    @property
    public constant: boolean = true;

    @property
    public value_name: string = "";

    // _value: number = 0;
    @property
    value: number = 0;

    public set_value(v: number){
        this.value=v;
        this.update_value();
    }
    
    // public get value(){
    //     return this._value;
    // }

    // @property(Label)
    label: Label = null!;

    onLoad () {
        // [3]
        this.label = this.node.getComponent(Label);
        this.value_name = CAS.register_variable(this.value_name, this);
        this.update_value();
    }

    public update_value(){
        this.label.string = `${this.value_name} = ${this.value.toPrecision(2)}`;
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
