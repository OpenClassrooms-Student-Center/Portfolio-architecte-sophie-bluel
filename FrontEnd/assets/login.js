const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const errorMsgEl = document.querySelector("#error-message");

function loginRedirection() {
  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
  ); // stockage du token dans le localStorage
  window.location.href = "index.html";
}

function checkId() {
  if (
    emailEl.value === "sophie.bluel@test.tld" &&
    passwordEl.value === "S0phie"
  ) {
    loginRedirection();
    errorMsgEl.textContent = "";
  } else {
    errorMsgEl.textContent = "Vos identifiants sont incorrects";
  }
}

document.addEventListener("submit", (e) => {
  e.preventDefault();
  checkId();
});
