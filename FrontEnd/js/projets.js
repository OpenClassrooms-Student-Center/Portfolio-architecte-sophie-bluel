/** 
*  Importer les données de l'API depuis un autre fichier JS
 */
import {works, categories} from './export-projets-api.js';

/** 
// Création de variables pour intégrer les données  works et categories dans le HTML
*/
const gallery = document.querySelector(".gallery");
const filter = document.querySelector(".button-filter");


/** 
// Fonction pour afficher les projets dans la galerie.
 * @param {Array} projet
 */

/**
 * Balise de commentaire spéciale utilisée pour documenter les paramètres
 * de la fonction projets, {*} indique le paramètre est indeterminé.
 * 
 * @param {*} projet 
 */

/**
La fonction displayGallery crée dynamiquement des éléments HTML
pour afficher une galerie d'images à partir des données fournies
dans le paramètre projet. Chaque image est encapsulée dans une
balise <figure> avec un titre correspondant, puis ajoutée à l'élément
avec la classe "gallery" dans le document HTML.
 */
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

        /** Ajput du texte pour le titre */
        title.innerHTML = projet[i].title;

        /** Intégration des balises dans leurs parents */
        figure.appendChild(image);
        figure.appendChild(title);
        gallery.appendChild(figure);
    }
}

/** 
 * Fonction pour afficher les filtres de la galerie
 * @param {Array} categorie
 */

/**
 * Cette fonction displayFilters supprime le contenu des éléments HTML
 * avec la classe .button-filter, puis crée des boutons pour chaque élément
 *  dans le tableau categorie et les ajoute au document HTML.

 * Le premier bouton créé affiche le texte "Tous" et les autres boutons
 * affichent le nom des éléments dans le tableau categorie
 * 
 */
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



/** Fonctionnement des boutons qui filtrent les projets */
/**
 * sélectionne tous les boutons qui se trouvent à l'intérieur des éléments ayant la classe CSS "button-filter".
 */
const filterButtons = document.querySelectorAll(".button-filter button");
/**
 * créer et d’ajouter la classe CSS de "bouton_actif" au premier bouton de la liste filterButtons.
 */
filterButtons[0].setAttribute("class", "bouton_actif");


/**
 * Chaque bouton réagit à un clic de l’utilisateur.
 */
for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
        /**
        * une autre boucle for est utilisée pour itérer à travers tous les boutons de la liste filterButtons.
        * À chaque itération, la classe CSS "btn_active" est supprimée de chaque bouton.
        * Cela permet de désactiver tous les boutons avant d'activer celui qui a été cliqué.
        */
        for (let i = 0; i < filterButtons.length; i++) {
            filterButtons[i].removeAttribute("class", "bouton_actif");
        }

        /**
         * la classe CSS "btn_active" est ajoutée au bouton actuellement cliqué en utilisant.
         * Cela permet de mettre en évidence visuellement le bouton actif.
         */
        filterButtons[i].setAttribute("class", "bouton_actif");

        /**
         * une condition if est utilisée pour vérifier si l'index i
         * du bouton cliqué est égal à 0 (premier bouton).
         *  Si c'est le cas, cela signifie que le premier bouton "Tous" a été cliqué.
         *  Dans ce cas, la fonction displayGallery est appelée avec le tableau works
         *  en tant qu'argument. Cela affiche la galerie complète sans aucun filtre.
         */
        if (i == 0) {
          displayGallery(works);

          /**
          * Sinon l'index i du bouton cliqué est différent de 0,
          * cela signifie qu'un autre bouton a été cliqué.
          */
        } else {
            /**
             * Dans ce cas, un nouveau tableau ElementsFiltered est créé
             * en utilisant la méthode filter() sur le tableau works.
             * 
             * Seuls les éléments ayant une categoryId (clé de la works del’API)
             * est égale à l'index i du bouton cliqué seront inclus dans ce nouveau tableau (ElementsFiltered).
             */
            const ElementsFiltered = works.filter(projet => projet.categoryId == i);
            /**
             * a fonction displayGallery (projets) est appelée avec le tableau ElementsFiltered
             *  en tant qu’argument : Cela affiche la galerie avec les éléments filtrés en fonction
             *  de la categoryId du bouton cliqué
             */
            displayGallery(ElementsFiltered);
        }
    })
}
