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

    for (let travail in travaux) {
        gallery.innerHTML += `
        <figure data-category="${travaux[travail].category.name}"> 
            <img src="${travaux[travail].imageUrl}" alt="${travaux[travail].title}">
            <figcaption>${travaux[travail].title}</figcaption>
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
        const travaux = await fetchTravaux();
        affichergallery(travaux);
    })
    
    for (let i = 0; i < categories.length; i++) {
        const button = document.createElement('button');
        const idcatfromcat = categories[i].id;
        button.textContent = categories[i].name;
        button.dataset.category = categories[i].name;
        filtres.appendChild(button);

        button.addEventListener("click", () => {
            const catbuttons = button.getAttribute('data-category');
            const figures = document.querySelectorAll(".gallery figure");
            
            figures.forEach(figure => {
                if (figure.getAttribute('data-category') !== catbuttons) {
                    figure.style.display = 'none';
                }
                else {
                    figure.style.display = 'block';
                }
            }
            )
        });
    }
    return(categories)
}

const categories = afficherfiltres()
fetchTravaux().then(travaux => affichergallery(travaux));
