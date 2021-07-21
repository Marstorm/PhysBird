
import { _decorator, Component, Node, Collider2D, IPhysics2DContact, EventTouch } from 'cc';
const { ccclass, property } = _decorator;
// 处理关卡内的游戏逻辑

@ccclass('Level')
export class Level extends Component {
    // TODO: 关卡逻辑
    @property(Node)
    bird: Node = null!

    @property(Node)
    pig: Node = null!

    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]

    }

    onLaunch(event:EventTouch){
        this.launch()
    }

    onHitPig(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        this.victory()
    }

    launch(){

    }

    victory(){

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
