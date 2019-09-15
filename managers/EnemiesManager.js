import { PoolOfEntitiesManager } from "./PoolOfEntitiesManager.js";
import { getRandomNumberBetween } from "../utils.js";

export class EnemiesManager extends PoolOfEntitiesManager {
  constructor(entitiesPool, entitiesDisplayed) {
    super(entitiesPool, entitiesDisplayed);
  }
  calculateStartingPosition(canvas, entity) {
    let y, x;
    switch (entity.constructor.name) {
      case "SmallBall":
        y = canvas.height - entity.height * getRandomNumberBetween(1, 3);
        x = getRandomNumberBetween(
          canvas.width / 2,
          canvas.width - entity.width
        );
        break;
      case "LargeSquare":
        y = canvas.height - entity.height;
        x = getRandomNumberBetween(
          canvas.width / 2,
          canvas.width - entity.width
        );
        break;
      default:
        y = canvas.height - entity.height;
        x = getRandomNumberBetween(
          canvas.width / 2,
          canvas.width - entity.width
        );
        break;
    }

    return { x, y };
  }
  /**
   * This is like PoolOfEntitiesManager.enableEntity but it generates
   *  a random starting position
   * @param {HTML2dCanvas} canvas
   */
  enableEnemy(canvas) {
    let entity = this.entitiesPool.pop();
    const startingPosition = this.calculateStartingPosition(canvas, entity);

    entity.x = startingPosition.x;
    entity.y = startingPosition.y;
    entity._state.exists = true;
    this.entitiesDisplayed.push(entity);
    entity.setTravelSpeed();
  }
}
