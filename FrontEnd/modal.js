const jsModal = document.querySelector(".js-modal");
const modalHidden = document.querySelector(".modal-hidden");
const modalClosed = document.querySelector(".js-modal-closed");

jsModal.addEventListener("click", () => {
    modalHidden.classList.add("modal-uncovered")
    modalHidden.removeAttribute("aria-hidden")
    modalHidden.setAttribute("aria-modal", "true") 
    modalClosed.addEventListener("click", () => { 
        modalHidden.classList.remove("modal-uncovered")
        modalHidden.setAttribute("aria-hidden", "true")
        modalHidden.removeAttribute("aria-modal")
    })
});


