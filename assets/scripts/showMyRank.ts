
import { _decorator, Component, Node, Graphics, math} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShowMyRank')
export class ShowMyRank extends Graphics {
    // [1]
    // dummy = '';

    // [2]
 
    // serializableDummy = 0;
    //@property(ShowMyRank)
    width : number = 300;
    //@property(ShowMyRank)
    height : number = 300;
    //@property(ShowMyRank)
    edge : number = 100;

    private allPoints : Array<Array<Array<number>>> = null!;
    private score : Array<number> = null!;
    private coverPoints : Array<Array<number>> = null!;
    private radius : number = null!;

    start () {
        this.allPoints = new Array<Array<Array<number>>>(7);
        this.score     = [82, 90, 70, 100, 93, 88];
        this.radius    = 2
        this.draw_ability([82, 90, 70, 100, 93, 88]);
    }

    public draw_ability(score: Array<number>){
      this.clear();
      this.coverPoints = [];
      this.score     = score;
      //this.fillColor.fromHEX('#ff0000');
      this.drawHexagonInner(this.edge)
      this.drawLines()
      this.drawCover()
      this.drawPoints(this.radius)
      this.stroke();
    }

    computeHexagonPoints (width: number, height : number, edge : number) {
        let centerX = width / 2;
        let centerY = height / 2;
        let x = edge * Math.sqrt(3) / 2;
        let left = centerX - x;
        let x1, x2, x3, x4, x5, x6;
        let y1, y2, y3, y4, y5, y6;
        x5 = x6 = left;
        x2 = x3 = left + x * 2;
        x1 = x4 = left + x;
    
        let y = edge / 2;
        let top = centerY - 2 * y;
        y1 = top;
        y2 = y6 = top + y;
        y3 = y5 = top + 3 * y;
        y4 = top + 4 * y;
    
        let points = new Array();
        points[0] = [x1, y1];
        points[1] = [x2, y2];
        points[2] = [x3, y3];
        points[3] = [x4, y4];
        points[4] = [x5, y5];
        points[5] = [x6, y6];
        return points;
    }

    drawHexagonInner(edge : number) {
        for (var i = 0; i < 6; i++) {
            this.lineWidth = 5;
            this.allPoints[i] = this.computeHexagonPoints(this.width, this.height, this.edge - i * this.edge / 5);
            this.moveTo(this.allPoints[i][5][0], this.allPoints[i][5][1]);
            for (var j = 0; j < 6; j++) {
                this.lineTo(this.allPoints[i][j][0], this.allPoints[i][j][1]);
            }
            this.stroke();
            this.close();
        }
    }

    drawLines() {
        for (let i = 0; i < 3; i++) {
          this.moveTo(this.allPoints[0][i][0], this.allPoints[0][i][1]); //1-4
          this.lineTo(this.allPoints[0][i+3][0], this.allPoints[0][i+3][1]); //1-4
          this.stroke();
          this.close();
        }
    }

    drawCover() {
        let tmpCoverPoints = this.allPoints[0];
        // console.log("coverPoints ",tmpCoverPoints)
    
        let centerX = this.width / 2;
        let centerY = this.height / 2;

        for (let i = 0; i < tmpCoverPoints.length; i++) {
          this.coverPoints.push([
            centerX + (tmpCoverPoints[i][0] - centerX) * (this.score[i] / 100.0),
            centerX + (tmpCoverPoints[i][1] - centerY) * (this.score[i] / 100.0)
          ]);
        }

        // console.log("newCoverPoints ", coverPoints)
        this.moveTo(this.coverPoints[5][0], this.coverPoints[5][1]); //5
        for (var j = 0; j < 6; j++) {
          this.lineTo(this.coverPoints[j][0], this.coverPoints[j][1]);
        }
        this.stroke();
        this.fill();
        this.close();
    }

    drawPoints(pointRadius : number) {
        //this.fillColor.fromHEX('#f');
        for (let i = 0; i < this.coverPoints.length; i++) {
          this.arc(this.coverPoints[i][0], this.coverPoints[i][1], pointRadius, 0, Math.PI*2, false);
          this.fill();
        }
        this.close();
    }

    //update (deltaTime: number) {


    //     // [4]
    //}

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
}