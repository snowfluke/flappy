import { state } from "../App";
import { Misc } from "./misc";

export class Score {
  static marginPercentage: number = 0.15;
  static spriteGap: number = 5;
  static grid: number = 12;

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

  static scoreBoard: Sprite = {
    spriteX: 149,
    spriteY: 61,
    spriteWidth: 113,
    spriteHeight: 58,
  };

  static medalList: Sprite[] = [
    {
      spriteX: 0,
      spriteY: 305,
      spriteWidth: 22,
      spriteHeight: 22,
    },
    {
      spriteX: 27,
      spriteY: 305,
      spriteWidth: 22,
      spriteHeight: 22,
    },
    {
      spriteX: 54,
      spriteY: 305,
      spriteWidth: 22,
      spriteHeight: 22,
    },
    {
      spriteX: 81,
      spriteY: 305,
      spriteWidth: 22,
      spriteHeight: 22,
    },
  ];

  static getStaticScoreWidth(number: string) {
    return number.length > 7
      ? this.scoreSprite["lowercase"].spriteWidth
      : this.scoreSprite["uppercase"].spriteWidth;
  }

  static drawScoreboard(
    ctx: CanvasRenderingContext2D,
    IMAGE: HTMLImageElement,
    y: number,
    canvasWidth: number,
    medalHs: boolean = false
  ) {
    const scale = Misc.getScale(canvasWidth);
    const width = Score.scoreBoard.spriteWidth * scale;
    const height = Score.scoreBoard.spriteHeight * scale;

    const scoreBoardX = (canvasWidth - width) / 2;
    const paddingHorizontal = (1.25 / Score.grid) * width;
    const paddingScoreTop = (3.5 / Score.grid) * height;
    const paddingScoreBottom = (8 / Score.grid) * height;

    ctx.drawImage(
      IMAGE,
      Score.scoreBoard.spriteX,
      Score.scoreBoard.spriteY,
      Score.scoreBoard.spriteWidth,
      Score.scoreBoard.spriteHeight,
      scoreBoardX,
      y,
      width,
      height
    );

    Score.draw(
      ctx,
      IMAGE,
      width +
        scoreBoardX -
        Score.getAccurateScoreWidth(state.score, scale) -
        paddingHorizontal,
      y + paddingScoreTop,
      canvasWidth,
      state.score
    );

    Score.draw(
      ctx,
      IMAGE,
      width +
        scoreBoardX -
        Score.getAccurateScoreWidth(state.highestScore, scale) -
        paddingHorizontal,
      y + paddingScoreBottom,
      canvasWidth,
      state.highestScore
    );

    let medalType = medalHs
      ? Score.getMedalCategory(state.highestScore)
      : Score.getMedalCategory(state.score);
    if (medalType !== -1) {
      let medal = Score.medalList[medalType];

      ctx.drawImage(
        IMAGE,
        medal.spriteX,
        medal.spriteY,
        medal.spriteWidth,
        medal.spriteHeight,
        scoreBoardX + paddingHorizontal + 5,
        y + (4.4 / Score.grid) * height,
        medal.spriteWidth * scale,
        medal.spriteHeight * scale
      );
    }
  }

  static getMedalCategory(score: string) {
    let category = 0;
    const parsedScore = parseInt(score);

    switch (true) {
      case parsedScore > 50:
        category = 3;
        break;
      case parsedScore > 20:
        category = 2;
        break;
      case parsedScore > 10:
        category = 1;
        break;
      case parsedScore > 5:
        category = 0;
        break;
      default:
        category = -1;
        // Handle other cases as needed
        break;
    }

    return category;
  }

  static getScoreWidth = (score: string) => {
    return (
      score.length * Score.getStaticScoreWidth(score) -
      (score.length - 1) * Score.spriteGap
    );
  };

  static getAccurateScoreWidth = (number: string, scale: number) => {
    const score =
      number.length > 7
        ? Score.scoreSprite["lowercase"]
        : Score.scoreSprite["uppercase"];

    let totalWidth = 0;

    for (let i = 1; i <= number.length; i++) {
      totalWidth += score.spriteWidth * scale + Score.spriteGap;
    }

    return totalWidth;
  };

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
