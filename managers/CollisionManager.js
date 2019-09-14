import { state } from "../state.js";

export class CollisionManager {
  constructor(entities) {
    this.entities = entities;
  }
  /**
   * Checks a bullet to see if it has collided with any of the shown enemies
   * if so, it damages it and then gets destroyed
   * @param {Entity / NormalBullet} bullet
   */
  bulletCollision(bullet) {
    for (let j = 0; j < this.entities.enemies.enemiesDisplayed.length; j++) {
      const enemy = this.entities.enemies.enemiesDisplayed[j];
      if (bullet.isColliding(enemy)) {
        enemy.getHit(bullet.dmg);
        bullet.destroy();
        break;
      }
    }
  }
  /**
   * Checks if the hero has collided with an enemy
   *
   */
  heroCollision() {
    for (let i = 0; i < this.entities.enemies.enemiesDisplayed.length; i++) {
      const enemy = this.entities.enemies.enemiesDisplayed[i];
      const hero = this.entities.hero;

      if (hero.isColliding(enemy)) {
        hero.destroy();
        // GAMEOVER
        state.gameOver = true;
        break;
      }
    }
  }
}
