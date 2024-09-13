import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";

const canvasElement = document.getElementById("canvas");
const canvasElement2 = document.getElementById("canvas2");
const animationModal = document.getElementById("animation_modal");

//login animation
export async function triggerSignIn() {
  new DotLottie({
    autoplay: true,
    canvas: canvasElement,
    src: "./../assets/animation/sign_in.lottie", //lottie or .json file
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

//sign up animation

//trigger animation
function triggerSignUp() {
  return new DotLottie({
    autoplay: true,
    canvas: canvasElement2,
    src: "./../assets/animation/sign_up.lottie", //lottie or .json file
  });
}

export function triggerAnimationModal() {
  const myModal = new bootstrap.Modal(animationModal);
  return new Promise((resolve) => {
    myModal.show();

    document
      .getElementById("animation_modal")
      .addEventListener("shown.bs.modal", () => {
        triggerSignUp().play();
      });

    setTimeout(() => {
      myModal.hide();
      //clear canvas element
      const context = canvasElement2.getContext("2d");
      context.clearRect(0, 0, canvasElement2.width, canvasElement2.height);
      resolve();
    }, 3500);
  });
}
