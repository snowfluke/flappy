import { Bird } from "./bird";
import { Misc } from "./misc";
import { Title } from "./title";

export class GameScreen {
  play: boolean;

  canvasWidth: number;
  canvasHeight: number;

  static grid: number = 12;
  birdSpriteX: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.play = false;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.birdSpriteX = 0;
  }

  draw(
    bird: Bird,
    ctx: CanvasRenderingContext2D,
    IMAGE: HTMLImageElement,
    frame: number,
    GAME_SPEED: number
  ) {
    if (this.birdSpriteX >= Bird.spriteFrame - 1) this.birdSpriteX = 0;
    if (frame % GAME_SPEED == 0) this.birdSpriteX++;

    Bird.drawStatic(
      ctx,
      this.canvasWidth,
      IMAGE,
      this.birdSpriteX,
      bird.x,
      bird.y
    );

    Title.draw(
      "ready",
      ctx,
      IMAGE,
      0,
      this.canvasHeight * (2.39 / GameScreen.grid),
      this.canvasWidth
    );

    Misc.draw(
      "tutorial",
      ctx,
      IMAGE,
      this.canvasWidth / 2,
      this.canvasHeight * (5 / GameScreen.grid),
      this.canvasWidth
    );
  }

  update() {}

  start() {}

  pause() {}
}
