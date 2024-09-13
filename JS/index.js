import * as lottie from "./lottie.js";

const card = document.querySelector(".card");
const buttons = document.querySelectorAll(".switch button");
const eyeIcon = document.querySelectorAll(".eye-icon");
const pass = document.querySelectorAll(".password input");
const popLeft = document.querySelectorAll(".pop-left");
const hasPop = document.querySelectorAll(".has-pop");
const signUpBtn = document.getElementById("sign-up");
const signInBtn = document.getElementById("sign-in");
const validIcon = {
  firstName: document.querySelector(".first-name div div i"),
  lastName: document.querySelector(".last-name div div i"),
  email: document.querySelector(".email div div i"),
  pass1: document.querySelector(".pass div div:nth-child(1) i"),
  pass2: document.querySelector(".pass div div:nth-child(2) i"),
  pass3: document.querySelector(".pass div div:nth-child(3) i"),
  rePass: document.querySelector(".re-pass div div i"),
};

const inputs = {
  signInEmail: document.getElementById("signInEmail"),
  signInPassword: document.getElementById("signInPassword"),
  firstName: document.getElementById("fName"),
  lastName: document.getElementById("lName"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  confirmPassword: document.getElementById("confirm-password"),
};

let data = JSON.parse(localStorage.getItem("data"))
  ? JSON.parse(localStorage.getItem("data"))
  : [];

//flip card
function flip() {
  card.classList.toggle("flip");
  buttons[1].classList.toggle("active");
  buttons[0].classList.toggle("active");
}

buttons[1].addEventListener("click", function () {
  flip();
});

buttons[0].addEventListener("click", function () {
  flip();
});

//eye icon
for (let i = 0; i < eyeIcon.length; i++) {
  eyeIcon[i].addEventListener("click", function () {
    eyeIcon[i].classList.toggle("fa-eye-slash");
    eyeIcon[i].classList.toggle("fa-eye");
    if (eyeIcon[i].classList.contains("fa-eye")) {
      pass[i].setAttribute("type", "text");
    } else {
      pass[i].setAttribute("type", "password");
    }
  });
}

//pop left
for (let i = 0; i < hasPop.length; i++) {
  hasPop[i].addEventListener("focus", function (e) {
    popLeft[i].style.opacity = "1";
  });
  hasPop[i].addEventListener("blur", function () {
    popLeft[i].style.opacity = "0";
  });
}

// validation
function nameIsValid(firstName) {
  let reg = /^([a-z]|[A-Z]){3,}$/;
  return reg.test(firstName);
}

function emailIsValid(email) {
  let reg = /^([a-z]|[A-Z]|[0-9])+@gmail.com$/;
  return reg.test(email);
}

//password
function hasSymbol(pass) {
  let symbol = /[\$\*\+\%#@]+/;
  return symbol.test(pass);
}

function hasUppercase(pass) {
  let uppercase = /[A-Z]+/;
  return uppercase.test(pass);
}

function bigger8(pass) {
  return pass.length >= 8;
}

function passwordIsValid(pass) {
  return hasSymbol(pass) && bigger8(pass) && hasUppercase(pass);
}

function passwordConfirmation(pass) {
  return inputs.confirmPassword.value == pass && passwordIsValid(pass);
}

function SignUpIsValid() {
  let fname = inputs.firstName.value;
  let lname = inputs.lastName.value;
  let email = inputs.email.value;
  let password = inputs.password.value;
  return (
    passwordIsValid(password) &&
    emailIsValid(email) &&
    nameIsValid(fname) &&
    nameIsValid(lname) &&
    passwordConfirmation(password)
  );
}

inputs.firstName.addEventListener("input", () => {
  validIcon.firstName.classList.remove("text-danger");
  if (nameIsValid(inputs.firstName.value)) {
    validIcon.firstName.classList.add("text-success");
    inputs.firstName.style.boxShadow = "none";
  } else {
    validIcon.firstName.classList.remove("text-success");
  }
});

inputs.lastName.addEventListener("input", () => {
  validIcon.lastName.classList.remove("text-danger");
  if (nameIsValid(inputs.lastName.value)) {
    validIcon.lastName.classList.add("text-success");
  } else {
    validIcon.lastName.classList.remove("text-success");
  }
});

inputs.email.addEventListener("input", () => {
  validIcon.email.classList.remove("text-danger");
  if (emailIsValid(inputs.email.value)) {
    validIcon.email.classList.add("text-success");
  } else {
    validIcon.email.classList.remove("text-success");
  }
});

inputs.password.addEventListener("input", () => {
  let pass = inputs.password.value;

  validIcon.pass1.classList.remove("text-danger");
  validIcon.pass3.classList.remove("text-danger");
  validIcon.pass2.classList.remove("text-danger");

  if (hasSymbol(pass)) {
    validIcon.pass3.classList.add("text-success");
  } else {
    validIcon.pass3.classList.remove("text-success");
  }

  if (hasUppercase(pass)) {
    validIcon.pass2.classList.add("text-success");
  } else {
    validIcon.pass2.classList.remove("text-success");
  }

  if (bigger8(pass)) {
    validIcon.pass1.classList.add("text-success");
  } else {
    validIcon.pass1.classList.remove("text-success");
  }
});

inputs.confirmPassword.addEventListener("input", () => {
  let pass = inputs.password.value;

  validIcon.rePass.classList.remove("text-danger");
  if (passwordConfirmation(pass)) {
    validIcon.rePass.classList.add("text-success");
  } else {
    validIcon.rePass.classList.remove("text-success");
  }
});

//clear inputs
function clear() {
  inputs.firstName.value = "";
  inputs.lastName.value = "";
  inputs.email.value = "";
  inputs.password.value = "";
  inputs.confirmPassword.value = "";
}

//save to local storage
function writeData() {
  let newUser = {
    firstName: inputs.firstName.value,
    lastName: inputs.lastName.value,
    email: inputs.email.value,
    password: inputs.password.value,
  };

  data.push(newUser);
  localStorage.setItem("data", JSON.stringify(data));
}

//sign up button
signUpBtn.addEventListener("click", () => {
  if (SignUpIsValid()) {
    writeData();
    clear();
    lottie.triggerAnimationModal().then(() => {
      flip();
    });
  } else {
    if (!nameIsValid(inputs.firstName.value)) {
      popLeft[0].style.opacity = "1";
      validIcon.firstName.classList.add("text-danger");
    }
    if (!nameIsValid(inputs.lastName.value)) {
      popLeft[1].style.opacity = "1";
      validIcon.lastName.classList.add("text-danger");
    }
    if (!emailIsValid(inputs.email.value)) {
      popLeft[2].style.opacity = "1";
      validIcon.email.classList.add("text-danger");
    }
    if (!passwordIsValid(inputs.password.value)) {
      popLeft[3].style.opacity = "1";
      validIcon.pass1.classList.add("text-danger");
      validIcon.pass2.classList.add("text-danger");
      validIcon.pass3.classList.add("text-danger");
    }
    if (!passwordConfirmation(inputs.password.value)) {
      popLeft[4].style.opacity = "1";
      validIcon.rePass.classList.add("text-danger");
    }
  }
});

//sign in
function loginSuccess(email, password) {
  for (let i = 0; i < data.length; i++) {
    let obj = data[i];
    if (obj.email == email && obj.password == password) {
      return {
        status: true,
        info: obj,
      };
    }
  }
  return {
    status: false,
    info: null,
  };
}

//login button
signInBtn.addEventListener("click", function () {
  let loginInfo = loginSuccess(
    inputs.signInEmail.value,
    inputs.signInPassword.value
  );
  if (loginInfo.status) {
    let userName = `${loginInfo.info.firstName} ${loginInfo.info.lastName}`;
    lottie.triggerSignIn();
    localStorage.setItem("userName", userName);
    setInterval(() => {
      location.href = "./../pages/home.html";
    }, 2300);
  } else {
    lottie.triggerWrong();
  }
});

//sign in message wrong
["focus", "input"].forEach(function (evt) {
  inputs.signInEmail.addEventListener(evt, () => {
    lottie.pauseWrong();
  });
});

["focus", "input"].forEach(function (evt) {
  inputs.signInPassword.addEventListener(evt, () => {
    lottie.pauseWrong();
  });
});
