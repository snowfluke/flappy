import { state } from "../App";
import { Obstacle } from "./obstacle";

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

  obstacles: Obstacle[] = [];

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

  update(frame: number) {
    if (state.playState == "pause") return;
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

    if (
      frame % 100 == 0 &&
      state.playState == "play" &&
      state.currentScreen == "game"
    ) {
      if (this.obstacles.length > 5) this.obstacles.pop();

      this.obstacles.unshift(
        new Obstacle(this.width, this.height, this.IMAGE, this.baseHeight)
      );
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

    // Obstacles

    if (state.playState !== "init" && state.currentScreen == "game") {
      this.obstacles.forEach((obstacle: Obstacle) => {
        obstacle.update(ctx, this.GAME_SPEED);
      });
    }
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
