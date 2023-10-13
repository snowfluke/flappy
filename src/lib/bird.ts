import { Misc } from "./misc";

export class Bird {
  static spriteFrame = 4;
  static spriteWidth = 17;
  static spriteHeight = 12;
  static spriteGap = 5;
  static spriteY = 261;
  static grid = 12;

  IMAGE: HTMLImageElement;
  FPS: number;

  x: number;
  y: number;
  vy: number = 0;
  angle: number = 0;

  width: number;
  height: number;
  canvasWidth: number;
  canvasHeight: number;

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
  baseX: number;

  constructor(
    canvas: HTMLCanvasElement,
    IMAGE: HTMLImageElement,
    FPS: number,
    baseX: number
  ) {
    this.IMAGE = IMAGE;
    this.FPS = FPS;

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    const scale = Misc.getScale(this.canvasWidth);
    this.baseX = baseX;

    this.x = this.canvasWidth * (2.75 / Bird.grid);
    this.y = this.canvasHeight * (4.65 / Bird.grid);

    this.width = Bird.spriteWidth * scale;
    this.height = (this.width * Bird.spriteHeight) / Bird.spriteWidth;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

    if (this.vy < 0) {
      ctx.rotate((-30 * Math.PI) / 180);
      this.angle = 5;
    } else {
      ctx.rotate((this.angle * Math.PI) / 180);
    }

    ctx.drawImage(
      this.IMAGE,
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

  update(frame: number, stationary: boolean = false) {
    if (this.spriteX >= this.spriteFrame - 1) this.spriteX = 0;
    if (frame % this.FPS == 0) this.spriteX++;
    if (stationary) return;

    if (this.angle < 80) this.angle += 3;

    if (this.y > this.canvasHeight - (this.height + this.baseX)) {
      this.y = this.canvasHeight - (this.height + this.baseX);
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
    return Bird.spriteWidth * Misc.getScale(canvasWidth);
  }

  static drawStatic(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    IMAGE: HTMLImageElement,
    birdSpriteX: number,
    x: number,
    y: number
  ) {
    const width = Bird.spriteWidth * Misc.getScale(canvasWidth);
    const height = (width * Bird.spriteHeight) / Bird.spriteWidth;

    ctx.drawImage(
      IMAGE,
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
