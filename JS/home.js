//write hello+username in the home page
let i = 0;
let userName = localStorage.getItem("userName");
let txt = `Hello ${userName.charAt(0).toUpperCase() + userName.slice(1)}`;
let speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("text").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

addEventListener("load", () => {
  typeWriter();
});
