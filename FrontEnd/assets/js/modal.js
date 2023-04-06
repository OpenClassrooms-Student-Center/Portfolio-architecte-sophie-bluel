export function modalFunction(){

let modal = null;

const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener("click", closeModal)
    modal.querySelector("js-modal-close").addEventListener("click", closeModal)
}


const closeModal = function (e) {
    if (modal === null) return 
    e.preventDefault(e)
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal = null
}

document.querySelector('.js-modal').addEventListener('click', openModal)
//clicking outside of the modal to close it 
window.addEventListener("click", (e) => {
    if (!modal){
        closeModal(e)
    }
})


const createModal = function (e) {
    e.preventDefault();
    const asideTag = document.createElement("aside")
    asideTag.setAttribute("id", "modal1")
    asideTag.setAttribute("class", "modal")
    asideTag.setAttribute("aria-hidden", "true")
    asideTag.setAttribute("role", "dialogue")
    asideTag.innerHTML = "<div> </div>"

    body.appendChild(asideTag)
    
}


}

