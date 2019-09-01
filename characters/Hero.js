import { CharacterBase } from "./CharacterBase.js";
import { JUMP_SPEED, JUMP_MAX_HEIGHT } from "../config/character.js";
import { state } from "../state.js";
import { canvasWidth, canvasHeight } from "../game.js";
import {
  MOVE_LEFT_PRESSED,
  MOVE_RIGHT_PRESSED,
  MOVE_LEFT_RELEASED,
  MOVE_RIGHT_RELEASED,
  JUMP_PRESSED,
  JUMP_RELEASED
} from "../controls.js";

export class Hero extends CharacterBase {
  constructor() {
    super();
    this.jumpSpeed = JUMP_SPEED;
    this.jumpMaxHeight = JUMP_MAX_HEIGHT;
  }
  /**
   * Checks if character has reached the right canvas boundary
   */
  reachedRightBoundary() {
    return this.x >= canvasWidth - this.size - this.speed;
  }
  /**
   * Checks if character has reached the left canvas boundary
   */
  reachedLeftBoundary() {
    return this.x <= 0;
  }
  /**
   * Checks if character upper pixel has reached the max allowed
   * jump height.
   * checks if Y coord is 0
   */
  reachedMaxJumpHeight() {
    return this.y <= canvasHeight - this.jumpMaxHeight;
  }
  /**
   * Checks if character upper pixel has reached the max allowed
   * jump height.
   * checks if Y coord is the starting position
   */
  isStandingOnGround() {
    return canvasHeight - this.size == this.y; // 150 - 50 == 100
  }
  /**
   * Updates the Hero Y position, once it has reached the most he can jump,
   * it starts going down until it reaches the ground.
   * It updates the state isJumping property no podemos poner un while loop aquí porque acelera todo
   * necesito otra forma de controlar el máximo salto y el estado
   */
  jump() {
    if (!this.reachedMaxJumpHeight()) {
      this.yVelocity = -this.jumpSpeed;
      this._state.isJumping = true;
    }
  }
  stopJumping() {
    this.yVelocity = 0;
    this._state.isJumping = false;
    this._state.isFalling = true;
  }
  fall() {
    if (!this.isStandingOnGround()) {
      this.yVelocity = this.jumpSpeed;
    }
  }
  stopFalling() {
    this.yVelocity = 0;
    this._state.isFalling = false;
  }
  moveRight() {
    if (!this.reachedRightBoundary()) {
      this.xVelocity = this.speed;
    } else {
      this.stopMoving();
    }
  }
  moveLeft() {
    if (!this.reachedLeftBoundary()) {
      this.xVelocity = -this.speed;
    } else {
      this.stopMoving();
    }
  }
  stopMoving() {
    this.xVelocity = 0;
  }
  updateCoordSpeeds() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
  // this should be part of the world
  updateGravity() {
    if (this.reachedMaxJumpHeight()) {
      this.stopJumping();
    }
    if (this._state.isFalling) {
      this.fall();
    }
    if (this.isStandingOnGround()) {
      this.stopFalling();
    }
  }
  updatePosition() {
    this.updateCoordSpeeds();
    this.updateGravity();
  }
  handleInput() {
    if (state.input !== undefined) {
      console.log(state.input);
    }
    switch (state.input) {
      case MOVE_RIGHT_PRESSED:
        this.moveRight();

        break;
      case MOVE_RIGHT_RELEASED:
        this.stopMoving();
        break;
      case MOVE_LEFT_PRESSED:
        this.moveLeft();
        break;
      case MOVE_LEFT_RELEASED:
        this.stopMoving();
        break;
      case JUMP_PRESSED:
        this.jump();
        break;
      case JUMP_RELEASED:
        // unused now, helps with special stuff done while in the air;
        break;
      default:
        // unused now;
        break;
    }
  }

  update() {
    this.handleInput();
    this.updatePosition();
    // reset input state
    state.input = undefined;
  }
}
