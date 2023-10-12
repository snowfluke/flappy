export class Background {
  x: number;
  y: number;
  width: number;
  height: number;

  baseX: number;
  baseX2: number;
  baseHeight: number;

  static spriteWidth = 144;
  static spriteHeight = 256;
  static spriteX = 0;
  static spriteY = 0;

  spriteWidth: number = Background.spriteWidth;
  spriteHeight: number = Background.spriteHeight;
  spriteX: number = Background.spriteX;
  spriteY: number = Background.spriteY;

  static spriteBaseWidth = 154;
  static spriteBaseHeight = 56;
  static spriteBaseX = 149;
  static spriteBaseY = 0;

  spriteBaseWidth: number = Background.spriteBaseWidth;
  spriteBaseHeight: number = Background.spriteBaseHeight;
  spriteBaseX: number = Background.spriteBaseX;
  spriteBaseY: number = Background.spriteBaseY;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = this.y = this.baseX = 0;
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.baseHeight = this.spriteBaseHeight * 3.35;
    this.baseX2 = this.width;
  }

  getBaseTop() {
    return this.baseHeight / 2;
  }

  update(speed: number) {
    if (this.baseX <= -this.width + speed) {
      this.baseX = this.width - speed;
    } else {
      this.baseX -= speed;
    }
    if (this.baseX2 <= -this.width + speed) {
      this.baseX2 = this.width - speed;
    } else {
      this.baseX2 -= speed;
    }
  }

  draw(ctx: CanvasRenderingContext2D, IMAGE: HTMLImageElement) {
    // Background
    ctx.drawImage(
      IMAGE,
      this.spriteX,
      this.spriteY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    // Base
    ctx.drawImage(
      IMAGE,
      this.spriteBaseX,
      this.spriteBaseY,
      this.spriteBaseWidth,
      this.spriteBaseHeight,
      this.baseX,
      this.height - this.baseHeight / 2,
      this.width,
      this.baseHeight
    );

    ctx.drawImage(
      IMAGE,
      this.spriteBaseX,
      this.spriteBaseY,
      this.spriteBaseWidth,
      this.spriteBaseHeight,
      this.baseX2,
      this.height - this.baseHeight / 2,
      this.width,
      this.baseHeight
    );
  }
}
