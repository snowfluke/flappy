import { Misc } from "./misc";

type title = {
  spriteX: number;
  spriteY: number;
  spriteWidth: number;
  spriteHeight: number;
};

export class Title {
  static marginPercentage: number = 0.15;
  static titleList: { [key: string]: title } = {
    ready: {
      spriteX: 210,
      spriteY: 382,
      spriteWidth: 100,
      spriteHeight: 22,
    },
    over: {
      spriteX: 105,
      spriteY: 382,
      spriteWidth: 100,
      spriteHeight: 22,
    },
    title: {
      spriteX: 0,
      spriteY: 382,
      spriteWidth: 100,
      spriteHeight: 22,
    },
  };

  static getCenterX(name: string, canvasWidth: number) {
    const title = Title.titleList[name];
    const scale = Misc.getScale(canvasWidth);

    return {
      scale,
      width: title.spriteWidth,
      x: (canvasWidth - title.spriteWidth * scale) / 2,
    };
  }

  static draw(
    name: string,
    ctx: CanvasRenderingContext2D,
    IMAGE: HTMLImageElement,
    x: number,
    y: number,
    canvasWidth: number,
    centering: boolean = true
  ) {
    const title = Title.titleList[name];
    const center = this.getCenterX(name, canvasWidth);

    ctx.drawImage(
      IMAGE,
      title.spriteX,
      title.spriteY,
      title.spriteWidth,
      title.spriteHeight,
      centering ? center.x : x,
      y,
      title.spriteWidth * center.scale,
      title.spriteHeight * center.scale
    );
  }
}
