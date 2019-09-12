import { Entity } from "../Entity.js";
import { RIGHT_DIRECTION } from "../../config/entities.js";
export class NormalBullet extends Entity {
  constructor(x, y) {
    super(x, y);
    this.width = 10;
    this.height = 3;
    this.color = "#fafafa";
    this.speed = 15;
    this.direction = RIGHT_DIRECTION;
  }
}
