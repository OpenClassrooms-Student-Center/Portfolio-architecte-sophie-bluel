async function createGallery(){  // On crée une fonction asynchrone qui permettra d'afficher les images dans la galerie //
    const works = await getWorks();
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = '';
    
    let categories = [];

    works.forEach(work=> {    // On crée un DOM HTML pour chaque travaux //
        const element = document.createElement("figure");  
        const imgElement = document.createElement("img");
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = work.title;
        imgElement.src = work.imageUrl;
        element.dataset.id = work.id;
        element.dataset.category = work.category.name;
        element.appendChild(imgElement);
        element.appendChild(captionElement);      
        gallery.appendChild(element);

        categories.push(work.category.name);
    });

    categories.unshift('Tous');
    const cleanCategories = new Set(categories);  // On crée une constante permettant de supprimer les doublons de catégorie pour les filtres //
    
    cleanCategories.forEach(category=> {      // Pour chaque catégorie unique on crée un bouton //           

        const buttonElement = document.createElement("button");
        buttonElement.innerText = category;
        buttonElement.dataset.category = category;
        if(category === 'Tous'){                      // le bouton 'tous' est activé par défaut //
            buttonElement.classList.add("activefilter");
        }
        document.querySelector(".filtersdiv").appendChild(buttonElement);

        buttonElement.addEventListener("click", function(e) {     // lorsque l'on clique sur un bouton de filtre on affiche seulement les travaux correspondant à sa catégorie //
            e.preventDefault();
            console.log(buttonElement.dataset.category);
            const filters = document.querySelector(".filtersdiv");
            const filtersArray = Array.from(filters.children);
            filtersArray.forEach(buttonElement=> {
                buttonElement.classList.remove("activefilter");
            }); 
            buttonElement.classList.add("activefilter");

            let figure = document.querySelectorAll('.gallery figure');
            figure.forEach(figurework=> {
                if(buttonElement.dataset.category === 'Tous') {
                    figurework.classList.remove("no-show"); 
                }
                else if(figurework.dataset.category === buttonElement.dataset.category) {
                    figurework.classList.remove("no-show"); 
                }
                else {
                    figurework.classList.add("no-show");
                }
            });
        });
    });
}

createGallery(); // exécution de la fonction //

if(localStorage.getItem("token") != null){       // si l'utilisateur est connecté (le token est donc actif), affiché le mode admin sur le site //
    document.querySelector('body').classList.add("user-logged");
}

document.querySelector("#logout-button").addEventListener("click",function(){        // en cliquant sur le bouton 'logout' le token de connexion est retiré //
    localStorage.removeItem("token")                                                 // et l'utilisateur est déconnecté //
    document.location.href='index.html';
})
