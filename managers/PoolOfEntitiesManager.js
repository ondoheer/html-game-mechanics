export class PoolOfEntitiesManager {
  constructor(entitiesPool, entitiesDisplayed) {
    this.entitiesPool = entitiesPool;
    this.entitiesDisplayed = entitiesDisplayed;
  }

  enableEntity(x, y) {
    let entity = this.entitiesPool.pop();
    entity.x = x;
    entity.y = y;
    entity._state.exists = true;
    this.entitiesDisplayed.push(entity);
  }
  disableEntity(entityIndex) {
    let entity = this.entitiesDisplayed.splice(entityIndex, 1)[0];
    this.entitiesPool.push(entity);
  }
}
