// document.getElementById("add-photo").addEventListener("click", function () {
//   // Cachez la galerie d'images et affichez le formulaire
//   document.getElementById("existing-projects").classList.add("hidden");
//   document
//     .getElementById("add-photo-form-container")
//     .classList.remove("hidden");
// });

document
  .getElementById("add-photo-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const imageUpload = document.getElementById("image-upload").files[0];
    const projectTitle = document.getElementById("project-title").value;
    const projectCategory = document.getElementById("project-category").value;

    // Validation
    if (!imageUpload || !projectTitle || !projectCategory) {
      document.getElementById("form-error-message").innerText =
        "Veuillez remplir tous les champs.";
      return;
    }

    // Création de l'objet FormData pour envoyer le fichier et les autres données
    const formData = new FormData();
    formData.append("image", imageUpload);
    formData.append("title", projectTitle);
    formData.append("categoryId", projectCategory);

    // Envoi à l'API
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      // Réponse de l'API si le formulaire est correctement envoyé
      alert("Projet ajouté avec succès!");
      location.reload(); // Recharger la page pour voir le nouveau projet
    } else {
      // Message d'erreur
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  });
