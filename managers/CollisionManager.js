export class CollisionManager {
  constructor(entities) {
    this.entities = entities;
  }
  areColliding(entity1, entity2) {
    entity1Area = entity1.getArea();
    entity2Area = entity2.getArea();
    if (entity1Area.x1 > entity2Area.x1 || entity1Area.x1 > entity2Area.x2) {
      console.log("went through");
    }
  }
  bulletCollision(bullet) {
    console.log(this.entities.enemies.enemiesDisplayed);
    for (let j = 0; j < this.entities.enemies.enemiesDisplayed.length; j++) {
      const enemy = this.entities.enemies[j];
      this.areColliding(bullet, enemy);
    }
  }
}
