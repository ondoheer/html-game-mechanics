export class Personaje {
  constructor(x = 0, y = 100, size = 50, color = "brown") {
    this.x = x;
    this.y = y;
    (this.size = size), (this.color = color);
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}
