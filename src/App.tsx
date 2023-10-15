import { onMount } from "solid-js";
import { TitleScreen } from "./lib/title-screen";
import { Background } from "./lib/background";
import { GameScreen } from "./lib/game-screen";
import { GameOver } from "./lib/gameover-overlay";

function App() {
  const ASPECT_RATIO = 184 / 256;
  const FPS = 7;
  const IMAGE = new Image();

  IMAGE.src = "/spritesheet.png";

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const start = () => {
      if (window.innerWidth / window.innerHeight > ASPECT_RATIO) {
        canvas.height = window.innerHeight;
        canvas.width = Math.round(window.innerHeight * ASPECT_RATIO);
      } else {
        canvas.width = window.innerWidth;
        canvas.height = Math.round(window.innerWidth / ASPECT_RATIO);
      }

      let frame = 0;
      state.highestScore = localStorage.getItem("hs") || "0";

      const ctx = canvas.getContext("2d")!;
      const background = new Background(canvas, IMAGE, FPS);

      const titleScreen = new TitleScreen(canvas, IMAGE, FPS);
      screens.title = {
        render() {
          titleScreen.update(frame);
          titleScreen.draw(ctx);
        },
        buttons: titleScreen.getAllButtons(),
      };

      // init state buttons
      state.buttons = titleScreen.getAllButtons();

      const gameScreen = new GameScreen(
        canvas,
        IMAGE,
        FPS,
        background.getBaseTop()
      );
      screens.game = {
        render(state: State) {
          gameScreen.update(frame, state);
          gameScreen.draw(ctx);
        },
        buttons: gameScreen.getAllButtons(),
      };

      const gameOver = new GameOver(
        canvas,
        IMAGE,
        start,
        gameScreen.listener,
        gameScreen.touchListener
      );

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        background.update(frame);
        background.draw(ctx);

        screens[state.currentScreen].render(state);

        frame++;

        if (state.playState == "stop") {
          let prevHs = localStorage.getItem("hs") || "0";
          if (parseInt(prevHs) < parseInt(state.score)) {
            localStorage.setItem("hs", state.score);
            state.highestScore = state.score;
          }

          state.buttons = gameOver.getAllButtons();
          gameOver.draw(ctx);
          console.log("state", state);
          return;
        }

        if (state.playState == "score") {
          gameOver.draw(ctx, true);
        }
        requestAnimationFrame(animate);
      };
      animate();
    };

    start();

    canvas.addEventListener("click", (e) => {
      if (!state.buttons.length) return;

      for (let i = 0; i < state.buttons.length; i++) {
        if (
          state.buttons[i].isInside(e.offsetX, e.offsetY) &&
          state.buttons[i].name !== state.playState
        ) {
          state.buttons[i].onclick(screens);
          audio.swoosh();
        }
      }
    });
  });

  return <canvas ref={canvas!} />;
}

const defaultState: DefaultState = {
  score: "0",
  highestScore: "0",
  currentScreen: "title",
  playState: "init",
  birdPos: {
    x: 0,
    y1: 0,
    y2: 0,
  },
  buttons: [],
};

export const state: State = {
  ...defaultState,
  setBirdPos(birdPos: birdPos) {
    this.birdPos = birdPos;
  },
  incScore: function () {
    this.score = (parseInt(this.score) + 1).toString();
  },
  setPlayState(state) {
    this.playState = state;
  },
  toScreen(screenName: screenList[number]) {
    this.currentScreen = screenName;
  },
};

export const screens: Screens = {};

export const audio: Audios = {
  wing: () => {
    const audio = new Audio("/audio/wing.ogg");
    audio.play();
  },
  hit: () => {
    const audio = new Audio("/audio/hit.ogg");
    audio.play();
  },
  die: () => {
    const audio = new Audio("/audio/die.ogg");
    audio.play();
  },
  point: () => {
    const audio = new Audio("/audio/point.ogg");
    audio.play();
  },
  swoosh: () => {
    const audio = new Audio("/audio/swoosh.ogg");
    audio.play();
  },
};
export default App;
