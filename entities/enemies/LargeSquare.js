import { Enemy } from "./Enemy.js";
import { LEFT_DIRECTION } from "../../config/entities.js";
export class LargeSquare extends Enemy {
  constructor(x, y, width, height, color, speed) {
    super(x, y, width, height, color, speed);
    this.width = 80;
    this.height = 80;
    this.color = "#fafafa";
    this.speed = 4;
    this.baseHits = 5;
    this.hits = this.baseHits;
    this.direction = LEFT_DIRECTION;
  }
}
