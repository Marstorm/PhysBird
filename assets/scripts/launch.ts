
import { _decorator, Component, Node, RigidBody2D, v3, EventTouch, v2, find, EditBoxComponent, Vec2, Vec3} from 'cc';
import { geometry, Camera } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Launch')
export class Launch extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    // TODO: 删除，合并至level
    @property(RigidBody2D)
    bird: RigidBody2D = null!;

    theta: EditBoxComponent = null!;
    velocity: EditBoxComponent = null!;


    start () {

        console.log(this.node, find('theta',this.node), this.node.getComponentsInChildren(EditBoxComponent));
        this.theta = find('theta',this.node)?.getComponent(EditBoxComponent)!;
        this.velocity = find('velocity',this.node)?.getComponent(EditBoxComponent)!;
    }

    onLaunch(event:EventTouch){
        let theta = this.theta;
        let velocity = this.velocity;
        if(theta.string && velocity.string){
            let t = parseFloat(theta.string);
            let v = v2(parseFloat(velocity.string),0);
            v.rotate(t);
            this.bird.gravityScale = 1;
            this.bird.linearVelocity=(v);
            this.bird.angularVelocity = 0;
            this.bird.node.position = new Vec3(-350, -185, 0);
            // console.log(theta, velocity, this.bird.linearVelocity);
            
        }
        
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
