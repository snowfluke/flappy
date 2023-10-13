import { Misc } from "./misc";

export class Score {
  static marginPercentage: number = 0.15;
  static spriteGap: number = 5;

  static scoreSprite: { [key: string]: Sprite } = {
    uppercase: {
      spriteX: 0,
      spriteY: 290,
      spriteWidth: 7,
      spriteHeight: 10,
    },
    lowercase: {
      spriteX: 0,
      spriteY: 278,
      spriteWidth: 6,
      spriteHeight: 7,
    },
  };

  static getStaticScoreWidth(number: string) {
    return number.length > 7
      ? this.scoreSprite["lowercase"].spriteWidth
      : this.scoreSprite["uppercase"].spriteWidth;
  }

  static draw(
    ctx: CanvasRenderingContext2D,
    IMAGE: HTMLImageElement,
    x: number,
    y: number,
    canvasWidth: number,
    number: string
  ) {
    const score =
      number.length > 7
        ? Score.scoreSprite["lowercase"]
        : Score.scoreSprite["uppercase"];
    const scale = Misc.getScale(canvasWidth);

    for (let i = 0; i < number.length; i++) {
      ctx.drawImage(
        IMAGE,
        score.spriteX +
          (score.spriteWidth + Score.spriteGap) * parseInt(number[i]),
        score.spriteY,
        score.spriteWidth,
        score.spriteHeight,
        x + i * score.spriteWidth * scale + i * Score.spriteGap,
        y,
        score.spriteWidth * scale,
        score.spriteHeight * scale
      );
    }
  }
}
