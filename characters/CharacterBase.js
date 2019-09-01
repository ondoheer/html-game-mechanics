import { CHARACTER_SIZE } from "../config/character.js";

export class CharacterBase {
  constructor(
    x = 0,
    y = 100,

    size = CHARACTER_SIZE,
    color = "brown",
    speed = 5
  ) {
    this._state = {
      isJumping: false,
      isFalling: false
    };
    this.x = x;
    this.y = y;
    this.yVelocity = 0;
    this.xVelocity = 0;
    (this.size = size), (this.color = color), (this.speed = speed);
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}
