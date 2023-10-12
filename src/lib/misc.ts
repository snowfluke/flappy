type misc = {
  spriteX: number;
  spriteY: number;
  spriteWidth: number;
  spriteHeight: number;
};

export class Misc {
  static marginPercentage: number = 0.15;
  static miscList: { [key: string]: misc } = {
    tutorial: {
      spriteX: 149,
      spriteY: 124,
      spriteWidth: 39,
      spriteHeight: 49,
    },
  };

  static getScale(
    canvasWidth: number,
    scaleEst: number = 3.3,
    maxWidth: number = 479
  ) {
    return canvasWidth / (maxWidth / scaleEst);
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
    const misc = Misc.miscList[name];
    const scale = Misc.getScale(canvasWidth);

    ctx.drawImage(
      IMAGE,
      misc.spriteX,
      misc.spriteY,
      misc.spriteWidth,
      misc.spriteHeight,
      centering ? (canvasWidth - misc.spriteWidth) / 2 : x,
      y,
      misc.spriteWidth * scale,
      misc.spriteHeight * scale
    );
  }
}
