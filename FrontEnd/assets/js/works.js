export function renderWorks(category) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  fetch("http://localhost:5678/api/works")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((works) => {
      //pour chaque objet work dans works alors on va ...
      works.forEach((work) => {
       
        console.log(work)
        
        //On va aller voir pour chaque category si elle correspond a dans l'objet work la valeur de l'objet cateogry et son atrribut name
        //vu qu'on est dans une boucle pour chaque work on va faire cette comparaison sur tous les objets work 
        if (category == work.category.name){
          //creation des elements html necessaires pour accueilir la reponse des works
          const newFigure = document.createElement("figure");
          const newImage = document.createElement("img");
          //Assigner des attributs  (src et alt) aux instances des constantes qui vinnent d'etre crééer ( newImage)
          newImage.src = work.imageUrl;
          newImage.alt = "Photo du projet";
          //Ensuite on va insérer l'image dans la figure avec la fonction appendChild
          newFigure.appendChild(newImage);
          const newFigcaption = document.createElement("figcaption");
          //On assigne la valeur contenue dans l'attribut "title" a la figcaption
          newFigcaption.innerText = work.title;
          //On insere la figcaption dans la figure avec la fonction appendChild
          newFigure.appendChild(newFigcaption);
          //On réinsere le tout(la figure complète) dans la gallerie
          gallery.appendChild(newFigure);

          //Dans le cas ou la category est egale a "tous" qui n'est pas dans la liste des categories et qui à été créée
          //On va afficher tous les works peu importe leur catégorie
        } else if (category == "Tous"){

        const newFigure = document.createElement("figure");
        const newImage = document.createElement("img");
        //Assigner des attributs  (src et alt) aux instances des constantes qui vinnent d'etre crééer ( newImage)
        newImage.src = work.imageUrl;
        newImage.alt = "Photo du projet";
        //Ensuite on va insérer l'image dans la figure avec la fonction appendChild
        newFigure.appendChild(newImage);
        const newFigcaption = document.createElement("figcaption");
        //On assigne la valeur contenue dans l'attribut "title" a la figcaption
        newFigcaption.innerText = work.title;
        newFigure.appendChild(newFigcaption);
        //On réinsere le tout(la figure complète) dans la gallerie
        gallery.appendChild(newFigure);}
      });
    })
    //afficher un msg d'erreur à l'ecran si pb avec la fonction
    .catch((err) => {
      gallery.innerHTML = `<p>Une erreur est survenue (${err})</p>`;
    });
}
