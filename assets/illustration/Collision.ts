
import { _decorator, Component, Node, CircleCollider2D, Collider2D, Contact2DType, IPhysics2DContact, PhysicsSystem2D, director, Graphics, GraphicsComponent, RigidBodyComponent, RigidBody2D, Label, Vec2, game, Collider, CCFloat, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Collision')
export class Collision extends Component {

    @property(Node)
    target : Node = null!;

    @property(CCFloat)
    distance: number = null!;

    // TODO: 逻辑与绘图分离
    @property(Graphics)
    graphics: Graphics = null!;

    record_time = 0;
    // 0: idle, 1: before contact, 2: pre_collider, 3: post_collider, 4: end contact, 5: end
    state: number = 0;
    move_state=[]

    start () {
        // this.velocity = this.node.getComponentInChildren(Graphics);
        // this.info = this.node.getComponentInChildren(Label);
        var collider = this.node.getComponent(Collider2D)!;
        collider.on(Contact2DType.PRE_SOLVE, this.preSolveContact, this);
        collider.on(Contact2DType.POST_SOLVE, this.postSolveContact, this);
    }

    BeforeContact () {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact', director.getTotalTime());
        game.set_kSpeed(0.1);
    }

    preSolveContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        if(this.target!=otherCollider.node)
            return;
        if(this.state==1){
            this.state=2;
            var b1 = this.node.getComponent(RigidBody2D)!;
            var b2 = this.target.getComponent(RigidBody2D)!;
            var v1 = b1.linearVelocity.x;
            var v2 = b2.linearVelocity.x;
            this.move_state.push([v1,v2]);
            game.set_kSpeed(0);
        }
    }

    postSolveContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        if(this.target!=otherCollider.node)
            return;
        if(this.state==2){
            this.state=3;
            var b1 = this.node.getComponent(RigidBody2D)!;
            var b2 = this.target.getComponent(RigidBody2D)!;
            var v1 = b1.linearVelocity.x;
            var v2 = b2.linearVelocity.x;
            this.move_state.push([v1,v2]);
            this.record_time = director.getTotalTime()
        }
    }

    EndContact () {
        // 只在两个碰撞体结束接触时被调用一次
        game.set_kSpeed(1);
        console.log('onEndContact', director.getTotalTime());
    }
    update(dt:number){
        var dis = (this.node.position.subtract(this.target.position).length());
        var cur_time = director.getTotalTime();
        
        var b1 = this.node.getComponent(RigidBody2D);
        var b2 = this.target.getComponent(RigidBody2D);
        var v1 = b1?.linearVelocity.x;
        var v2 = b2?.linearVelocity.x;
        var m1 =b1?.getMass()
        var m2 =b2?.getMass()

        // console.log('preCollider', director.getTotalTime(), b1?.linearVelocity, b2?.linearVelocity);
        switch (this.state) {
            case 0:
                if(dis<this.distance)
                {
                    this.BeforeContact()
                    this.state=1;
                }
                break;
            case 1: // before contact
                break;
            case 2: // pre_collider
                break;
            case 3: // post_collider, 停滞5s
                if(cur_time - this.record_time>5000)
                {
                    this.state=4;
                    console.log(this.move_state)
                }else{

                }
                break;
            case 4: //end contact
                this.EndContact()
                this.state=5;
                break;
            default:
                break;
        }
        // if(this.is_contact==true){
        //     const body=this.node.getComponent(RigidBody2D);
        //     const target_body=this.target.getComponent(RigidBody2D);
        //     let l=body?.linearVelocity.length()!;
        //     this.velocity.clear();
        //     this.drawLine(0,0,-l*5,0);
        //     let v= body!.linearVelocity.clone()!;
            
        //     this.info.string = v.toString()
        // }
    }

    drawLine(x:number, y:number, rx:number, ry:number) {
        let graphics = this.graphics;
        graphics.moveTo(x, y);
        graphics.lineTo(x - rx, y + ry);
        graphics.stroke();
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
