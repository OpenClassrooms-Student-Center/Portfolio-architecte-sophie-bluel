  //Récupération des données "Works" de l'API à l'aide d'un Fetch//
  
  function FetchTravaux(filtre = "Tous") {
  
    //Voir ci-dessous pour le filtre "Tous"//
  
    fetch("http://localhost:5678/api/works")
      .then((reponse) => reponse.json())
      .then((travaux) => {

        //Bouton "Tous" par défaut affichant tous les travaux, sinon affichage du filtre//
  
        if (filtre == "Tous") {
          affichage(travaux);
  
        } else {
          const filtrage = travaux.filter(function (FiltreAffichage) {
            return FiltreAffichage.category.name === filtre;
          });
    
          affichage(filtrage);
        }
      });
  }
  
  function FetchCategories() {
    //Récupération des catégories de l'API avec un Fetch//
  
    fetch("http://localhost:5678/api/categories")
      .then((reponse) => reponse.json())
      .then((category) => {
  
        //Création du bouton filtre "Tous"//
  
        const boutonTous = document.createElement("button");
        boutonTous.classList.add("boutonTous");
        boutonTous.innerText = "Tous";
  
        //Rattachement du bouton avec un AppendChild//
        
        const sectionFiltres = document.querySelector(".filtres");
        sectionFiltres.appendChild(boutonTous);
  
        //Rajout de l'évènement au clic pour le bouton Tous//
  
        boutonTous.addEventListener("click", (event) => {
          event.preventDefault();
          FetchTravaux();
        });
  
        //Rattachement des catégories aux boutons filtres à l'aide d'une boucle//
  
        for (let i = 0; i < category.length; i++) {
          const categories = category[i];
  
          //Création des boutons filtres//
  
          const boutonsFiltres = document.createElement("button");
          boutonsFiltres.classList.add("boutonsFiltres");
          boutonsFiltres.innerText = categories.name;
          sectionFiltres.appendChild(boutonsFiltres);
  
          //Rajout de l'évènement au clic pour les autres filtres//
  
          boutonsFiltres.addEventListener("click", (event) => {
            event.preventDefault();
            FetchTravaux(categories.name);
          });
        }
      });
  }
  
  //Afficher les éléments dans la galerie//
  
  function affichage(elementsGalerie) {  
    const sectionAffichage = document.querySelector(".gallery");
  
    //Vider le HTML//
    sectionAffichage.innerHTML = "";
  
    //Affichage des éléments à l'aide d'une boucle//
    for (let i = 0; i < elementsGalerie.length; i++) {
      const articleGalerie = elementsGalerie[i];
  
      // Création de l'affichage de la galerie par defaut
  
      const fiche = document.createElement("div");
        fiche.classList.add("fiche");
      const image = document.createElement("img");
      const titre = document.createElement("p");

      image.src = articleGalerie.imageUrl;
      titre.innerText = articleGalerie.title;
  
      //Appendchild des elements//
  
      sectionAffichage.appendChild(fiche);
      fiche.appendChild(image);
      fiche.appendChild(titre);
    }
  }
  
  FetchCategories();  
  FetchTravaux();