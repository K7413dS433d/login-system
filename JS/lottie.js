import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";

const canvasElement = document.getElementById("canvas");
const canvasElement2 = document.getElementById("canvas2");
const animationModal = document.getElementById("animation_modal");

//trigger animation
function animationInstance(animationPath, element) {
  return new DotLottie({
    autoplay: true,
    canvas: element,
    src: animationPath, //lottie or .json file
  });
}

//clear canvas element
function clearCanvas(element) {
  const context = element.getContext("2d");
  context.clearRect(0, 0, element.width, element.height);
}

//login animation
export function triggerSignIn() {
  animationInstance(
    "./../assets/animation/sign_in.lottie",
    canvasElement
  ).play();
}

export function triggerWrong() {
  animationInstance("./../assets/animation/wrong.lottie", canvasElement).play();
}

export function clearLoginCanvas() {
  clearCanvas(canvasElement);
}

//sign up animation

export function triggerAnimationModal() {
  const myModal = new bootstrap.Modal(animationModal);
  return new Promise((resolve) => {
    myModal.show();

    document
      .getElementById("animation_modal")
      .addEventListener("shown.bs.modal", () => {
        animationInstance(
          "./../assets/animation/sign_up.lottie",
          canvasElement2
        ).play();
      });

    setTimeout(() => {
      myModal.hide();
      //clear canvas element
      clearCanvas(canvasElement2);
      resolve();
    }, 3500);
  });
}
