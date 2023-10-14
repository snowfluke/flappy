import { state } from "../App";
import { Bird } from "./bird";
import { Button } from "./button";
import { Misc } from "./misc";
import { Title } from "./title";

export class TitleScreen {
  static spriteGap = 5;
  static marginPercentage = 0.15;
  static grid = 12;

  static spriteCreditX = 149;
  static spriteCreditY = 178;
  static spriteCreditWidth = 95;
  static spriteCreditHeight = 7;

  IMAGE: HTMLImageElement;
  FPS: number;

  x: number;
  y: number;
  creditX: number;
  creditY: number;

  creditWidth: number;
  creditHeight: number;

  canvasWidth: number;
  canvasHeight: number;

  birdSpriteX: number = 0;
  maxY: number;
  vy: number = 0;

  spriteGap: number = TitleScreen.spriteGap;
  scale: number;
  width: number;

  buttons: Button[] = [];

  constructor(canvas: HTMLCanvasElement, IMAGE: HTMLImageElement, FPS: number) {
    this.IMAGE = IMAGE;
    this.FPS = FPS;

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    const title = Title.getCenterX("title", this.canvasWidth);
    this.scale = Misc.getScale(this.canvasWidth);
    this.width = title.width * title.scale;

    this.creditWidth = TitleScreen.spriteCreditWidth * title.scale;
    this.creditHeight = TitleScreen.spriteCreditHeight * title.scale;

    this.x = title.x - Bird.getStaticWidth(this.canvasWidth) / 2;
    this.y = (3 / TitleScreen.grid) * this.canvasHeight;

    this.creditX = this.centerX(this.creditWidth);
    this.creditY = (11 / TitleScreen.grid) * this.canvasHeight;

    this.maxY = this.y;
    this.buttons = [
      new Button(
        canvas,
        IMAGE,
        "start",
        this.canvasWidth * (2 / TitleScreen.grid),
        this.canvasHeight * (9 / TitleScreen.grid),
        (screens: Screens) => {
          state.toScreen("game");
          state.buttons = screens["game"].buttons;
        }
      ),

      new Button(
        canvas,
        IMAGE,
        "score",
        this.canvasWidth * (10 / TitleScreen.grid),
        this.canvasHeight * (9 / TitleScreen.grid),
        () => {
          console.log(state.highestScore);
        },
        true
      ),
    ];
  }

  centerX(width: number) {
    return (this.canvasWidth - width) / 2;
  }

  getAllButtons() {
    return this.buttons;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Title Flappy Bird
    Title.draw(
      "title",
      ctx,
      this.IMAGE,
      this.x,
      this.y,
      this.canvasWidth,
      false
    );

    // Bird beside the title
    Bird.drawStatic(
      ctx,
      this.canvasWidth,
      this.IMAGE,
      this.birdSpriteX,
      this.x + this.width + this.spriteGap,
      this.y + Bird.spriteHeight
    );

    // Buttons
    this.buttons.forEach((button) => button.draw(ctx));

    // Credits text
    ctx.drawImage(
      this.IMAGE,
      TitleScreen.spriteCreditX,
      TitleScreen.spriteCreditY,
      TitleScreen.spriteCreditWidth,
      TitleScreen.spriteCreditHeight,
      this.creditX,
      this.creditY,
      this.creditWidth,
      this.creditHeight
    );
  }

  update(frame: number) {
    let sinus = Math.sin(frame * 0.1) * 5;

    if (this.birdSpriteX >= Bird.spriteFrame - 1) this.birdSpriteX = 0;
    if (frame % this.FPS == 0) this.birdSpriteX++;

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
