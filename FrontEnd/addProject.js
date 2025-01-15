import { isConnected } from "./sessionManagement.js";

// Dans la fonction addProject, projectData est attendu comme un objet contenant les
// informations du projet à ajouter, dont titre et catégorie.
export const addProject = async (projectData, file) => {
  if (!isConnected()) {
    console.error("Utilisateur non authentifié. Veuillez vous connecter.");
    return; // Ne pas continuer si l'utilisateur n'est pas connecté
  }

  // Vérification : données du projet et fichier
  if (!projectData || !projectData.title || !projectData.category || !file) {
    console.error(
      "Données du projet ou fichier manquants. Assurez-vous que les champs 'title', 'category' et 'file' sont renseignés."
    );
    return;
  }

  // Vérification : type et taille du fichier
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
    // Limite de 4 Mo
    console.error(
      "Le fichier est trop volumineux. Veuillez fournir une image de taille inférieure à 4 Mo."
    );
    return;
  }

  // Préparer les données à envoyer
  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", projectData.title);
  formData.append("category", projectData.category);

  try {
    // Requête POST vers l'API
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: formData, // Envoyer le formulaire avec les données
    });

    // Vérification de la réponse
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erreur lors de l'ajout du projet :", errorData);
      return null; // Arrêter si l'API retourne une erreur
    }

    // Succès : projet ajouté
    const project = await response.json();
    console.log("Projet ajouté avec succès :", project);
    return project; // Retourner les données du projet ajouté
  } catch (error) {
    // Gestion des erreurs réseau ou inattendues
    console.error("Erreur lors de l'ajout du projet :", error);
    return null;
  }
};
