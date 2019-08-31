import { CHARACTER_SIZE } from "../config/general.js";

export class CharacterBase {
  constructor(
    x = 0,
    y = 100,
    size = CHARACTER_SIZE,
    color = "brown",
    speed = 16
  ) {
    this.x = x;
    this.y = y;
    (this.size = size), (this.color = color), (this.speed = speed);
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}
