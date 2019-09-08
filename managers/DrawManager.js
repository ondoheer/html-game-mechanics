export class DrawManager {
  constructor() {}

  drawHero(ctx, hero) {
    ctx.fillStyle = hero.color;
    ctx.fillRect(hero.x, hero.y, hero.size, hero.size);
  }
  drawBullet(ctx, bullet) {
    ctx.fillStyle = bullet.color;
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  }
  drawExistingBullets(ctx, bullets) {
    for (let index = 0; index < bullets.length; index++) {
      this.drawBullet(ctx, bullets[index]);
    }
  }
  draw(ctx, hero, bullets) {
    this.drawHero(ctx, hero);
    this.drawExistingBullets(ctx, bullets);
  }
}
