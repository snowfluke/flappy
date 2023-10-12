export class Bird {
  x: number;
  y: number;
  vy: number;
  angle: number;
  width: number;
  height: number;

  static spriteFrame = 4;
  static spriteWidth = 17;
  static spriteHeight = 12;
  static spriteGap = 5;
  static spriteY = 261;
  static scaleFactor = 0.1;

  spriteX: number = 0;
  spriteY: number = Bird.spriteHeight;
  spriteGap: number = Bird.spriteGap;
  spriteWidth: number = Bird.spriteWidth;
  spriteHeight: number = Bird.spriteHeight;
  spriteFrame: number = Bird.spriteFrame;

  weight: number = 0.8;
  jumpCooldown: number = 0;
  jumpStrength: number = 10;
  maxJumpCooldown: number = 10;

  constructor(canvasWidth: number) {
    const scale = this.scale(canvasWidth);
    this.x = 150;
    this.y = 200;
    this.vy = 0;
    this.angle = 0;

    this.width = Bird.spriteWidth * scale;
    this.height = (this.width * Bird.spriteHeight) / Bird.spriteWidth;
  }

  scale(width: number) {
    return (Bird.scaleFactor * width) / Bird.spriteWidth;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    frame: number,
    GAME_SPEED: number
  ) {
    if (this.angle < 80) this.angle += 3;
    if (frame % GAME_SPEED == 0) this.spriteX++;

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

    if (this.vy < 0) {
      ctx.rotate((-30 * Math.PI) / 180);
      this.angle = 5;
    } else {
      ctx.rotate((this.angle * Math.PI) / 180);
    }

    ctx.drawImage(
      image,
      this.spriteX * (Bird.spriteWidth + Bird.spriteGap),
      Bird.spriteY,
      Bird.spriteWidth,
      Bird.spriteHeight,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    ctx.restore();
  }

  update(canvasHeight: number, baseHeight: number) {
    if (this.spriteX >= this.spriteFrame - 1) this.spriteX = 0;

    if (this.y > canvasHeight - (this.height + baseHeight)) {
      this.y = canvasHeight - (this.height + baseHeight);
      this.vy = 0;
    } else {
      this.vy += this.angle < 50 ? 0.8 * this.weight : this.weight;
      this.y += this.vy;
    }

    if (this.y <= 0) {
      this.y = 0;
      this.vy = 0;
    }

    if (this.jumpCooldown > 0) this.jumpCooldown--;
  }

  jump() {
    if (this.jumpCooldown === 0) {
      this.vy = 0;

      this.vy -= this.jumpStrength;
      this.jumpCooldown = this.maxJumpCooldown;
    }
  }

  static getStaticWidth(canvasWidth: number) {
    const scale = (Bird.scaleFactor * canvasWidth) / Bird.spriteWidth;
    return Bird.spriteWidth * scale;
  }

  static drawStatic(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    image: HTMLImageElement,
    birdSpriteX: number,
    x: number,
    y: number
  ) {
    const scale = (Bird.scaleFactor * canvasWidth) / Bird.spriteWidth;
    const width = Bird.spriteWidth * scale;
    const height = (width * Bird.spriteHeight) / Bird.spriteWidth;

    ctx.drawImage(
      image,
      birdSpriteX * (Bird.spriteWidth + Bird.spriteGap),
      Bird.spriteY,
      Bird.spriteWidth,
      Bird.spriteHeight,
      x,
      y,
      width,
      height
    );
  }
}
