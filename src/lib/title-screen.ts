import { Bird } from "./bird";

export class Title {
  x: number;
  y: number;
  creditX: number;
  creditY: number;

  width: number;
  height: number;
  creditWidth: number;
  creditHeight: number;

  canvasWidth: number;
  canvasHeight: number;

  birdSpriteX: number;
  maxY: number;
  vy: number;

  static spriteX = 0;
  static spriteY = 382;
  static spriteGap = 5;
  static spriteWidth = 100;
  static spriteHeight = 22;
  static marginPercentage = 0.15;

  spriteX: number = Title.spriteX;
  spriteY: number = Title.spriteY;
  spriteGap: number = Title.spriteGap;
  spriteWidth: number = Title.spriteWidth;
  spriteHeight: number = Title.spriteHeight;

  static spriteCreditX = 149;
  static spriteCreditY = 178;
  static spriteCreditWidth = 95;
  static spriteCreditHeight = 7;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    const scale = this.scale(Title.spriteWidth);

    this.width = Title.spriteWidth * scale;
    this.height = Title.spriteHeight * scale;

    this.creditWidth = Title.spriteCreditWidth * scale;
    this.creditHeight = Title.spriteCreditHeight * scale;

    this.x = this.centerX(
      this.width + this.spriteGap + Bird.getStaticWidth(canvasWidth)
    );
    this.y = (0.8 / 3) * canvasHeight;

    this.creditX = this.centerX(this.creditWidth);
    this.creditY = (2.8 / 3) * canvasHeight;

    this.birdSpriteX = 0;
    this.maxY = this.y;
    this.vy = 0;
  }

  centerX(width: number) {
    return (this.canvasWidth - width) / 2;
  }

  scale(width: number) {
    return (
      (this.canvasWidth - 2 * (Title.marginPercentage * this.canvasWidth)) /
      width
    );
  }

  draw(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    frame: number,
    GAME_SPEED: number
  ) {
    // Title
    ctx.drawImage(
      image,
      this.spriteX,
      this.spriteY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    if (this.birdSpriteX >= Bird.spriteFrame - 1) this.birdSpriteX = 0;
    if (frame % GAME_SPEED == 0) this.birdSpriteX++;

    // Bird beside the title
    Bird.drawStatic(
      ctx,
      this.canvasWidth,
      image,
      this.birdSpriteX,
      this.x + this.width + this.spriteGap,
      this.y + Bird.spriteHeight
    );

    // Credit text
    ctx.drawImage(
      image,
      Title.spriteCreditX,
      Title.spriteCreditY,
      Title.spriteCreditWidth,
      Title.spriteCreditHeight,
      this.creditX,
      this.creditY,
      this.creditWidth,
      this.creditHeight
    );
  }

  update(frame: number) {
    let sinus = Math.sin(frame * 0.1) * 5;
    if (this.y >= this.maxY + sinus) {
      this.y = this.maxY + sinus;
      this.vy = 0;
    } else {
      this.vy += 0.9;
      this.vy *= 0.8;
      this.y += this.vy;
    }
  }
}
