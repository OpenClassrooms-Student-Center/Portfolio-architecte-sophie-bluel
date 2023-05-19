import Projects from "./ApiDataProvider.js";

// // Missions :

// // Pouvoir cliquer sur les boutons du Filtre
// // Au clic ajouter du style au bouton
// // Au clic faire un filtre pour faire disparaitre ou apparaitre des projets
// // Attention par défault c'est le bouton Tous qui est cliqué
// // Attention, quand on clic sur un autre bouton, les autres eventListener se réinitialise sur les autres boutons
// // Attention, la page ne doit pas se recharger (e.preventdefault)

export default class EvenListener {
  dispatch() {
    this.listenClickOnButtonFilter();
  }
  listenClickOnButtonFilter() {
    document
      .querySelector(".button-filter")
      .addEventListener("click", (event) => {
        const isButtonFilter =
          event.target.classList.contains("categorie-button");
        console.log(isButtonFilter);
      });
  }
}

// export async function EventListener() {
//   const resultCategories = new Projects();
//   const resultButton = await resultCategories.getCategories;
//   const buttons = document.querySelectorAll(".categorie-button");
//   // console.log(buttons);
//   buttons.forEach((button) => {
//     button.addEventListener("click", (e) => {
//       // console.log("test");
//       const typeSelect = e.target.dataset["type"];
//       // console.log(typeSelect);
//       if (typeSelect === "Tous") {
//         document.querySelector("figure").style.display = "block";
//       } else {
//       }
//       document.querySelector(
//         "figure[data-type = " + typeSelect + "]"
//       ).style.display = "none";
//     });
//   });
// }
