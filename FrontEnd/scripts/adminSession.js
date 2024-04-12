import { openModal } from "./modal.js";

// Fonction permettant de vérifier si l'utilisateur est connecté
export function isLoggedIn() {
  return localStorage.getItem("token") ? true : false;
};

// Fonction permettant d'afficher le bouton login ou logout
export function logButton(log) {
  log.innerHTML = isLoggedIn() ? "logout" : "login";
};

// Fonction pour afficher la page d'accueil de l'utilisateur authentifié
export function adminPage() {
  if (isLoggedIn()) {
    addBanner();
    addModifyButton();
    document.querySelector(".openModalBtn").addEventListener("click", openModal);
    document.querySelector(".adminBanner").addEventListener("click", openModal);
  };
};

// Fonction pour créer le bouton modifier si adminPage()
export function addModifyButton() {
  const sectionPortfolio = document.getElementById("portfolio");
  const modifyBtn = document.createElement("a");
  modifyBtn.classList.add("modifyBtn", "openModalBtn");
  modifyBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>
  modifier`;
  modifyBtn.setAttribute("href", "#modal");
  sectionPortfolio.querySelector("h2").insertAdjacentElement("afterend", modifyBtn);
};

// Fonction pour créer la bannière si adminPage() activée
export function addBanner() {
  const body = document.querySelector("body");
  const adminBanner = document.createElement("div");
  adminBanner.classList = "adminBanner";
  adminBanner.innerHTML = `<a href="#">
  <i class="fa-regular fa-pen-to-square"></i>
  Mode édition</a>`;
  body.insertBefore(adminBanner, body.firstChild);
};
