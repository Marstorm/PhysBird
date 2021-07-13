
import { _decorator, Component, Node, UITransformComponent, EventTouch, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Drag')
export class Drag extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    // @property(Node)
    // node:Node = null!;
    private _oldPosition: Readonly<import("cc").math.Vec3> = null!;

    onLoad() {
      
        //添加变量判断用户当前鼠标是不是处于按下状态
        let mouseDown = false;
        //当用户点击的时候记录鼠标点击状态

        let carNode = this.node;
        //只有当用户鼠标按下才能拖拽
        this.node.on(Node.EventType.MOUSE_MOVE, (event:EventTouch)=>{
            //获取鼠标距离上一次点的信息
            
            
            let pos = event.getUILocation();
            //增加限定条件
            // let minX = -carNode.parent.width / 2 + carNode.width / 2;
            // let maxX = carNode.parent.width / 2 - carNode.width / 2;
            // let minY = -carNode.parent.height / 2 + carNode.height / 2;
            // let maxY = carNode.parent.height / 2 - carNode.height / 2;
            // let moveX = carNode.position.x + delta.x;
            // let moveY = carNode.position.y + delta.y;
            // //控制移动范围
            // if(moveX < minX){
            //     moveX = minX;
            // }else if(moveX > maxX){
            //     moveX = maxX;
            // }
            // if(moveY < minY){
            //     moveY = minY;
            // }else if(moveY > maxY){
            //     moveY = maxY;
            // }
            //移动小车节点
            carNode.setPosition(pos.x,pos.y);
        });
        //当鼠标抬起的时候恢复状态
        carNode.on(Node.EventType.MOUSE_UP, (event: Event)=>{
            mouseDown = false;
        });
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
