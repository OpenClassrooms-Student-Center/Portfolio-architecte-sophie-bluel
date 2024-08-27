const formLogin = document.getElementById('formLogin');
const errorMessage = document.getElementById('error-message');


formLogin.addEventListener("submit", async (event) => {
    // On empêche le comportement par défaut
    event.preventDefault();
    console.log("Il n’y a pas eu de rechargement de page");

    // On récupère les deux champs et on affiche leur valeur
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Création de l’objet des infos du formulaire.
const loginData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
 };

 // Création de la charge utile au format JSON
 const loginDataJson = JSON.stringify(loginData);

 try {
     const result = await fetch("http://localhost:5678/api/users/login", {
         //Objet de configuration qui comprend 3 propriétés
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: loginDataJson //charge utile
     });

     if (result.ok) {
         const resultValue = await result.json();
         const btnModifier = document.getElementById("openModal");
         console.log("Login successful", resultValue);
         // Redirigez l'utilisateur vers une autre page ou affichez un message de succès
         errorMessage.style.display = 'none';
        //  // Stockage des informations dans le localStorage
        window.localStorage.setItem("token", resultValue.token);
         // Rediriger l'utilisateur
         window.location.href = "index.html";
         

     } else {
         const error = await result.json();
         console.error("Login failed", error);
         // Affichez un message d'erreur à l'utilisateur
         errorMessage.textContent = "Email ou mot de passe incorrect.";
         errorMessage.style.display = 'block';
     }
 } catch (error) {
     console.error("An error occurred", error);
     // Affichez un message d'erreur à l'utilisateur
     errorMessage.textContent = "Une erreur est survenue. Veuillez réessayer plus tard.";
     errorMessage.style.display = 'block';
 }
});


