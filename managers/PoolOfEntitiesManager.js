export class PoolOfEntitiesManager {
  constructor(entitiesPool, entitiesDisplayed) {
    this.entitiesPool = entitiesPool;
    this.entitiesDisplayed = entitiesDisplayed;
  }

  enableEntity(x, y) {
    let entity = this.entitiesPool.pop();
    entity.x = x;
    entity.y = y;
    this.entitiesDisplayed.push(entity);
  }
  disableEntity(entityIndex) {
    this.entitiesPool.push(this.entitiesDisplayed.splice(entityIndex, 1)[0]);
  }
}
