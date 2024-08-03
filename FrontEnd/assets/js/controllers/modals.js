
import {
    createWork,
    fetchWork,
    deleteWork
} from '../libs/works.js'

let works = await fetchWork()
console.log(works)

// fermer la modale
function closeModal() {
    const modal = document.querySelector('.modal_container');
    modal.style.display = ""
    modal.classList.add('hidden')
}

//ouvrir la modale
function openModal() {
    const modal = document.getElementById('my_modal');
    modal.classList.remove('hidden')
    //recentre la modale au milieu de la page
    modal.style.display = 'flex'
}


//faire apparaitre la gallery
function displayModalGallery() {
    const imgContainer = document.querySelector('.img_container')
    //evite liste infinie de works
    imgContainer.innerHTML=''
    document.works.map(renderModalWork)
        works.forEach(imgContainer.appendChild);
}

//icon pour suppirmer l'img
let i = document.createElement('i')
i.classList.add('fa-solid', 'fa-trash-can')


//rendu d'un travail en élément
function renderModalWork(work) {
    let article = document.createElement('article');
    article.classList.add('work');
    let img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt = work.title;
    article.appendChild(img);
    let button = document.createElement('button')
    //bouton supprimer img
    button.addEventListener('click', handleRemove(work.id))
    button.appendChild(i)
    article.appendChild(button)

    return article
}

function addWork (image, title, categoryid) {
    return async function () {
        try {
            await createWork(image, title, categoryid)
            document.works = document.works.filter((work) => {
                if(work.imageUrl === image && title === 'azerty' && category.id === categoryId) {
                    createWorkElement(document.work)
                    displayWorks(document.work)
                } else {
                    alert ("Erreur dans l'ajout de photo !")
                }
            })
        } 
        catch (error) {
            console.log(error)
        }
    }
}

//supprimer une img
function handleRemove(workId) {
    return async function () {
        try {
            await deleteWork(workId)
            document.works = document.works.filter((work) => {
                if (work.id === workId ) {
                    return false
                } else {
                    return true
                }
            })
            displayModalGallery()
        }
        catch (error) {
            console.log(error)
        }
    }
}


//ouverture de modale au click du btn modif
const modifBtn = document.querySelector('.modif')
modifBtn.addEventListener('click', openModal)

//application de fermeture la modale
const xMark = document.querySelector('.fa-xmark')
xMark.addEventListener('click', closeModal)

// //suppression du travail
// const trashBtn = document.querySelector('.fa-trash-can')
// trashBtn.addEventListener('click', handleRemove)

//flèche retour
document.querySelector('.fa-arrow-left').addEventListener('click', (e) => {
    const deleteModal = document.getElementById('delete_modal')
    const addModal = document.getElementById('add_modal')
    addModal.style.display = 'none'
    deleteModal.style.display = 'flex'
})


// //si la fonction est appliquée 
// if (typeof displayModalGallery === "function") {
//     // La fonction a été appliquée
//     console.log("La fonction maFonction a été appliquée !");
// } else {
//     // La fonction n'a pas été appliquée
//     console.log("La fonction maFonction n'a pas été appliquée.");
// }


//bouton qui mène au formulaire d'ajout de photo
document.querySelector('.add_photo_btn').addEventListener('click', (event) => {
    const deleteModal = document.getElementById('delete_modal')
    const addModal = document.getElementById('add_modal')
    deleteModal.style.display = 'none'
    addModal.style.display = 'flex'
})


//formulaire d'ajout de nouvelle photo
const addWorkBtn = document.getElementById('submit_photo_btn')
addWorkBtn.addEventListener('click', addWork)





// // utiliser le token sauvegardé dans le cookie
// const token = sessionStorage.getItem('token');
