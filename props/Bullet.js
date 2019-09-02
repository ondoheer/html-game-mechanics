class BulletBase {
  constructor(x, y, width = 15, height = 3, speed = 15, color = "#fafafa") {
    this.speed = speed;
    this.iteration = 0;
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class NormalBullet extends BulletBase {
  constructor(x, y) {
    super(x, y);
    this.width = 10;
  }
}
