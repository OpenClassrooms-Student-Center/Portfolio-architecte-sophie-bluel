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
        //créer une figure + img en html
        console.log(work)
        if (category == work.category.name){
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
          gallery.appendChild(newFigure);
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
