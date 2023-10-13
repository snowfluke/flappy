import { onMount } from "solid-js";
import { TitleScreen } from "./lib/title-screen";
import { Background } from "./lib/background";
import { GameScreen } from "./lib/game-screen";

function App() {
  const ASPECT_RATIO = 184 / 256;
  const FPS = 7;
  const IMAGE = new Image();

  IMAGE.src = "/spritesheet.png";

  let canvas: HTMLCanvasElement;
  let frame = 0;
  let state: State = {
    score: "0",
    highestScore: "0",
    currentScreen: "title",
    playState: "init",
    incScore: function () {
      this.score = (parseInt(this.score) + 1).toString();
    },
    setPlayState(state) {
      this.playState = state;
    },
  };

  let screens: Screens = {};

  onMount(() => {
    const resizeCanvas = () => {
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
      screens.title = (state: State) => {
        titleScreen.update(frame);
        titleScreen.draw(ctx);
      };

      const gameScreen = new GameScreen(
        canvas,
        IMAGE,
        FPS,
        state,
        background.getBaseTop()
      );
      screens.game = (state: State) => {
        gameScreen.update(frame);
        gameScreen.draw(ctx);
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        background.update();
        background.draw(ctx);

        screens[state.currentScreen](state);

        frame++;
        requestAnimationFrame(animate);
      };
      animate();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  });

  return <canvas ref={canvas!} />;
}

export default App;
