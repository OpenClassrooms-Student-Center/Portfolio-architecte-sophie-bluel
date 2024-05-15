(async function() {
    let works; // Déclarez la variable works dans une portée accessible à toutes les fonctions
    
    await fetch("http://localhost:5678/FrontEnd/api/works")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur HTTP, statut " + response.status);
        }
        return response.json();
      })
      .then(data => {
        works = data; // Affectez les données récupérées à la variable works
        // Appel de la fonction pour générer la galerie avec les travaux récupérés
        genererGalerie(works);
        // Appel de la fonction pour créer le menu des catégories
        CreateMenu().then(() => {
            filter();
        });
      })
      .catch(error => {
        console.error("Une erreur s'est produite lors de la récupération des travaux:", error);
      });
      
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
    
    // Fonction pour créer le menu des catégories
    async function CreateMenu() {
        await fetch("http://localhost:5678/FrontEnd/api/categories")
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
                button.setAttribute("id", `${category.id}`);
                
                button.textContent = category.name;
                menu.appendChild(button);
              }
            })
            .catch(error => {
              console.error("Une erreur s'est produite lors de la récupération des catégories:", error);
            });
    }
    
    // Fonction pour filtrer
    function filter() {
        const buttons = document.querySelectorAll("#portfolio menu button");
        buttons.forEach(button => {
            button.addEventListener("click", function() {
                const id = this.getAttribute("id");
                if (!isNaN(id) && id > 0){
                
                const worksFiltrees = works.filter(work => {
                    return work.categoryId == id;
                });
                updateGallery(worksFiltrees);
            }
            else{
                genererGalerie(works);
            }
        }
        );
        });
    }
    
    function updateGallery(filteredWorks) {
        const galerie = document.querySelector(".gallery");
        galerie.innerHTML = ''; // Efface tous les éléments existants dans la galerie
        
        // Ajoutez les nouveaux éléments correspondant aux travaux filtrés
        filteredWorks.forEach(work => {
            const workElement = document.createElement("figure");
            workElement.innerHTML = `
              <img src="${work.imageUrl}" alt="${work.title}">
              <p>${work.title}</p>
            `;
            galerie.appendChild(workElement);
        });
    }
    
})();
