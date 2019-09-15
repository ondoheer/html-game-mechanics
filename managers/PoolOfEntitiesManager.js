import { getRandomNumberBetween } from "../utils.js";
export class PoolOfEntitiesManager {
  constructor(entitiesPool, entitiesDisplayed) {
    this.entitiesPool = entitiesPool;
    this.entitiesDisplayed = entitiesDisplayed;
  }

  calculateStartingPosition(canvas, entity) {
    const y = canvas.height - entity.height;
    const x = getRandomNumberBetween(120, canvas.width - entity.width);
    return { x, y };
  }
  enableEntity(canvas) {
    let entity = this.entitiesPool.pop();
    const startingPosition = this.calculateStartingPosition(canvas, entity);

    entity.x = startingPosition.x;
    entity.y = startingPosition.y;
    entity._state.exists = true;
    this.entitiesDisplayed.push(entity);
  }
  disableEntity(entityIndex) {
    let entity = this.entitiesDisplayed.splice(entityIndex, 1)[0];
    this.entitiesPool.push(entity);
  }
}
