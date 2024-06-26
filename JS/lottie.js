import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";

const canvasElement = document.getElementById("canvas");

export async function triggerAcc() {
  new DotLottie({
    autoplay: true,
    canvas: canvasElement,
    src: "./../assets/animation/true.lottie", //lottie or .json file
  }).play();
}

export function triggerWrong() {
  new DotLottie({
    autoplay: true,
    canvas: canvasElement,
    src: "./../assets/animation/wrong.lottie", //lottie or .json file
  }).play();
}
export function pauseWrong() {
  canvasElement.style.opacity = "0";

  setTimeout(() => {
    new DotLottie({
      canvas: canvasElement,
      src: "./../assets/animation/wrong.lottie", //lottie or .json file
    }).pause();
    canvasElement.style.opacity = "1";
  }, 500);
}
