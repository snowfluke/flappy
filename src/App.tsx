import { onMount } from "solid-js";
import { TitleScreen } from "./lib/title-screen";
import { Background } from "./lib/background";
import { GameScreen } from "./lib/game-screen";

export const state: State = {
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

function App() {
  const ASPECT_RATIO = 184 / 256;
  const FPS = 7;
  const IMAGE = new Image();

  IMAGE.src = "/spritesheet.png";

  let canvas: HTMLCanvasElement;
  let frame = 0;

  state.highestScore = localStorage.getItem("hs") || "0";

  onMount(() => {
    if (window.innerWidth / window.innerHeight > ASPECT_RATIO) {
      canvas.height = window.innerHeight;
      canvas.width = Math.round(window.innerHeight * ASPECT_RATIO);
    } else {
      canvas.width = window.innerWidth;
      canvas.height = Math.round(window.innerWidth / ASPECT_RATIO);
    }

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
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      background.update(frame);
      background.draw(ctx);

      screens[state.currentScreen].render(state);

      frame++;

      if (state.playState == "stop") {
        console.log(state);

        let prevHs = localStorage.getItem("hs") || "0";
        if (parseInt(prevHs) < parseInt(state.score)) {
          localStorage.setItem("hs", state.score);
          state.highestScore = state.score;
        }
        return;
      }
      requestAnimationFrame(animate);
    };
    animate();

    canvas.addEventListener("click", (e) => {
      if (!state.buttons.length) return;
      for (let i = 0; i < state.buttons.length; i++) {
        if (
          state.buttons[i].isInside(e.offsetX, e.offsetY) &&
          state.buttons[i].name !== state.playState
        ) {
          state.buttons[i].onclick(screens);
        }
      }
    });
  });

  return <canvas ref={canvas!} />;
}

export default App;
