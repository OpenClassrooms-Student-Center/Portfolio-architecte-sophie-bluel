export function modalFunction() {
    const createModal = function (e) {
        const asideTag = document.createElement('aside')
        asideTag.setAttribute('id', 'modal1')
        asideTag.setAttribute('class', 'modal')
        asideTag.setAttribute('aria-hidden', 'true')
        asideTag.setAttribute('role', 'dialogue')
        asideTag.innerHTML = "<div class='modal-wrapper'> </div>"
        const main = document.querySelector('main')
        main.appendChild(asideTag)
        
    }
    createModal()


    let modal = null;

    const openModal = function (e) {
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
        modal.style.display = "none"
        modal.setAttribute('aria-hidden', 'true')
        modal.removeAttribute('aria-modal')
        modal.removeEventListener('click', closeModal)
        modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
        modal = null
    }


    document.querySelector('.admin-div').addEventListener('click', openModal)
    //clicking outside of the modal to close it 
    window.addEventListener("click", (e) => {
        if (!modal) {
            closeModal()
        }
        if (modal){
            openModal()
        }
    })



}
