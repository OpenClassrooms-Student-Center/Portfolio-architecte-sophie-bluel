//check when the form has been submitted to get the data from the input
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
	//stops the page automatically refreshing
	e.preventDefault();

	//linking body to inputs
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const datas = { email, password };
	console.log(datas);

	//Make sure the inputs are correct
	if (!email) {
		alert("Veuillez saisir une adresse mail");
		return;
	}
	if (!password) {
		alert("Veuillez saisir un mot de passe");
		return;
	}

	// Sending email and password input to API
	fetch("http://localhost:5678/api/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(datas),
	})
		//tranform response from API into json format
		.then((response) => response.json())
		.then((datas) => {

			//store response from the api in localStorage
			localStorage.setItem("token", datas.token);

			if (datas.token) {
				//Page modification when user logs in

				//redirect user to home page
				window.location.assign("index.html");
			}

			else {
				alert("Utilisateur inconnu, mot de passe ou email erroné")
			}
		});
});
