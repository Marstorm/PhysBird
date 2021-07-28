
import { _decorator, Component, Node, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CollosionShow')
export class CollosionShow extends Component {
    // [1]
    @property(RigidBody2D)
    obj1 : RigidBody2D = null!;

    @property(RigidBody2D)
    obj2 : RigidBody2D = null!;

    
    state = 0;
    

    start () {
        // [3]
        this.node.addChild()
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
