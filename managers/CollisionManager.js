export class CollisionManager {
  constructor(entities) {
    this.entities = entities;
  }
  areColliding(entity1, entity2) {
    /**
    The x position of the entity1 is greater than the x position of the entity2.
    The x position of the entity1 is less than the x position of the entity2 plus its width.
    The y position of the entity1 is greater than the y position of the entity2.
    The y position of the entity1 is less than the y position of the entity2 plus its height.
 */
    const entity1Area = entity1.getArea();
    const entity2Area = entity2.getArea();
    if (
      entity1Area.x1 > entity2Area.x1 &&
      entity1Area.x1 < entity2Area.x2 &&
      entity1Area.y1 > entity2Area.y1 &&
      entity1Area.y1 < entity2Area.y2
    ) {
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
