// Récupération des travaux depuis le back-end

fetch("http://localhost:5678/Portfolio-architecte-sophie-bluel/api/works")
  .then(response => {
    if (!response.ok) {
      throw new Error("Erreur HTTP, statut " + response.status);
    }
    return response.json();
  })
  .then(works => {
    // Fonction pour générer les éléments de la galerie
    function genererGalerie(works) {
        
        const galerie = document.querySelector(".gallery");
        for (let i = 0; i < works.length; i++) { // Correction ici : utilisez works.length au lieu de works.lenght
            const work = works[i];
            const workElement = document.createElement("figure");
            
            workElement.innerHTML = `
              <img src="${work.imageUrl}" alt="${work.title}">
              
              <p>${work.title}</p>
            `;
            galerie.appendChild(workElement);
          }
            
    }

    // Appel de la fonction pour générer la galerie avec les travaux récupérés
    genererGalerie(works); // Correction ici : utilisez works au lieu de travail
  })
  .catch(error => {
    console.error("Une erreur s'est produite lors de la récupération des travaux:", error);
  });
