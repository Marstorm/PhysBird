
import { _decorator, Component, Node, CircleCollider2D, Collider2D, Contact2DType, IPhysics2DContact, PhysicsSystem2D, director, Graphics, GraphicsComponent, RigidBodyComponent, RigidBody2D, Label, Vec2, game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Collision')
export class Collision extends CircleCollider2D {
    touchingCountMap: Map<Array<number>, number> = new Map;
    @property(Node)
    target : Node = null!;

    // TODO: 逻辑与绘图分离
    velocity: Graphics = null!;
    info: Label = null!;

    is_contact = false;
    start () {
        // [3]
        let collider = this;
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        globalThis.ts = this;
        this.velocity = this.node.getComponentInChildren(Graphics);
        this.info = this.node.getComponentInChildren(Label);
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        if(otherCollider.node != this.target){
            return;
        }
        const contact_type = [selfCollider.tag,otherCollider.tag];
        // otherCollider.tag
        game.set_kSpeed(0.1);
        console.log('onBeginContact',director.getTotalTime(), contact_type,);
        this.is_contact=true;
    }
    onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if(otherCollider.node != this.target){
            return;
        }
        // 只在两个碰撞体结束接触时被调用一次
        const contact_type = [selfCollider.tag,otherCollider.tag];
        game.set_kSpeed(1);
        console.log('onEndContact', director.getTotalTime(), contact_type);
        this.is_contact=false;

        let rock = otherCollider.getComponent(RigidBody2D)!
        this.info.string = rock.linearVelocity.toString()
    }
    update(dt:number){
        if(this.is_contact==true){
            const body=this.node.getComponent(RigidBody2D);
            const target_body=this.target.getComponent(RigidBody2D);
            let l=body?.linearVelocity.length()!;
            this.velocity.clear();
            this.drawLine(0,0,-l*5,0);
            let v= body!.linearVelocity.clone()!;
            
            this.info.string = v.toString()
        }
    }

    drawLine(x:number, y:number, rx:number, ry:number) {
        let graphics = this.velocity;
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
