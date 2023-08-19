document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#login form");
  //   console.log(form);
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.querySelector("#login-email").value;
    // console.log(email);
    const password = document.querySelector("#login-password").value;
    // console.log(password);

    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Store user data and/or token for future requests or to determine user state
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        // Redirect to the homepage or show additional options
        location.href = "index.html";
      } else {
        // Handle errors, e.g., show a message to the user
        alert(data.message);
      }
    } catch (error) {
      console.error("There was an error during the login process:", error);
    }
  });
  //   Chargement logout
});
