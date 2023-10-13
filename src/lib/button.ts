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

  static draw(
    name: string,
    ctx: CanvasRenderingContext2D,
    IMAGE: HTMLImageElement,
    x: number,
    y: number,
    scale: number,
    fromRight: boolean = false
  ) {
    const button = Button.buttonList[name];

    ctx.drawImage(
      IMAGE,
      button.spriteX,
      button.spriteY,
      button.spriteWidth,
      button.spriteHeight,
      fromRight ? x - button.spriteWidth * scale : x,
      y,
      button.spriteWidth * scale,
      button.spriteHeight * scale
    );
  }
}
