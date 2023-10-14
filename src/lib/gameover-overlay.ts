import { state } from "../App";
import { Button } from "./button";
import { Misc } from "./misc";
import { Score } from "./score";
import { Title } from "./title";

export class GameOver {
  static grid: number = 12;
  static spriteGap: number = 5;

  buttons: Button[] = [];
  IMAGE: HTMLImageElement;
  canvasWidth: number;
  canvasHeight: number;

  constructor(canvas: HTMLCanvasElement, IMAGE: HTMLImageElement) {
    this.IMAGE = IMAGE;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.buttons = [
      new Button(
        canvas,
        IMAGE,
        "ok",
        canvas.width * (2 / GameOver.grid),
        canvas.height * (9 / GameOver.grid),
        (screens: Screens) => {
          console.log(screens, state);
          window.location.reload();
        }
      ),

      new Button(
        canvas,
        IMAGE,
        "share",
        canvas.width * (10 / GameOver.grid),
        canvas.height * (9 / GameOver.grid),
        () => {
          const link =
            "https://twitter.com/intent/tweet?text=" +
            encodeURIComponent(
              "I scored " +
                state.score +
                " in Flappy Bird! Beat that! https://flappy-zeta.vercel.app - Powered by @akasha_seeker #typescript #html5"
            );
          const share = window.open(
            link,
            "name",
            "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=640, height=380, top="
          );
          share && share.focus();
        },
        true
      ),
    ];
  }

  getAllButtons() {
    return this.buttons;
  }

  draw(ctx: CanvasRenderingContext2D, onlyScoreboard: boolean = false) {
    const localState = {
      titleY: this.canvasHeight * (2.9 / GameOver.grid),
      titleHeight: Title.getDimension("over").height,
      scale: Misc.getScale(this.canvasWidth),
    };

    if (!onlyScoreboard) {
      Title.draw(
        "over",
        ctx,
        this.IMAGE,
        0,
        localState.titleY,
        this.canvasWidth
      );
      this.buttons.forEach((button) => button.draw(ctx));
    }

    Score.drawScoreboard(
      ctx,
      this.IMAGE,
      localState.titleHeight * localState.scale +
        localState.titleY +
        GameOver.spriteGap * localState.scale,
      this.canvasWidth,
      onlyScoreboard
    );
  }
}
