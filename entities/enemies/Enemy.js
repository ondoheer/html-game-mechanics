import { Entity } from "../Entity.js";

export class Enemy extends Entity {
  // adds hits
  constructor(x, y, width, height, color, speed, hits, direction) {
    super(x, y, width, height, color, speed, direction);
    this.baseHits = hits;
    //this.hits = hits;
    this.hitAnimationTicking = 0;
  }
  getHit(dmg = 1) {
    this.hitAnimation();
    this.hits -= dmg;
    if (this.isDead()) {
      this.destroy();
    }
    console.log(this);
  }

  isDead() {
    return this.hits <= 0;
  }
  reset() {
    this.hits = this.baseHits;
  }
  hitAnimation() {
    // Deberían ir dentro de draw
    this.hitAnimationTicking += 1;
  }

  // CollisionManager should be here
}
