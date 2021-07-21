
import { _decorator, Component, Node, Graphics, Vec2, EventTouch, Label, UITransformComponent, GraphicsComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdPath')
export class BirdPath extends Component {
    @property(Label)
    info: Label=null!;
    // TODO: 逻辑与绘图分离
    @property(GraphicsComponent)
    graphics: GraphicsComponent = null!;

    acc_time = 0;
    start () {
        // [3]

    }
    public add_point(pos: Vec2){
        var child = this.new_child(pos);
        this.node.addChild(child);
    }

    show_info(event: EventTouch){
    // 显示当前位置信息。
        const node: Node = event.target;
        let v= node.position.clone();
        this.info.string = v.toString();
    }

    new_child(pos: Vec2){
        let new_node = new Node();
        new_node.position.set(pos.x,pos.y);
        var ui = new_node.addComponent(UITransformComponent);
        ui.width=10;
        ui.height=10;
        new_node.on(Node.EventType.TOUCH_MOVE,this.show_info, new_node);
        return new_node;
    }

    update (deltaTime: number) {
        // [4]
        this.acc_time += deltaTime;
        if(this.acc_time>1){
            const pos = this.node.position;
            this.add_point(new Vec2(pos.x,pos.y));
            this.acc_time=0;
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
