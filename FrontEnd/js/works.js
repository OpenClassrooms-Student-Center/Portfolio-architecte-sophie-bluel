


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
    
    if (isAuthenticated()) {
        const login_link = document.getElementById('login_link');
        login_link.style.display = 'none';
    } else {
        login_link.style.display = 'block';
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

function displayAllWorks() {
    loadWorks()
    .then((works) => {
      // Une fois les travaux recuperes on appel nos fonctions
      clearWorks()
      displayWorks(works) //Transmet works au displayworks
    })
    
}


function filterWorks(categoryId) {
    loadWorks()
        .then((works) => {
            // Une fois les travaux recuperes on appel nos fonctions
            clearWorks()
          
            const categoryWorks = works.filter(work => work.categoryId ===categoryId)
            displayWorks(categoryWorks) //Transmet works au displayworks
        })
       
}



