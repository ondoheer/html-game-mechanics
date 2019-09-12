import { Enemy } from "./Enemy.js";
import { LEFT_DIRECTION } from "../../config/entities.js";
export class LargeSquare extends Enemy {
  constructor(x, y, width, height, color, speed) {
    super(x, y, width, height, color, speed);
    this.width = 80;
    this.height = 80;
    this.color = "#fafafa";
    this.speed = 7;
    this.hits = 5;
    this.direction = LEFT_DIRECTION;
  }

  getHit(dmg = 1) {
    if (this.hits > 0) {
      this.hits -= dmg;
    } else {
      this.destroy();
    }
  }
  destroy() {
    console.log("I have been destroyed");
  }
}
