import { CharacterBase } from "./CharacterBase.js";
import { state } from "../state.js";
import { canvasWidth } from "../game.js";

export class Hero extends CharacterBase {
  reachedRightBoundary() {
    return this.x >= canvasWidth - this.size - this.speed;
  }
  reachedLeftBoundary() {
    return this.x <= 0;
  }

  update(progress) {
    if (state.pressedKeys.right && !this.reachedRightBoundary()) {
      this.x += this.speed;
    }
    if (state.pressedKeys.left && !this.reachedLeftBoundary()) {
      this.x -= this.speed;
    }
  }
}
