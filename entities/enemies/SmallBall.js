import { Enemy } from "./Enemy.js";
import { LEFT_DIRECTION } from "../../config/entities.js";
export class SmallBall extends Enemy {
  constructor(x, y, width, height, color, speed) {
    super(x, y, width, height, color, speed);
    this.width = 25;
    this.height = 25;
    this.baseColor = "#45fe87";
    this.color = "#45fe87";
    this.speed = 0.2;
    this.baseHits = 1;
    this.hits = this.baseHits;
    this.direction = LEFT_DIRECTION;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.height, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
