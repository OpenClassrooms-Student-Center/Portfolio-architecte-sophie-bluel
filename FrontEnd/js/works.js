


// Supprimer les projets HTML 
function clearWorks() {
    //  images.innerHTML = ""  // VIDE LE CONTENU (html) , plus lent
    //  images.textContent = "" //VIDE LE CONTENU (TEXTE)
    images.replaceChildren() //methode la plus rapide
}
// // Ajouter les projets
function displayWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const work = works[i];
        createWork(work)
    }
}

function createWork(work) {
    const images = document.getElementById("images") //GALERIE IMAGES
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    img.src = work.imageUrl
    img.alt = work.title
    const figcaption = document.createElement("figcaption")
    figcaption.textContent = work.title
    // Ajoute 2 elemnts au partent
    figure.appendChild(img)
    figure.appendChild(figcaption)
    images.appendChild(figure) // rajout en dernier pour empecher les sursauts graphiques
}
function filterWorks(id) {
    console.log(id);
    
}