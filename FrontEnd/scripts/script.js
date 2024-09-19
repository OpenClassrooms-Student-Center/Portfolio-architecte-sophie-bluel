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
    gallery.innerHTML = '';

    for (let i = 0; i < travaux.length ; i++){
    gallery.innerHTML += `
        <figure> 
            <img src="${travaux[i].imageUrl}" alt="${travaux[i].title}">
            <figcaption>${travaux[i].title}</figcaption>
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
        button.id = 'bouton-' + idcatfromcat;
        filtres.appendChild(button);

        button.addEventListener("click", async () => {
            const travaux = await fetchTravaux();
            const travauxfiltres = travaux.filter(travail => travail.category.id === idcatfromcat);
            affichergallery(travauxfiltres);
        });
    }

}

afficherfiltres();
fetchTravaux().then(travaux => affichergallery(travaux));
