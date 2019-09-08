import { NormalBullet } from "../gameItems/Bullet.js";

export class BulletFactory {
  constructor(number = 1000) {
    this.number = number;
    this.normalBulletTemplate = NormalBullet;
    this.bullets = [];
  }

  produceBullets() {
    for (let index = 0; index < this.number; index++) {
      let b = new NormalBullet();
      this.bullets.push(b);
    }
    return this.bullets;
  }
}
