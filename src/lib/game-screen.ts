import { Bird } from "./bird";
import { Button } from "./button";
import { Misc } from "./misc";
import { Score } from "./score";
import { Title } from "./title";

export class GameScreen {
  static grid: number = 12;

  IMAGE: HTMLImageElement;
  FPS: number;

  bird: Bird;
  baseX: number;

  canvasWidth: number;
  canvasHeight: number;

  birdSpriteX: number = 0;
  scale: number;

  state: State;
  listener: void;

  constructor(
    canvas: HTMLCanvasElement,
    IMAGE: HTMLImageElement,
    FPS: number,
    STATE: State,
    baseX: number
  ) {
    this.IMAGE = IMAGE;
    this.FPS = FPS;
    this.state = STATE;

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.bird = new Bird(canvas, IMAGE, FPS, baseX);

    this.baseX = baseX;
    this.scale = Misc.getScale(this.canvasWidth);

    this.listener = window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowUp" && this.state.playState == "play") {
        this.bird.jump();
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Normal bird
    this.bird.draw(ctx);

    // if (this.state.playState == "init") {
    //   // Title get ready
    //   Title.draw(
    //     "ready",
    //     ctx,
    //     this.IMAGE,
    //     0,
    //     this.canvasHeight * (2.39 / GameScreen.grid),
    //     this.canvasWidth
    //   );

    //   // Gesture hint
    //   Misc.draw(
    //     "tutorial",
    //     ctx,
    //     this.IMAGE,
    //     this.canvasWidth / 2,
    //     this.canvasHeight * (5 / GameScreen.grid),
    //     this.canvasWidth
    //   );
    // }

    // Pause button
    Button.draw(
      "pause",
      ctx,
      this.IMAGE,
      this.canvasWidth * (1 / GameScreen.grid),
      this.canvasHeight * (0.5 / GameScreen.grid),
      this.scale
    );

    // Score
    Score.draw(
      ctx,
      this.IMAGE,
      this.canvasWidth / 2 -
        this.state.score.length * Score.getStaticScoreWidth(this.state.score) -
        (this.state.score.length - 1) * Score.spriteGap,
      this.canvasHeight * (0.5 / GameScreen.grid),
      this.canvasWidth,
      this.state.score
    );
  }

  update(frame: number) {
    if (this.state.playState === "init") return this.bird.update(frame, true);
    this.bird.update(frame);
  }
}
