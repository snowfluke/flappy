type Sprite = {
  spriteX: number;
  spriteY: number;
  spriteWidth: number;
  spriteHeight: number;
};

type screenList = ["title", "game"];
type playState = ["init", "play", "pause", "over", "stop"];
type birdPos = {
  x: number;
  y1: number;
  y2: number;
};

type State = {
  score: string;
  highestScore: string;
  currentScreen: screenList[number];
  playState: playState[number];
  birdPos: birdPos;
  buttons: Button[];
  setBirdPos: (birdPos: birdPos) => void;
  incScore: () => void;
  setPlayState: (state: playState[number]) => void;
  toScreen: (screenName: screenList[number]) => void;
};

type Screens = {
  [key in screenList[number]]?: any;
};
