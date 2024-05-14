(function() {
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
          for (let i = 0; i < works.length; i++) { 
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
        genererGalerie(works);
        
        // Appel de la fonction pour créer le menu des catégories
        CreateMenu();
      })
      .catch(error => {
        console.error("Une erreur s'est produite lors de la récupération des travaux:", error);
      });
//la fonction pour créer le menu des catégories
    function CreateMenu() {
      fetch("http://localhost:5678/api/categories")
        .then(response => {
          if (!response.ok) {
            throw new Error("Erreur HTTP, statut " + response.status);
          }
          return response.json();
        })
        .then(categories => {
          const portfolio = document.querySelector("#portfolio");
          const menu = document.createElement("menu");
          portfolio.appendChild(menu);
          const buttonHome = document.createElement("button");
          buttonHome.textContent = 'Home';
          menu.appendChild(buttonHome);

          
          for (let i = 0; i < categories.length; i++) { 
            const category = categories[i];
            const button = document.createElement("button");
            button.textContent = category.name;
            menu.appendChild(button);
            
          }
        })
        .catch(error => {
          console.error("Une erreur s'est produite lors de la récupération des catégories:", error);
        });
    }
})();

