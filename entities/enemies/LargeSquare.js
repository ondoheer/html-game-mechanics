import { Entity } from "../Entity.js";
import { LEFT_DIRECTION } from "../../config/entities.js";
export class LargeSquare extends Entity {
  constructor(x, y, width, height, color, speed) {
    super(x, y, width, height, color, speed);
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
