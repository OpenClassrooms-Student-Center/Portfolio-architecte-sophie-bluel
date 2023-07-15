function displayAdminMode() {
  let headerMainContainer = document.querySelector(".header-main-container");
  let bandeau = createBandeau();

  let mainContainer = document.getElementById("main-container");
  mainContainer.parentNode.insertBefore(bandeau, mainContainer);

  headerMainContainer.style.marginTop = "38px";

  let filtersTitle = document.getElementById("titre-projets");
  let filtersButtons = document.getElementById("categories");
  let titleProjets = createTitleProjets();

  filtersButtons.parentNode.insertBefore(titleProjets, filtersButtons);

  filtersButtons.remove();
  filtersTitle.remove();
}

function createBandeau() {
  let bandeau = document.createElement("div");
  bandeau.className = "bandeau";

  let button1 = document.createElement("button");
  button1.className = "button-edition";
  let i = document.createElement("i");
  i.className = "fa-regular fa-pen-to-square";
  button1.appendChild(i);
  button1.appendChild(document.createTextNode("Mode édition"));

  let button2 = document.createElement("button");
  button2.className = "button-publication";
  button2.appendChild(document.createTextNode("Publier les changements"));

  bandeau.appendChild(button1);
  bandeau.appendChild(button2);

  return bandeau;
}

function createTitleProjets() {
  let titleProjets = document.createElement("div");
  titleProjets.className = "container-title-projets";

  let h2 = document.createElement("h2");
  h2.textContent = "Mes projets";
  titleProjets.appendChild(h2);

  let innerDiv = document.createElement("div");
  innerDiv.className = "bouton-modifier-admin";
  titleProjets.appendChild(innerDiv);

  let icon = document.createElement("i");
  icon.className = "fa-regular fa-pen-to-square bouton-modifier";
  innerDiv.appendChild(icon);

  let p = document.createElement("p");
  p.classList.add("bouton-modifier");
  p.textContent = "Modifier";
  innerDiv.appendChild(p);

  return titleProjets;
}
