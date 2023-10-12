import { Bird } from "./bird";
import { Button } from "./button";
import { Misc } from "./misc";
import { Title } from "./title";

export class TitleScreen {
  x: number;
  y: number;
  creditX: number;
  creditY: number;

  creditWidth: number;
  creditHeight: number;

  canvasWidth: number;
  canvasHeight: number;

  birdSpriteX: number;
  maxY: number;
  vy: number;

  static spriteGap = 5;
  static marginPercentage = 0.15;
  static grid = 12;

  spriteGap: number = TitleScreen.spriteGap;
  scale: number;
  width: number;

  static spriteCreditX = 149;
  static spriteCreditY = 178;
  static spriteCreditWidth = 95;
  static spriteCreditHeight = 7;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    const title = Title.getCenterX("title", canvasWidth);
    this.scale = Misc.getScale(canvasWidth);
    this.width = title.width * title.scale;

    this.creditWidth = TitleScreen.spriteCreditWidth * title.scale;
    this.creditHeight = TitleScreen.spriteCreditHeight * title.scale;

    this.x = title.x - Bird.getStaticWidth(canvasWidth) / 2;
    this.y = (3 / TitleScreen.grid) * canvasHeight;

    this.creditX = this.centerX(this.creditWidth);
    this.creditY = (11 / TitleScreen.grid) * canvasHeight;

    this.birdSpriteX = 0;
    this.maxY = this.y;
    this.vy = 0;
  }

  centerX(width: number) {
    return (this.canvasWidth - width) / 2;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    IMAGE: HTMLImageElement,
    frame: number,
    GAME_SPEED: number
  ) {
    // Title
    Title.draw("title", ctx, IMAGE, this.x, this.y, this.canvasWidth, false);

    if (this.birdSpriteX >= Bird.spriteFrame - 1) this.birdSpriteX = 0;
    if (frame % GAME_SPEED == 0) this.birdSpriteX++;

    // Bird beside the title
    Bird.drawStatic(
      ctx,
      this.canvasWidth,
      IMAGE,
      this.birdSpriteX,
      this.x + this.width + this.spriteGap,
      this.y + Bird.spriteHeight
    );

    // Credit text
    ctx.drawImage(
      IMAGE,
      TitleScreen.spriteCreditX,
      TitleScreen.spriteCreditY,
      TitleScreen.spriteCreditWidth,
      TitleScreen.spriteCreditHeight,
      this.creditX,
      this.creditY,
      this.creditWidth,
      this.creditHeight
    );

    // Buttons
    Button.draw(
      "start",
      ctx,
      IMAGE,
      this.canvasWidth * (2 / TitleScreen.grid),
      this.canvasHeight * (9 / TitleScreen.grid),
      this.scale
    );

    // Buttons
    Button.draw(
      "score",
      ctx,
      IMAGE,
      this.canvasWidth * (10 / TitleScreen.grid),
      this.canvasHeight * (9 / TitleScreen.grid),
      this.scale,
      true
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
