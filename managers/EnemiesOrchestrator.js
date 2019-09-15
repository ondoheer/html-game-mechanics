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
    this._state = {};
  }
  nextLevel() {
    state.currentLevel += 1;
  }
  setUpLvl() {
    const currentLevelKey = `level${state.currentLevel}`;
    this._state = this.gameScript[currentLevelKey];
    this._state.numberOfEnemiesInLvl = this.getNumberOfEnemies(currentLevelKey);
    this._state.mapOfEnemies = this.createLvlEnemiesMap();
  }
  orchestrate() {
    // Process the current level

    /**
     * hay que definir CUANDO aparecen los enemigos
     * hay que definir donde aparecen los enemigos
     * hay que hacer aparecer los enemigos
     */

    switch (state.currentLevel) {
      case 1:
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
   * I think this function is useless
   * @param {key value in the form of "level{#}"} level
   */
  getTypesOfEnemies(level) {
    const enemies = this.getLevelEnemies(level);
    const typesOfEnemies = enemies.map(({ type }) => type);
    return typesOfEnemies;
  }
  /**
   *  Returns the sum of enemies in the level
   * for it to be used in the general level counter
   * @param {key value in the form of "level{#}" }level
   */
  getNumberOfEnemies(level) {
    const enemies = this.getLevelEnemies(level);
    // get the total number of enemies that will be sent in this level
    const totalNumberOfEnemies = enemies
      .map(({ number }) => number)
      .reduce((number, total) => number + total);

    return totalNumberOfEnemies;
  }
}
