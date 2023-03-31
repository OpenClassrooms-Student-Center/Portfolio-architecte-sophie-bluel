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
          const newFigure = document.createElement("figure");
          const newImage = document.createElement("img");
          newImage.src = work.imageUrl;
          newImage.alt = "Photo du projet";

          newFigure.appendChild(newImage);
          const newFigcaption = document.createElement("figcaption");
          newFigcaption.innerText = work.title;
          newFigure.appendChild(newFigcaption);
          gallery.appendChild(newFigure);

          //Dans le cas ou la category est egale a "tous" qui n'est pas dans la liste des categories et qui à été créée
          //On va afficher tous les works peu importe leur catégorie
        } else if (category == "Tous"){

        const newFigure = document.createElement("figure");
        const newImage = document.createElement("img");

        newImage.src = work.imageUrl;
        newImage.alt = "Photo du projet";

        newFigure.appendChild(newImage);
        const newFigcaption = document.createElement("figcaption");
        newFigcaption.innerText = work.title;

        newFigure.appendChild(newFigcaption);
        gallery.append6666669Child(newFigure);}
      });
    })
    //afficher un msg d'erreur à l'ecran si pb avec la fonction
    .catch((err) => {
      gallery.innerHTML = `<p>Une erreur est survenue (${err})</p>`;
    });


}
