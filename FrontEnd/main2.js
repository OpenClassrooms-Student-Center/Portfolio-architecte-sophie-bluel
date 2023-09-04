import {
  fetchWorks,
  displayWorks,
  setupButtons,
  deleteWorks,
} from "./works2.js";
import { initLoginForm, checkTokenLogin } from "./login2.js";
// import { toggleModal, populateModalWithExistingProjects } from "./modal.js";

// // ---------------LOGIN----------------
checkTokenLogin;

initLoginForm();

(async () => {
  const works = await fetchWorks();

  const sectionProjet = document.querySelector(".projets");
  displayWorks(works, sectionProjet);

  const filtresDiv = document.querySelector(".filtres");
  setupButtons(works, filtresDiv, sectionProjet);
})();

deleteWorks();
// Vérifier l'état de connexion de l'utilisateur

// // ---------------DELETE----------------
// deleteWorks();
