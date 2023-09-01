// Test pour integration projet

let modal = null;

// ----------------------------------------------

const openModal = async function (e) {
  e.preventDefault();
  const target = e.target.getAttribute("href");
  if (target.startsWith("#")) {
    modal = document.querySelector(target);
  } else {
    modal = await loadModal(target);
  }

  modal.style.display = null;

  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

// ----------------------------------------------

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  /* Animation-direction reversed
    modal.style.display = "none"
    modal.offsetWidth
    modal.style.display = null
     */
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  const hideModal = function () {
    modal.style.display = "none";
    modal.removeEventListener("animationend", hideModal);
    modal = null;
  };
  modal.addEventListener("animationend", hideModal);
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

const loadModal = async function (url) {
  // TODO : Afficher un loader
  const target = "#" + url.split("#")[1];
  const exitingModal = document.querySelector(target);
  if (exitingModal !== null) return exitingModal;
  const html = await fetch(url).then((response) => response.text());
  const element = document
    .createRange()
    .createContextualFragment(html)
    .querySelector(target);
  if (element === null)
    throw `L'élément ${target} n'a pas été trouvé dans la page ${url}`;
  document.body.append(element);
  return element;
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});
