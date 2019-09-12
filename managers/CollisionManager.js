export class CollisionManager {
  constructor(entities) {
    this.entities = entities;
  }
  areColliding(entity1, entity2) {
    const entity1Area = entity1.getArea();
    const entity2Area = entity2.getArea();
    if (entity1Area.x1 > entity2Area.x1 || entity1Area.x1 > entity2Area.x2) {
      console.log("went through");
    }
  }
  bulletCollision(bullet) {
    for (let j = 0; j < this.entities.enemies.enemiesDisplayed.length; j++) {
      const enemy = this.entities.enemies.enemiesDisplayed[j];
      this.areColliding(bullet, enemy);
    }
  }
}
