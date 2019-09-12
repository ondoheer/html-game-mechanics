import { CHARACTER_SIZE } from "../config/entities.js";
import { Entity } from "./Entity.js";
import { JUMP_SPEED, JUMP_MAX_HEIGHT } from "../config/entities.js";
import { state } from "../state.js";
import { canvasWidth, canvasHeight } from "../main.js";
import { LEFT_DIRECTION, RIGHT_DIRECTION } from "../config/entities.js";
export class Hero extends Entity {
  constructor(x, y, width, height, color, speed) {
    super(x, y, width, height, color, speed);
    this.jumpSpeed = JUMP_SPEED;
    this.jumpMaxHeight = JUMP_MAX_HEIGHT;
    this.height = CHARACTER_SIZE;
    this.width = CHARACTER_SIZE;
  }
  /**
   * Checks if character has reached the right canvas boundary
   */
  reachedRightBoundary() {
    return this.x >= canvasWidth - this.width - this.speed;
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
    return canvasHeight - this.height == this.y; // 150 - 50 == 100
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
    this.direction = RIGHT_DIRECTION;
    this.setTravelSpeed();
  }
  moveLeft() {
    this.direction = LEFT_DIRECTION;
    this.setTravelSpeed();
  }
  stopMoving() {
    this.xVelocity = 0;
  }
  /**
   * There the bullets will spawn from.animacionesIt always should be the middle of the character
   */
  getShootingPosition() {
    // right limit
    const x = this.x + this.width;
    // mid section
    const y = this.y + this.height / 2;
    return { x, y };
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

  update() {
    this.updatePosition();
  }
}
