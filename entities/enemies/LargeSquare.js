import { Entity } from "../Entity.js";
import { LEFT } from "../../config/entities.js";
export class LargeSquare extends Entity {
  constructor(x, y, width, height, color, speed) {
    super(x, y, width, height, color, speed);
    this.hits = 5;
    this.direction = LEFT;
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
