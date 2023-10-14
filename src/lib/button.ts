import { Misc } from "./misc";

export class Button {
  static buttonList: { [key: string]: Sprite } = {
    pause: {
      spriteX: 0,
      spriteY: 332,
      spriteWidth: 13,
      spriteHeight: 14,
    },
    play: {
      spriteX: 18,
      spriteY: 332,
      spriteWidth: 13,
      spriteHeight: 14,
    },
    menu: {
      spriteX: 0,
      spriteY: 351,
      spriteWidth: 40,
      spriteHeight: 14,
    },
    ok: {
      spriteX: 45,
      spriteY: 351,
      spriteWidth: 40,
      spriteHeight: 14,
    },
    start: {
      spriteX: 90,
      spriteY: 351,
      spriteWidth: 40,
      spriteHeight: 14,
    },
    score: {
      spriteX: 135,
      spriteY: 351,
      spriteWidth: 40,
      spriteHeight: 14,
    },
    share: {
      spriteX: 180,
      spriteY: 351,
      spriteWidth: 40,
      spriteHeight: 14,
    },
  };

  button: Sprite;
  scale: number;
  IMAGE: HTMLImageElement;
  width: number;
  height: number;
  x: number;
  y: number;
  name: string;

  onclick: (screen: Screens) => void;

  constructor(
    canvas: HTMLCanvasElement,
    IMAGE: HTMLImageElement,
    name: string,
    x: number,
    y: number,
    onclick: (screens: Screens) => void,
    fromRight: boolean = false
  ) {
    this.IMAGE = IMAGE;
    this.name = name;

    this.button = Button.buttonList[name];
    this.scale = Misc.getScale(canvas.width);

    this.width = this.button.spriteWidth * this.scale;
    this.height = this.button.spriteHeight * this.scale;

    this.x = fromRight ? x - this.width : x;
    this.y = y;
    this.onclick = onclick;
  }

  getButtonCoordinates() {
    return {
      x1: this.x,
      y1: this.y,
      x2: this.x + this.width,
      y2: this.y + this.height,
    };
  }

  isInside(x: number, y: number) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.IMAGE,
      this.button.spriteX,
      this.button.spriteY,
      this.button.spriteWidth,
      this.button.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
