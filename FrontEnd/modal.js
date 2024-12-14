let modal = null;
const focusableSelector= "button, a, input"
let focusables = []
let previouslyFocusedElement = null

const openModal = async function (e) {
    e.preventDefault()
    const btnAddWork = document.getElementById("btnAddWork")
    modal = document.querySelector(e.target.getAttribute("href"))
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusedElement = document.querySelector(":focus")
    modal.style.display = null;
    focusables[0].focus()
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-close-modal").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
    btnAddWork.addEventListener("click",showAddWork)
    createGallery()
}

const closeModal = function (e) {
    if (modal === null) return
    if(previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()
    const btnAddWork = document.getElementById("btnAddWork")
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-close-modal").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    btnAddWork.removeEventListener("click", showAddWork)
    showDeleteWork()
    modal = null;
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex( f => f === modal.querySelector(":focus"))
    if (e.shiftKey === true){
        index--
    } else {
        index++
    }
    if(index >= focusables.length){
        index = 0
    }
    if (index < 0){
        index = focusables.length - 1
    }
    focusables[index].focus()
}

const createGallery = async function (){
    const works = await getResponse("http://localhost:5678/api/works");
    const galleryModal = document.getElementById("galleryModal");
    galleryModal.innerHTML = ""
    works.forEach(work => {
        const baliseImg =`<figure>
                            <img src ="${work.imageUrl}" class="imgGalleryModal"/>
                            <button class="deleteWorkBtn" work-id=${work.id} ><i class="fa-solid fa-trash-can"></i></button>
                        </figure>`
        galleryModal.innerHTML += baliseImg;
              
    });
    const btnDeletes = galleryModal.querySelectorAll(".deleteWorkBtn");
        btnDeletes.forEach(btnDelete => {
            btnDelete.addEventListener("click",async () => deleteWork(btnDelete.getAttribute("work-id")))
        });  
}

async function deleteWork(workId){
    const token = window.localStorage.getItem("token")
    const deleteResponse = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers:{ 
            'Authorization':`Bearer ${token}`
        }
    });
    if(deleteResponse.ok){
        await createGallery();
        await createMainGallery();
    }
}

const showAddWork = function(){    
    const pageAddWorks = document.getElementById("addWork")
    const pageDeleteWorks = document.getElementById("deleteWork")
    const btnBack = document.getElementById("btnBack")
    const headerModal = modal.querySelector(".headerModal")
    pageDeleteWorks.style.display = "none";
    pageAddWorks.style.display = "flex";
    btnBack.style.display = "flex";
    headerModal.style.justifyContent = "space-between";
    btnBack.addEventListener("click",showDeleteWork)
}

const showDeleteWork = function() {
    const pageAddWorks = document.getElementById("addWork")
    const pageDeleteWorks = document.getElementById("deleteWork")
    const btnBack = document.getElementById("btnBack")
    const headerModal = modal.querySelector(".headerModal")
    pageDeleteWorks.style.display = "block";
    pageAddWorks.style.display = "none";
    btnBack.style.display = "none";
    headerModal.style.justifyContent = "end";
    btnBack.removeEventListener("click",showDeleteWork)
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})

window.addEventListener("keydown", function (e) {
    if(e.key === "Escape" || e.key === "Esc"){
        closeModal(e)
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e)
    }
})