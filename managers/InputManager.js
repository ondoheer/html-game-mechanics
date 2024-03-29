import {
  MOVE_LEFT_PRESSED,
  MOVE_RIGHT_PRESSED,
  MOVE_LEFT_RELEASED,
  MOVE_RIGHT_RELEASED,
  JUMP_PRESSED,
  JUMP_RELEASED,
  MOUSE_CLICKED
} from "../controls.js";
import { state } from "../state.js";

export class InputManager {
  constructor(bulletManager, hero) {
    this.hero = hero;
    this.bulletManager = bulletManager;
  }
  shoot() {
    const bulletCoords = this.hero.getShootingPosition();
    this.bulletManager.enableEntity(bulletCoords.x, bulletCoords.y);
  }

  handleInput() {
    switch (state.input) {
      case MOVE_RIGHT_PRESSED:
        this.hero.moveRight();

        break;
      case MOVE_RIGHT_RELEASED:
        this.hero.stopMoving();
        break;
      case MOVE_LEFT_PRESSED:
        this.hero.moveLeft();
        break;
      case MOVE_LEFT_RELEASED:
        this.hero.stopMoving();
        break;
      case JUMP_PRESSED:
        this.hero.jump();
        break;
      case JUMP_RELEASED:
        // unused now, helps with special stuff done while in the air;
        break;
      case MOUSE_CLICKED:
        this.shoot();
      default:
        // unused now;
        break;
    }
    state.input = undefined;
  }
}
