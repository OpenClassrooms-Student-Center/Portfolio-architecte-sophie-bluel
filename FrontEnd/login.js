const loggin = async (e) => {
  e.preventDefault();
  const email = document.querySelector("#Email");
  const password = document.querySelector("#Password");

  const user = {
    email: email.value,
    password: password.value,
  };

  const validateInput = (inputElement, alertElement, errorMessage) => {
    const isValid = inputElement.value !== "";
    alertElement.style.visibility = isValid ? "hidden" : "visible";
    alertElement.innerHTML = isValid ? "" : errorMessage;
    inputElement.style.border = isValid ? "none" : "1px solid red";
    return isValid;
  };

  const isEmailValid = validateInput(email, document.querySelector(".alert_mail"), "Merci d'entrer un email");
  const isPasswordValid = validateInput(password, document.querySelector(".alert_password"), "Merci d'entrer un mot de passe");

  if (isEmailValid && isPasswordValid) {
    try {
      const userInfo = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(user),
      });
      const res = await userInfo.json();
      if (res.token) {
        console.log(res);
        document.querySelector(".alert_connection").innerHTML = "";
        window.sessionStorage.setItem("token", res.token);
        window.sessionStorage.setItem("id", res.userId);
        window.location.href = "./index.html";
      } else {
        console.log("error", res);
        document.querySelector(".alert_connection").innerHTML =
          "erreur de connexion";
      }
    } catch (error) {
      console.error(error);
    }
  }
};

const loggin_btn = document.querySelector(".btn--loggin");
loggin_btn.addEventListener("click", (e) => loggin(e));
