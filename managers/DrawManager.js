export class DrawManager {
  constructor(hero, bullets) {
    this.hero = hero;
    this.bullets = bullets;
    this.enemies = [];
  }

  drawHero(ctx) {
    ctx.fillStyle = this.hero.color;
    ctx.fillRect(this.hero.x, this.hero.y, this.hero.size, this.hero.size);
  }
  drawBullet(ctx) {
    ctx.fillStyle = this.bullets[0].color;
    ctx.fillRect(
      this.bullets[0].x,
      this.bullets[0].y,
      this.bullets[0].width,
      this.bullets[0].height
    );
  }
  draw(ctx) {
    this.drawHero(ctx);
    this.drawBullet(ctx);
  }
}
