import {
  fetchWorks,
  displayWorks,
  setupButtons,
  deleteWorks,
} from "./works2.js";

import { toggleModal, populateModalWithExistingProjects } from "./modal.js";

(async () => {
  const works = await fetchWorks();

  const sectionProjet = document.querySelector(".projets");
  displayWorks(works, sectionProjet);

  const filtresDiv = document.querySelector(".filtres");
  setupButtons(works, filtresDiv, sectionProjet);
})();

deleteWorks();
