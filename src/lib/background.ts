export class Background {
  static spriteWidth = 144;
  static spriteHeight = 256;
  static spriteX = 0;
  static spriteY = 0;

  static spriteBaseWidth = 154;
  static spriteBaseHeight = 56;
  static spriteBaseX = 149;
  static spriteBaseY = 0;

  IMAGE: HTMLImageElement;
  GAME_SPEED: number;

  x: number = 0;
  y: number = 0;
  width: number;
  height: number;

  baseX: number = 0;
  baseX2: number;
  baseHeight: number;

  spriteWidth: number = Background.spriteWidth;
  spriteHeight: number = Background.spriteHeight;
  spriteX: number = Background.spriteX;
  spriteY: number = Background.spriteY;

  spriteBaseWidth: number = Background.spriteBaseWidth;
  spriteBaseHeight: number = Background.spriteBaseHeight;
  spriteBaseX: number = Background.spriteBaseX;
  spriteBaseY: number = Background.spriteBaseY;

  constructor(canvas: HTMLCanvasElement, IMAGE: HTMLImageElement, FPS: number) {
    this.IMAGE = IMAGE;
    this.width = canvas.width;
    this.height = canvas.height;

    this.GAME_SPEED = Math.round(FPS * 0.4);

    this.baseHeight = this.spriteBaseHeight * 3.35;
    this.baseX2 = this.width - this.GAME_SPEED;
  }

  getBaseTop() {
    return this.baseHeight / 2;
  }

  update() {
    if (this.baseX <= -this.width + this.GAME_SPEED) {
      this.baseX = this.width - this.GAME_SPEED;
      this.baseX2 += this.GAME_SPEED;
    } else {
      this.baseX -= this.GAME_SPEED;
    }

    if (this.baseX2 <= -this.width + this.GAME_SPEED) {
      this.baseX2 = this.width - this.GAME_SPEED;
      this.baseX += this.GAME_SPEED;
    } else {
      this.baseX2 -= this.GAME_SPEED;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Background
    ctx.drawImage(
      this.IMAGE,
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
      this.IMAGE,
      this.spriteBaseX,
      this.spriteBaseY,
      this.spriteBaseWidth,
      this.spriteBaseHeight,
      this.baseX,
      this.height - this.baseHeight / 2,
      this.width,
      this.baseHeight
    );

    // Base 2 for moving it
    ctx.drawImage(
      this.IMAGE,
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
