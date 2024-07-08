  //Fonction du statut utilisateur connecté//
  
  function statutConnecte() {

    //Récupération du token du Backend//
    const token = localStorage.getItem("token");
    const login = document.getElementById("login");
  
    //Condition du statut connecté//
  
    if (token != null) {  

      //Si déjà login, pas de possibilité de se login//
      login.style.display = "none";
    
      const header = document.querySelector("header");
  
      //Inversion de l'affichage de la barre de modification et de la nav//
      header.style.flexDirection = "column-reverse";
  
      //Création de la barre de modification//

      const barreModification = document.createElement("div");
      barreModification.classList.add("barre-modif");
      header.appendChild(barreModification);

      //Création de l'icône de modification//
  
      const iconeModifier = document.createElement("i");
      iconeModifier.classList = "fa-solid fa-pen-to-square";
      iconeModifier.setAttribute("id", "icone-modifier");
      barreModification.appendChild(iconeModifier);
  
      //Création du Label de modification//
  
      const labelModif = document.createElement("p");
      labelModif.innerText = "Mode édition";
      labelModif.classList.add("mode-edition");
      const boutonPublier = document.createElement("button");
      barreModification.appendChild(labelModif);
  
      //Création d'un bouton publier//
  
      boutonPublier.type = "submit";
      boutonPublier.innerText = "publier les changements";
      boutonPublier.classList.add("bouton-publier");
      barreModification.appendChild(boutonPublier);
  
      //Apparition des option de modification//
  
      const modifier = document.getElementById("modifier");
      modifier.style.display = "block";
      modifier.style.textDecoration = "none";

      const modale1 = document.getElementsByClassName("modales");
      const modifierProjet = document.getElementById("modifier-projets");
  
      modifierProjet.style.display = "block";
      modifierProjet.style.textDecoration = "none";
    
    } else {
      //Si pas login, désactivation du bouton Logout//
  
      logout.style.display = "none";
      login.style.display = "block";
    }
  }
  statutConnecte();
  
  function seDeconnecter() {
  //selection de l'élement declancheur
  
    const logout = document.getElementById("logout");
  
  // Evenement au click
  
    logout.addEventListener("click", (event) => {
      event.preventdefault;
      deconnection();
    });
  }
  //Déconnexion//
  
  function deconnection() {
  //suppression token du localStorage
  
    const actionDeconnection = localStorage.clear();
  
  //Rafraichissement de la page
  
    location.reload();
  }
  
  seDeconnecter();
  