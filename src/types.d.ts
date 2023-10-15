type Sprite = {
  spriteX: number;
  spriteY: number;
  spriteWidth: number;
  spriteHeight: number;
};

type screenList = ["title", "game"];
type playState = ["init", "score", "play", "pause", "over", "stop"];
type birdPos = {
  x: number;
  y1: number;
  y2: number;
};

type Audios = {
  [key: string]: () => void;
};

type DefaultState = {
  score: string;
  highestScore: string;
  currentScreen: screenList[number];
  playState: playState[number];
  birdPos: birdPos;
  buttons: Button[];
};
type State = DefaultState & {
  setBirdPos: (birdPos: birdPos) => void;
  incScore: () => void;
  setPlayState: (state: playState[number]) => void;
  toScreen: (screenName: screenList[number]) => void;
};

type Screens = {
  [key in screenList[number]]?: any;
};
