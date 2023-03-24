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
			console.log(datas);
			console.log(datas.token)

			//store response from the api in localStorage
			localStorage.setItem("token", datas.token);
			const token = token.localStorage.setItem();
			window.localStorage.setItem(key, value);

			if (datas.token) {
				//Page modification when user logs in

				//redirect user to home page
				location.href("index.html");

				//select the filter div and delete it to make space for new elemnts once logged in
				const filterDiv = document.querySelector(".filterDiv");
				filterDiv.remove();

				//create new elemnts needed
				//selecting section needed
				const portfolioSection = document.querySelector(".portfolio");

				//Icon pour modifier
				const modifyIcon = document.createElement("i");
				modifyIcon.classList.add("fa-solid", "fa-arrows-up-down-left-right");

				//"modifer" text next to icon
				const modifyText = document.createElement("p");
				modifyText.innerText = "modifier";

				//<a> pour regrouper l'icon et le text pour faciliter le lien
				const modalLink = document.createElement("a");
				modalLink.className(".js-modal");
				modalLink.appendChild(modifyIcon);
				modalLink.appendChild(modifyText);

				//Injecting elements next to h2 already present
				modalLink.parentNode.insertBefore(modalLink, h2);

				//Creating the logged in nav
				const nav = document.createElement("nav");
				const modeEditionText = document.createElement("p");
				modeEditionText.innerText = "Mode édition";
				const btn = document.createElement("button");
				btn.innerText = "publier les changements";

				//Injecting elements above the basic nav
				nav.appendChild("p");
				nav.appendChild("button");
				const header = document.querySelector("header");
				nav.parentNode.insertBefore(nav, header);
			}

			else {
				alert("Utilisateur inconnu, mot de passe ou email erroné")
			}
		});
});
