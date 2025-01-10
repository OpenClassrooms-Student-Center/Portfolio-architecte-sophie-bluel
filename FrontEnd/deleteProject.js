export const deleteProject = async (projectId, projectTitle) => {
  const token = sessionStorage.getItem("token");
  const confirmation = confirm(
    `Voulez-vous vraiment supprimer le projet "${projectTitle}" ?`
  );

  if (confirmation) {
    try {
      const response = await fetch(
        `http://localhost:5678/api/works/${projectId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.ok;
    } catch (error) {
      console.error("Erreur lors de la tentative de suppression :", error); // Log ici uniquement
      return false;
    }
  }

  return false;
};
