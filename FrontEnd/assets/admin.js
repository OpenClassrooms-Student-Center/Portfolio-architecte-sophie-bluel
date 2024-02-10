// async function getWorks() {


//     //recuperer les donnees depuis API
//     const reponse = await fetch("http://localhost:5678/api/works");

//     const travaux = await reponse.json();
//     console.log(travaux);

//     //ajouter les balise au DOM

//     let racinePortfolio = document.querySelector("#portfolio");
//     let galerie = document.querySelector(".gallery");

//     //boucle pour afficher les travaux
//     for (let i = 0; i < travaux.length; i++) {


//         let figure = document.createElement("figure");
//         let img = document.createElement("img");
//         let figcaption = document.createElement("figcaption");


//         galerie.appendChild(figure);
//         figure.appendChild(img);
//         figure.appendChild(figcaption);


//         img.src = travaux[i].imageUrl;
//         figcaption.innerText = travaux[i].title;

//     }
// }

// getWorks();


async function getWorks() {
    let url = 'http://localhost:5678/api/works';
    try {
        let res = await fetch(url);
        console.log(res);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


async function renderWorks() {
    let works = await getWorks();
    let html = '';
    works.forEach(work => {
        let htmlSegment = `<figure>
                                <img src="${work.imageUrl}" >
                                <figcaption>${work.title}</figcaption>
                                
                            </figure>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.gallery');
    container.innerHTML = html;
}

async function getMiniGallery() {
    let works = await getWorks();
    let html = '';
    works.forEach(work => {
        let htmlSegment = `<figure>
                                <img src="${work.imageUrl}" >
                               
                                
                            </figure>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.miniGallery');
    container.innerHTML = html;

}
function closeModalIcon() {
    
    let modal = document.querySelector('.modal');
    let fermer=document.querySelector('.fa-solid');
    fermer.addEventListener("click", (e) => {
        modal.style.display = "none";
    })

  
    
}
function closeModal() {
    
    let modal = document.querySelector('.modal');
    modal.addEventListener("click", (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    })
  
}


function pageConnexion() {

    let liLogin = document.querySelector(".login");
    liLogin.addEventListener("click", (e) => {

        window.location.href = "login.html";


    })

}

function pageAcceuil() {

    const liAcceuil = document.querySelector(".acceuil");
    liAcceuil.addEventListener("click", (e) => {
        window.location.href = "index.html";
        console.log("tu es dans l'acceuil");


    })

}





//si l'utilisateur est connecte on le redirige vers la page profil 
function sessionLogin() {
    const loged = window.sessionStorage.loged;
    console.log(" tu es loger  " + loged);
    const admin = document.querySelector('.admin');
    const logout = document.querySelector('.login');
    if (loged) {


        logout.textContent = "logout";
        admin.textContent = "Admin";


        logout.addEventListener("click", (e) => {
            window.sessionStorage.clear();
            window.location.href = "login.html";
        })
    }

}

function modeCreation() {
    let racine = document.querySelector('body');
    //creer div pour le mode creation
    let div = document.createElement('div');
    div.classList.add('creation');
    div.innerHTML = `<i class="fa-solid fa-pen-to-square"><a href="creation.html">mode creation </a></i>`;
    racine.appendChild(div);



}

function openModal() {

    let modalLien = document.querySelector('.openModal');
    modalLien.addEventListener("click", (e) => {
        //afficher le modale
        let modal = document.querySelector('.modal');
        
        modal.style.display = "flex";


    })

}




function init() {

    getWorks();
    renderWorks();



    pageConnexion();
    pageAcceuil();

    sessionLogin();

    modeCreation();
    openModal();
    getMiniGallery();

    closeModalIcon();
    closeModal();

}

init();
