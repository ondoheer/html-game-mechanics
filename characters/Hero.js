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
    this.y -= this.jumpSpeed;

    if (this.reachedMaxJumpHeight()) {
      this.state.isJumping = false;
      this.state.isFalling = true;
    }
  }
  stopMoving() {
    this.xVelocity = 0;
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
  updatePosition() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
  handleInput() {
    // finite state machine
    // if (this.state.isGrounded || this.state.isJumping) {
    //   if (state.pressedKeys.jump) {
    //     this.state.isJumping = true;
    //     this.state.isGrounded = false;
    //     this.jump();
    //   }
    // } else if (this.state.isFalling) {
    //   this.y += this.jumpSpeed;
    //   if (this.isStandingOnGround()) {
    //     this.state.isFalling = false;
    //     this.state.isGrounded = true;
    //   }
    // }
  }
  /**
   * Ahora no estoy usando el progress porque prefiero darle un speed
   * al personaje, pero se le podría pasar como parámetro si queremos
   * que el movimiento cambie según el clockspeed
   * Aquí actualizamos la posición del personaje en pantalla
   *
   */
  update() {
    this.handleInput();
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
      default:
        break;
    }

    this.updatePosition();
  }
}
