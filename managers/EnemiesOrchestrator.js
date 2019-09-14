import { LEVEL_STRUCTURE } from "../config/levels.js";
import { state } from "../state.js";

export class EnemiesOrchestrator {
  /**
   * Receives the game entities object
   * @param {object} entities
   */
  constructor(entities, enemiesManager) {
    this.enemies = entities.enemies;
    this.enemiesManager = enemiesManager;
    this.gameScript = LEVEL_STRUCTURE;
    this._state = undefined;
  }
  nextLevel() {
    state.currentLevel += 1;
  }
  orchestrate() {
    const currentLevelKey = `level${state.currentLevel}`;

    this._state = this.gameScript[currentLevelKey];

    switch (state.currentLevel) {
      case 1:
        //while (condition) {}
        //console.log(this.getNumberOfEnemies(currentLevelKey));
        // TODO
        break;

      default:
        state.finishedGame = true;
    }
  }
  /**
   *
   * @param {key value in the form of "level{#}"} level
   */
  getLevelEnemies(level) {
    return this._state.enemies;
  }
  /**
   * Returns the types of enemies to be instantiated
   * @param {key value in the form of "level{#}"} level
   */
  getTypesOfEnemies(level) {
    const enemies = this.getLevelEnemies(level);
    return enemies;
  }
  /**
   *  Returns the sum of enemies in the level
   * @param {key value in the form of "level{#}" }level
   */
  getNumberOfEnemies(level) {
    const enemies = this.getLevelEnemies(level);

    const totalNumberOfEnemies = enemies.filter(enemy => enemy.number);

    return totalNumberOfEnemies;
  }
}
