import { PoolOfEntitiesManager } from "./PoolOfEntitiesManager.js";
import { getRandomNumberBetween } from "../utils.js";

export class EnemiesManager extends PoolOfEntitiesManager {
  constructor(entitiesPool, entitiesDisplayed) {
    super(entitiesPool, entitiesDisplayed);
  }
  calculateStartingPosition(canvas, entity) {
    const y = canvas.height - entity.height;
    const x = getRandomNumberBetween(120, canvas.width - entity.width);
    return { x, y };
  }
  enableEnemy(canvas) {
    let entity = this.entitiesPool.pop();
    const startingPosition = this.calculateStartingPosition(canvas, entity);

    entity.x = startingPosition.x;
    entity.y = startingPosition.y;
    entity._state.exists = true;
    this.entitiesDisplayed.push(entity);
  }
}
