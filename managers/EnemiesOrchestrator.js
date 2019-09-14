import { LEVEL_STRUCTURE } from "../config/levels.js";
import { state } from "../state.js";

export class EnemiesOrchestrator {
  /**
   * Receives the game entities object
   * @param {object} entities
   */
  constructor(entities) {
    this.enemies = entities.enemies;
    this.gameScript = LEVEL_STRUCTURE;
    this._state = undefined;
  }
  nextLevel() {
    state.currentLevel += 1;
  }
  orchestrate() {
    const currentLevelKey = `level${state.currentLevel}`;

    switch (state.currentLevel) {
      case 1:
        this._state = this.gameScript[currentLevelKey];
        // TODO
        break;

      default:
        state.finishedGame = true;
    }
  }
}
