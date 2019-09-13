import { Entity } from "../Entity.js";

export class Enemy extends Entity {
  // adds hits
  constructor(x, y, width, height, color, speed, hits, direction) {
    super(x, y, width, height, color, speed, direction);
    this.hits = hits;
    this.hitAnimationTicking = 0;
  }
  getHit(dmg = 1) {
    console.log(this.hits);
    this.hitAnimation();
    this.hits -= dmg;
    if (this.isDead()) {
      this.destroy();
    }
  }
  destroy() {
    console.log("I have been destroyed");
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
