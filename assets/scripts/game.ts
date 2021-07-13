
import { _decorator, Component, Node, RigidBody, game, SystemEventType } from 'cc';
import {PhysicsSystem2D, Contact2DType, Collider2D, EPhysics2DDrawFlags} from 'cc';
const { ccclass, property } = _decorator;

game._kSpeed = 1;
var _originpostUpdate = PhysicsSystem2D.prototype.postUpdate;
PhysicsSystem2D.prototype.postUpdate = function (dt) {
    _originpostUpdate.call(this, dt * game._kSpeed);
}

@ccclass('Game')
export class Game extends Component {
    touchingCountMap: Map<Node, number> = new Map;
    // [1]
    // dummy = '';

    // [2]
    
    physics_update: (dt: number)=>void = null;

    start () {
        // [3]
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
            EPhysics2DDrawFlags.Pair |
            EPhysics2DDrawFlags.CenterOfMass |
            EPhysics2DDrawFlags.Joint |
            EPhysics2DDrawFlags.Shape;
        
        PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeinContact, this);
        PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        globalThis.physics2d = PhysicsSystem2D.instance;

        this.physics_update = PhysicsSystem2D.instance.postUpdate;


        
    }

    
    addContact (c: Collider2D) {
        let count = this.touchingCountMap.get(c.node) || 0;
        this.touchingCountMap.set(c.node, ++count);
        // PhysicsSystem2D.instance.enable = false;
        let update = this.physics_update;
        if (update){
            // PhysicsSystem2D.instance.update = function(dt: number){
            //     update(dt/10);
            // };
            console.log(update);
        }
        
        console.log('add',c.node);
        
    }

    removeContact (c: Collider2D) {
        let count = this.touchingCountMap.get(c.node) || 0;
        --count;
        if (count <= 0) {
            this.touchingCountMap.delete(c.node);
        }
        else {
            this.touchingCountMap.set(c.node, count);
        }
    }

    onBeinContact (a: Collider2D, b: Collider2D) {
        this.addContact(a);
        this.addContact(b);
    }

    onEndContact (a: Collider2D, b: Collider2D) {
        this.removeContact(a);
        this.removeContact(b);
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
