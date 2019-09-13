export class CollisionManager {
  constructor(entities) {
    this.entities = entities;
  }

  bulletCollision(bullet) {
    for (let j = 0; j < this.entities.enemies.enemiesDisplayed.length; j++) {
      const enemy = this.entities.enemies.enemiesDisplayed[j];
      bullet.isColliding(enemy);
    }
  }
}
