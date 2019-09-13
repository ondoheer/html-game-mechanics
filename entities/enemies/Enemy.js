import { Entity } from "../Entity.js";

export class Enemy extends Entity {
  // adds hits
  constructor(x, y, width, height, color, speed, hits, direction) {
    super(x, y, width, height, color, speed, direction);
    this.hits = hits;
    this.hitAnimationTicking = 0;
  }

  isDead() {
    return this.hits <= 0;
  }

  hitAnimation() {
    // Deberían ir dentro de draw
    this.hitAnimationTicking += 1;
  }

  // CollisionManager should be here
}
