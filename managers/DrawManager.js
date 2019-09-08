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
  drawBullet(ctx, bullet) {
    ctx.fillStyle = bullet.color;
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  }
  drawExistingBullets(ctx) {
    this.bullets[1].exists = false;
    const bulletsToDraw = this.bullets.filter(bullet => bullet.exists === true); // this has to move so that only instantiated bullets appear here;

    for (let i = 0; i < bulletsToDraw.length; i++) {
      const bullet = bulletsToDraw[i];

      this.drawBullet(ctx, bullet);
    }
  }
  draw(ctx) {
    this.drawHero(ctx);
    this.drawExistingBullets(ctx);
  }
}
