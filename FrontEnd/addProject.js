import { isConnected } from "./sessionManagement.js";

const API_URI = "http://localhost:5678/api/works";

// La fonction `addProject` reçoit désormais directement les arguments correspondants
export const addProject = async (title, categoryId, file) => {
  if (!isConnected()) {
    console.error("Utilisateur non authentifié. Veuillez vous connecter.");
    return;
  }

  if (!title || !categoryId || !file) {
    console.error(
      "Données du projet ou fichier manquants. Assurez-vous que 'title', 'category' et 'file' sont renseignés."
    );
    return;
  }

  if (!(file instanceof File)) {
    console.error(
      "Le fichier fourni n'est pas valide. Veuillez sélectionner une image."
    );
    return;
  }

  if (!["image/jpeg", "image/png"].includes(file.type)) {
    console.error(
      "Type de fichier non valide. Seuls les formats JPEG et PNG sont acceptés."
    );
    return;
  }

  if (file.size > 4 * 1024 * 1024) {
    console.error(
      "Le fichier est trop volumineux. Veuillez fournir une image de taille inférieure à 4 Mo."
    );
    return;
  }

  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", title);
  formData.append("category", categoryId); // Récupère dynamiquement l'ID de la catégorie

  try {
    const response = await fetch(API_URI, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erreur lors de l'ajout du projet :", errorData);
      return null;
    }

    const project = await response.json();
    console.log("Projet ajouté avec succès :", project);
    return project;
  } catch (error) {
    console.error("Erreur lors de l'ajout du projet :", error);
    return null;
  }
};
