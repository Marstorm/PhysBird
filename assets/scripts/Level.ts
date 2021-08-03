
import { _decorator, Component, Node, Collider2D, IPhysics2DContact, EventTouch, RigidBody2D, v2, Vec3, Collider, Contact2DType, CircleCollider2D, find, director, game, Label, EditBox } from 'cc';
const { ccclass, property } = _decorator;
// 处理关卡内的游戏逻辑

@ccclass('Level')
export class Level extends Component {
    // TODO: 关卡逻辑
    @property(RigidBody2D)
    bird: RigidBody2D = null!

    @property(RigidBody2D)
    pig: RigidBody2D = null!

    @property(Label)
    info: Label = null!;

    @property(EditBox)
    input_vel: EditBox = null!;

    start () {
        // [3]
        let pig_collider = this.pig.node.getComponent(CircleCollider2D)!;
        pig_collider.on(Contact2DType.BEGIN_CONTACT, this.onHitPig, this);
        this.bird.node.getComponent(CircleCollider2D).on(Contact2DType.BEGIN_CONTACT, this.onHitPig, this);
        // this.bird._body._body.m_mass=1;
        this.node.on(Node.EventType.MOUSE_MOVE,this.onMove,this)
    }

    onMove(event: EventTouch){
        let pos = event.getLocation()
        this.info.string = `pos: (${(pos.x/32/2).toFixed(1)}, ${(pos.y/32/2).toFixed(1)})`
    }

    onLaunch(event:EventTouch){
        // calculation
        let vel = parseFloat(this.input_vel.string)
        //
        this.launch(0,vel); //15.77
    }

    onReplay(event:EventTouch){
        game.restart();
    }

    onEditBox(event: EditBox){
        // console.log(event)
        const active_var = cc.cas.active_var
        if(active_var&&active_var.is_known()){
            event.string=active_var.experssion();
        }
        
    }

    onHitPig(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        if(otherCollider.tag == 1 && selfCollider.node == this.pig.node)
            this.victory()
    }

    launch(theta: number, velocity: number){
        let v = v2(velocity,0);
        v.rotate(theta);
        this.bird.gravityScale = 1;
        this.bird.linearVelocity=(v);
        
        // reset 
        // this.bird._body._body.SetAngle(theta);
        this.bird.angularVelocity = 0;
        this.bird.node.position = new Vec3(-350, 0, 0);
        this.bird.node.setRotation(0,0,0,1)
    }


    victory(){
        let win_msg = find('win_msg',this.node)!
        win_msg.active = true;
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
