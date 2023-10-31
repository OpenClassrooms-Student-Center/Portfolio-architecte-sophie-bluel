import {works, categories} from './export-projets-api.js';

const gallery = document.querySelector(".gallery");
const filter = document.querySelector(".button-filter");

/** Affichage des projets */
const displayGallery = (projet) => {
    document.querySelector(".gallery").innerHTML = "";
    for (let i in projet) {
        /** Création des balises */
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const title = document.createElement("figcaption");

        /** Ajout des attributs pour l'image */
        image.setAttribute("src", projet[i].imageUrl);
        image.setAttribute("alt", projet[i].title);

        /** Ajout du texte pour le titre */
        title.innerHTML = projet[i].title;

        /** Intégration des balises dans leurs parents */
        figure.appendChild(image);
        figure.appendChild(title);
        gallery.appendChild(figure);
        }
    }

/** Suppression de contenu des éléments HTML avec .button-filter, puis création des boutons pour chaque élément
 * du tableau categorie pour les ajouter au HTML. Le premier bouton affiche "Tous" et les autres boutons affichent
 * le nom des éléments du tableau categorie */

const displayFilters = (categorie) => {
    document.querySelector(".button-filter").innerHTML = "";
    const buttonAll = document.createElement("button");
    buttonAll.innerHTML = "Tous";
    filter.appendChild(buttonAll);

    for (let i in categorie) {
        const button = document.createElement("button");
        button.innerHTML = categorie[i].name;
        filter.appendChild(button);
    }
}
/** Affichage des catégories et des projets */
displayFilters(categories);
displayGallery(works);

/** Boutons qui filtrent les projets */
const filterButtons = document.querySelectorAll(".button-filter button");

/** création de la classe CSS de "bouton_actif" au premier bouton.
 * setAttribute : spécifie l'attribut avec : class, sa valeur : bouton_actif) */
filterButtons[0].setAttribute("class", "bouton_actif");

/** Boucle  clic utilisateur */
for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
        /** itération, la classe CSS "bouton_actif" est supprimée de chaque bouton.
        * pour désactiver tous les boutons avant d'activer celui qui a été cliqué */
        for (let i = 0; i < filterButtons.length; i++) {
            filterButtons[i].removeAttribute("class", "bouton_actif");
        }

        /** la classe CSS "bouton_actif" est ajoutée au bouton cliqué.
         * Rendre visuellement le bouton actif */
        filterButtons[i].setAttribute("class", "bouton_actif");

        /** une condition pour vérifier si  le premier bouton "Tous" a été cliqué.
         *  Dans ce cas, la fonction displayGallery affiche le tableau works sans aucun filtre */
        if (i === 0) {
          displayGallery(works);

        } else {

            /** Tableau ElementsFiltered est créé avec la méthode filter() du tableau works.
             * Seuls les éléments ayant une categoryId (clé de la works del’API) égale à l'index i du bouton cliqué
             * sont inclus dans ce tableau)*/
            const ElementsFiltered = works.filter(projet => projet.categoryId == i);

            /** Affichage de la galerie avec les éléments filtrés en fonction de la categoryId du bouton cliqué */
            displayGallery(ElementsFiltered);
        }
    })
}
