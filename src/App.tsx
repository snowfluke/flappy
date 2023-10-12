import { onMount } from "solid-js";
import { Bird } from "./lib/bird";
import { Title } from "./lib/title-screen";
import { Background } from "./lib/background";

function App() {
  let canvas: HTMLCanvasElement;
  onMount(() => {
    const ASPECT_RATIO = 184 / 256;
    const GAME_SPEED = 7;
    // const SCORE = 0;
    const IMAGE = new Image();
    IMAGE.src = "/spritesheet.png";

    const resizeCanvas = () => {
      const targetWidth = window.innerWidth;
      const targetHeight = window.innerHeight;
      let canvasWidth, canvasHeight;

      if (targetWidth / targetHeight > ASPECT_RATIO) {
        canvasHeight = targetHeight;
        canvasWidth = targetHeight * ASPECT_RATIO;
      } else {
        canvasWidth = targetWidth;
        canvasHeight = targetWidth / ASPECT_RATIO;
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      let frame = 0;

      const ctx = canvas.getContext("2d")!;
      const bird = new Bird(canvas.width);
      const title = new Title(canvas.width, canvas.height);
      const background = new Background(canvas.width, canvas.height);
      const baseX = background.getBaseTop();

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // BACKGROUND
        // background.update(GAME_SPEED);
        background.draw(ctx, IMAGE);

        // TITLE
        // title.update(frame);
        // title.draw(ctx, IMAGE, frame, GAME_SPEED);

        // BIRD
        // bird.update(canvas.height, baseX);
        // bird.draw(ctx, IMAGE, frame, GAME_SPEED);

        frame++;
        requestAnimationFrame(animate);
      };
      animate();

      window.addEventListener("keydown", (e) => {
        if (e.code === "ArrowUp") {
          bird.jump();
        }
      });
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  });

  return <canvas ref={canvas!} />;
}

export default App;
