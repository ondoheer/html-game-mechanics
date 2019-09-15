import { Entity } from "../Entity.js";

export class Enemy extends Entity {
  // adds hits
  constructor(x, y, width, height, color, speed, hits, direction) {
    super(x, y, width, height, color, speed, direction);
    this.baseHits = hits;
    this.hits = hits;
    this.hitAnimationTicking = 0;
  }
  getHit(dmg = 1) {
    this.hitAnimation();
    this.color = this.baseColor;
    this.hits -= dmg;
    if (this.isDead()) {
      this.destroy();
    }
  }

  isDead() {
    return this.hits <= 0;
  }
  reset() {
    this.hits = this.baseHits;
    this.color = this.baseColor;
  }
  hitAnimation() {
    // Deberían ir dentro de draw
    // o debería tener consciencia de en que frame se encuentra
  }
}
