import { audio, state } from "../App";
import { Misc } from "./misc";
export class Obstacle {
  static top: Sprite = {
    spriteX: 308,
    spriteY: 0,
    spriteWidth: 26,
    spriteHeight: 135,
  };

  static bottom: Sprite = {
    spriteX: 340,
    spriteY: 0,
    spriteWidth: 26,
    spriteHeight: 121,
  };

  static space = 50;

  IMAGE: HTMLImageElement;
  canvasWidth: number;
  canvasHeight: number;
  scale: number;
  width: number;
  counted: boolean = false;
  hit: boolean = false;

  x: number;
  top: number;
  bottom: number;
  reasonableHeight: number;

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    IMAGE: HTMLImageElement,
    baseX: number
  ) {
    this.IMAGE = IMAGE;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.scale = Misc.getScale(this.canvasWidth);

    this.x = this.canvasWidth;
    const availableHeight = canvasHeight - baseX;
    this.reasonableHeight =
      Math.random() * availableHeight * (2 / 3) + Obstacle.space;
    this.top = this.reasonableHeight - Obstacle.top.spriteHeight * this.scale;
    this.bottom = this.reasonableHeight + Obstacle.space * this.scale;
    this.width = Obstacle.bottom.spriteWidth * this.scale;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.IMAGE,
      Obstacle.top.spriteX,
      Obstacle.top.spriteY,
      Obstacle.top.spriteWidth,
      Obstacle.top.spriteHeight,
      this.x,
      this.top,
      this.width,
      Obstacle.top.spriteHeight * this.scale
    );

    ctx.drawImage(
      this.IMAGE,
      Obstacle.bottom.spriteX,
      Obstacle.bottom.spriteY,
      Obstacle.bottom.spriteWidth,
      Obstacle.bottom.spriteHeight,
      this.x,
      this.bottom,
      this.width,
      Obstacle.bottom.spriteHeight * this.scale
    );
  }

  update(ctx: CanvasRenderingContext2D, FPS: number) {
    if (!["pause", "stop"].includes(state.playState)) {
      this.x -= FPS;
    }

    this.draw(ctx);
    if (state.playState == "over") return;
    if (state.birdPos.x > this.x && state.birdPos.x < this.x + this.width) {
      if (
        state.birdPos.y1 < this.reasonableHeight ||
        state.birdPos.y2 > this.bottom
      ) {
        audio.hit();
        state.setPlayState("over");

        // set timeout 1s
        setTimeout(() => {
          audio.die();
        }, 250);
      }
    }

    if (!this.counted && state.birdPos.x > this.x + this.width) {
      state.incScore();
      this.counted = true;
      audio.point();
    }
  }
}
