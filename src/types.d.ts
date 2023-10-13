type Sprite = {
  spriteX: number;
  spriteY: number;
  spriteWidth: number;
  spriteHeight: number;
};

type screenList = ["title", "game"];
type playState = ["init", "play", "pause", "over"];

type State = {
  score: string;
  highestScore: string;
  currentScreen: screenList[number];
  playState: playState[number];
  incScore: () => void;
  setPlayState: (state: playState[number]) => void;
};

type Screens = {
  [key in screenList[number]]?: any;
};
