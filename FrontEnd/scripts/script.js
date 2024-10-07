async function fetchTravaux() {
    const reponse = await fetch('http://localhost:5678/api/works'); 
    const travaux = await reponse.json(); 
    return travaux
} 

async function fetchCategories() { 
    const reponse = await fetch ('http://localhost:5678/api/categories');
    const categories = await reponse.json()
    return categories
}

async function affichergallery(travaux) { 
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    for (let travail of travaux) { 
        gallery.innerHTML += `
        <figure data-category="${travail.category.name}"> 
            <img src="${travail.imageUrl}" alt="${travail.title}">
            <figcaption>${travail.title}</figcaption>
        </figure> `;
    }
}

async function afficherfiltres() {
    const categories = await fetchCategories();
    const filtres = document.querySelector("#filtres");
    
    const buttonreset = document.createElement('button');
    buttonreset.textContent = "Tous";
    filtres.appendChild(buttonreset);

    buttonreset.addEventListener("click", async () => {
        const figures = document.querySelectorAll(".gallery figure");
            
        figures.forEach(figure => {
            figure.style.display = 'block';
        });
    });
    
    for (category of categories) {
        const button = document.createElement('button');
        const idcatfromcat = category.id;
        button.textContent = category.name;
        button.dataset.category = category.name;
        filtres.appendChild(button);

        button.addEventListener("click", () => {
            const category = button.getAttribute('data-category');
            const figures = document.querySelectorAll(".gallery figure");
            
            figures.forEach(figure => {
                if (figure.getAttribute('data-category') === category) {
                    figure.style.display = 'block';
                }
                else {
                    figure.style.display = 'none';
                }
            });
        });
    }
    return(categories)
}

function initpage() {
const categories = afficherfiltres()
fetchTravaux().then(travaux => affichergallery(travaux));
}

initpage()

document.addEventListener("DOMContentLoaded", () => {
    let token = localStorage.getItem('token');

    if (token) {
        loginmenu.style = "display: none";
        filtres.style= "visibility: hidden";
        logoutmenu.style = "display: block";
        boutonmodifier.style = "display: block";
        barreinfoconnexion.style = "display: flex";
    }
});