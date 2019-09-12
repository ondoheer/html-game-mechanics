import { Entity } from "../Entity.js";

export class Enemy extends Entity {
  // adds hits
  constructor(x, y, width, height, color, speed, hits, direction) {
    super(x, y, width, height, color, speed, direction);
    this.hits = hits;
  }

  isDead() {
    return this.hits <= 0;
  }
}
