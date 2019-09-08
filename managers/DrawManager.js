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
    if (bullets.length > 0) {
      // todo esto debe refactorizarse para que el exists no sea necesario
      bullets[1].exists = false;
      const bulletsToDraw = bullets.filter(bullet => bullet.exists === true); // this has to move so that only instantiated bullets appear here;

      for (let i = 0; i < bulletsToDraw.length; i++) {
        const bullet = bulletsToDraw[i];

        this.drawBullet(ctx, bullet);
      }
    }
  }
  draw(ctx, hero, bullets) {
    this.drawHero(ctx, hero);
    this.drawExistingBullets(ctx, bullets);
  }
}
