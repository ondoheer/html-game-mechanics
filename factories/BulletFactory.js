import { NormalBullet } from "../entities/gameItems/Bullet.js";
import { NUMBER_OF_BULLETS } from "../config/elements.js";

export class BulletFactory {
  constructor(number = NUMBER_OF_BULLETS) {
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
