import { renderWorks } from "./works.js";
export function renderFilters() {
  //Grâce à  fetch on va aller recuperer les donnes dans categories
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    //Ensuite 
    .then((categories) => {
      //On va d'abord créer un bouton "Tous" pour une catégorie qui n'existe pas dans la liste des categories
      const filterDiv = document.createElement("div");
      filterDiv.className = "filterDiv";
      const allElementsButton = document.createElement("button");
      allElementsButton.innerText = "Tous";
      //On insere le btn dans la div filterDiv
      filterDiv.appendChild(allElementsButton);
      //On fait une boucle pour que chaque category dans categories ait un bouton créé 
      categories.forEach((category) => {
        //On crée donc un button 
        const newButton = document.createElement("button");
        //On ajoute du texte a l'interieur du btn qui prendra le nom de la categorie 
        //category.name permet d'acceder a l'attribut "name" dans category qui possède ici le nom de category
        newButton.innerText = category.name;
        //On ajoute un attribut id au btn qui est identique à celui de la category
        // 
        newButton.id = category.id;
        //On va également inserer ces btns dans la même div que celui de "tous" => filterDiv
        filterDiv.appendChild(newButton);
        //On ajoute un event listener aux btns pour "ecouter" a chaque fois que le user click sur un des btns
        //lors d'un click on effectuera la fonction renderWorks(category.name)
        newButton.addEventListener("click", function () {

          //On appelle la fonction renderWorks dans le fichier works.js
          //cette fonction affiche les works 
          //elle prend comme paramettre une category
          renderWorks(category.name);
          //Ici on a pris category.name comme paramettre qui va nous permettre d'afficher uniquement les works qui correspondent
          //a "l'innerText" du bouton
          // Ex : si user click sur le btn "Objects" le eventListener ecoute, voit que c'est innerText "Objects" va le mettre en parametre
          //de la fonction renderWorks
        });
      });
      const gallery = document.querySelector(".gallery");
      gallery.parentNode.insertBefore(filterDiv, gallery);

      allElementsButton.addEventListener("click", function () {
        renderWorks("Tous");
      });
    });
}
