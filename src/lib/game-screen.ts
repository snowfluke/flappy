import { state } from "../App";
import { Bird } from "./bird";
import { Button } from "./button";
import { Misc } from "./misc";
import { Score } from "./score";
import { Title } from "./title";

export class GameScreen {
  static grid: number = 12;
  static collisionMargin = 5;

  IMAGE: HTMLImageElement;
  FPS: number;

  bird: Bird;
  baseX: number;
  birdSpriteX: number = 0;

  canvasWidth: number;
  canvasHeight: number;
  scale: number;

  listener: (e: KeyboardEvent) => void;
  touchListener: (e: TouchEvent) => void;

  buttons: Button[];
  inited: Boolean;
  activeButton: Button;
  prevPlaystate: playState[number] = "init";

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

    this.bird = new Bird(canvas, IMAGE, FPS, baseX);

    this.baseX = baseX;
    this.scale = Misc.getScale(this.canvasWidth);

    this.buttons = [
      new Button(
        canvas,
        IMAGE,
        "pause",
        this.canvasWidth * (1 / GameScreen.grid),
        this.canvasHeight * (0.5 / GameScreen.grid),
        () => {
          if (state.playState == "stop" || state.playState == "over") return;
          state.setPlayState("pause");

          this.activeButton = this.buttons[1];
          state.buttons = [this.activeButton];
        }
      ),
      new Button(
        canvas,
        IMAGE,
        "play",
        this.canvasWidth * (1 / GameScreen.grid),
        this.canvasHeight * (0.5 / GameScreen.grid),
        () => {
          if (state.playState == "stop" || state.playState == "over") return;
          if (this.prevPlaystate == "init") {
            state.setPlayState("init");
          } else {
            state.setPlayState("play");
          }

          this.activeButton = this.buttons[0];
          state.buttons = [this.activeButton];
        }
      ),
    ];

    this.activeButton = this.buttons[0];
    this.inited = false;

    this.listener = (e: KeyboardEvent) => {
      if (e.code === "Space" && state.currentScreen == "game") {
        if (state.playState != "init" && state.playState != "play") return;
        if (state.playState == "init") {
          state.setPlayState("play");
          this.inited = true;
          this.prevPlaystate = "play";
        }

        this.bird.jump();
      }
    };

    this.touchListener = (e) => {
      if (e.type === "touchstart" && state.currentScreen == "game") {
        if (state.playState != "init" && state.playState != "play") return;
        if (state.playState == "init") {
          state.setPlayState("play");
          this.inited = true;
          this.prevPlaystate = "play";
        }

        this.bird.jump();
      }
    };

    window.addEventListener("keydown", this.listener);
    window.addEventListener("touchstart", this.touchListener);
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Normal bird
    this.bird.draw(ctx);

    if (!this.inited) {
      // Title get ready
      Title.draw(
        "ready",
        ctx,
        this.IMAGE,
        0,
        this.canvasHeight * (2.39 / GameScreen.grid),
        this.canvasWidth
      );

      // Gesture hint
      Misc.draw(
        "tutorial",
        ctx,
        this.IMAGE,
        this.canvasWidth / 2,
        this.canvasHeight * (5 / GameScreen.grid),
        this.canvasWidth
      );
    }

    // Button
    if (state.playState !== "over" && state.playState !== "stop") {
      this.activeButton.draw(ctx);

      // Score
      Score.draw(
        ctx,
        this.IMAGE,
        this.canvasWidth / 2 - Score.getScoreWidth(state.score),
        this.canvasHeight * (0.5 / GameScreen.grid),
        this.canvasWidth,
        state.score
      );
    }
  }

  getAllButtons() {
    return [this.activeButton];
  }

  update(frame: number, state: State) {
    if (state.playState === "init") return this.bird.update(frame, true);
    this.bird.update(frame);

    state.setBirdPos({
      x: this.bird.x + this.bird.width - GameScreen.collisionMargin,
      y1: this.bird.y - GameScreen.collisionMargin,
      y2: this.bird.y + this.bird.height - GameScreen.collisionMargin,
    });
  }
}
