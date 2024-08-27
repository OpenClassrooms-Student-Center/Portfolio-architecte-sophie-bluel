
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
    displayModalGallery()
}


//faire apparaitre la galerie
function displayModalGallery() {
    const imgContainer = document.querySelector('.img_container')
    //évite liste infinie des works
    imgContainer.innerHTML = ''
    let articles = document.works.map(renderModalWork)
    console.log('articles', articles)
    // articles.forEach(imgContainer.appendChild);
    articles.forEach(function (article) {
        console.log(article)
        imgContainer.appendChild(article)
    })
}

//rendu d'un travail en élément
function renderModalWork(work) {
    let article = document.createElement('article');
    article.classList.add('work');
    let img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt = work.title;
    article.appendChild(img);
    let button = document.createElement('button')
    let i = document.createElement('i')
    i.classList.add('fa-solid', 'fa-trash-can')
    //bouton supprimer img
    button.addEventListener('click', handleRemove(work.id))
    button.appendChild(i)
    article.appendChild(button)

    return article
}

//Partie de l'ajout d'un nouveau travail
const addModal = document.getElementById('add_modal')

// function addWork(image, title, category) {

//     try {
//         //envoi des données de formData via requête HTTP
//         await createWork(image, title, category)

//         const formData = new FormData();
//         formData.append('image', selectedImg);
//         formData.append('title', titleContent)
//         formData.append('category', selectedCategory)
//         console.log(formData)

//         // if (selectedImg === image && titleContent === title && selectedCategory === category) {
//         if (selectedImg && titleContent && selectedCategory) {
//             //on récup la galerie
//             const gallery = document.querySelector('.gallery')
//             //on reconstruit la structure d'accueil d'un travail
//             let figure = document.createElement('figure');
//             figure.classList.add('work');
//             let img = document.createElement('img');
//             img.src = selectedImg;
//             img.alt = titleContent;
//             figure.appendChild(img);
//             let figcaption = document.createElement('figcaption');
//             figcaption.textContent = titleContent;
//             figure.appendChild(figcaption);
//             //ajout dans la galerie
//             gallery.appendChild(figure)

//         } else {
//             alert('Une erreur s\'est produite lors de l\'ajout de votre projet');
//             addModal.reset()
//         }
//     }
//     catch (error) {
//         console.log(error)
//     }
// }


function handleRemove(workId) {
    return async function () {
        try {
            await deleteWork(workId)
            document.works = document.works.filter((work) => {
                if (work.id === workId) {
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

//fonctionnement de certains éléments de la modale
function initModal() {
    //ouverture de modale au click du btn modif
    const modifBtn = document.querySelector('.modif')
    modifBtn.addEventListener('click', openModal)

    //application de fermeture la modale
    const xMark = document.querySelector('.x1')
    const xMark2 = document.querySelector('.x2')
    xMark.addEventListener('click', closeModal)
    xMark2.addEventListener('click', closeModal)

    //flèche retour
    document.querySelector('.fa-arrow-left').addEventListener('click', (e) => {
        const deleteModal = document.getElementById('delete_modal')
        addModal.style.display = 'none'
        deleteModal.style.display = 'flex'
    })

    //bouton qui mène au formulaire d'ajout de photo
    document.querySelector('.add_photo_btn').addEventListener('click', (event) => {
        const deleteModal = document.getElementById('delete_modal')
        deleteModal.style.display = 'none'
        addModal.style.display = 'flex'
    })
    initModalForm()
}

//fonction qui affiche l'image téléchargée
function togglePreview() {
    document.querySelector('.img_downloader').classList.add('toggle_hide')
    document.querySelector('.img_preview').classList.add('toggle_show')
}

const imageInput = document.getElementById('file');

//écouteur d'événement qui change la valeur de l'input
imageInput.addEventListener('change', function (event) {
    //récup du conteneur
    const addContainer = document.querySelector('.add_container')
    //je crée l'élément destiné à accueillir l'affichage de l'img téléchargée et lui donne une classe
    const imgPreview = document.createElement('img')
    imgPreview.classList.add('img_preview')
    addContainer.appendChild(imgPreview)

    //j'accède au fichier sélectionné
    const file = event.target.files[0]
    //instace qui permet de lire le contenu du fichier
    const reader = new FileReader()
    reader.addEventListener('load', function () {
        //permet d'obtenir l'URL de l'image sous forme de chaîne encodée (en base64)
        imgPreview.src = reader.result;
    })

    //verification de la taille de l'image (à savoir 4Mo max)
    if (file.size > 4 * 1024 * 1024) {
        alert('La taille maximale autorisée pour l\'image est de 4 Mo')
        imageInput.value = ''
    } else if (file) {
        //démarre la lecture du fichier avec la méthode suivante + affiche l'img 
        reader.readAsDataURL(file)
        togglePreview()
    }
})

//récup des champs de saisie/selection du formulaire
const titleInput = document.getElementById('title')
const categoryInput = document.getElementById('category')

//validation des champs de saisie du formulaire
function validModalForm() {

    const titleContent = titleInput.value

    const selectedCategory = Number(categoryInput.value)
    console.log('imageInput.files', imageInput.files)
    console.log('titleContent.length', titleContent.length)
    console.log('selectedCategory', selectedCategory)

    if (imageInput.files.length === 0 || titleContent.length === 0 || selectedCategory === 0) {
        return false
    } else {
        return true
    }
}

//validation du formulaire + ajout d'un nouveau travail
function initModalForm() {
    const titleContent = titleInput.value
    //activation du btn si un des champs n'est pas remplis
    titleInput.addEventListener('change', () => {
        if (imageInput.files.length === 0 || titleContent.length === 0 || selectedCategory === 0) {
            addWorkBtn.classList.remove('btn-disabled')
        } else {
            addWorkBtn.classList.add('btn-disabled')
        }
    })

    //récup du bouton d'ajout de nouvelle photo du formulaire d'ajout
    const addWorkBtn = document.getElementById('submit_photo_btn')


    addWorkBtn.addEventListener('click', async (event) => {
        event.preventDefault()

        //image sélectionnée
        const selectedImg = imageInput.files[0]
        //pareil mais pour le titre
        const titleInput = document.getElementById('title')
        const titleContent = titleInput.value
        //pareil mais pour la catégorie
        const categoryInput = document.getElementById('category')
        const selectedCategory = categoryInput.value
        console.log(titleContent, selectedImg, selectedCategory)

        if (validModalForm()) {
            console.log('envoi')
            //envoi de la requête pour l'ajout d'un nouveau travail + récup du résultat
            let result = await createWork(selectedImg, titleContent, selectedCategory)
        } else {
            alert('Veuillez remplir tous les champs !')
        }
    })
}

initModal() 