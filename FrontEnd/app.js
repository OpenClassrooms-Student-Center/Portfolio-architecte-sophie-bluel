//version de Philippe
/*
const openModal = function(e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.setAttribute('aria-hidden', false)
    target.setAttribute('aria-modal', true)
}

document.querySelectorAll(".js-modal").forEach(a=> {
    a.addEventListener('click', openModal)
})
console.log(openModal)



    /*
const openModal =  function(e){
    
    
    console.log(target)

    target.style.display = null

    target.addEventListener('click', closeModal)
    target.querySelector('.js-modal-close').addEventListener('click', closeModal)
    target.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)

}
*/
//ouverture et fermeture de la modale

let modal = null

 const openModal = function(e) {
    e.preventDefault()
    const target = document.querySelector('#modal1')
    target.style.display = null
    
    target.setAttribute('aria-hidden', false)
    target.setAttribute('aria-modal', true)
    modal = target
   modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}


const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
e.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener('click', openModal)
});

// Récupération de l'élément du DOM qui accueillera le bouton
//const modalWrappper = document.querySelector(".modal-wrapper");



//Alimentation de la modale
const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();



function genererProjets(projets){
    for (let i = 0 ; i < projets.length; i++) {
        const projet = projets[i];
     
        // Récupération de l'élément du DOM qui accueillera figures
       const galleryModal = document.querySelector(".gallery_modal");

        // Création d’une balise dédiée au projet
        const figure = document.createElement("figure");
        figure.id = i + 1
        figure.className = "figures"
        galleryModal.appendChild(figure);
                
        // Création des balises 
        const image = document.createElement("img");
        image.src = projet.imageUrl;
        figure.appendChild(image)

        const figcaption = document.createElement("figcaption");
        figcaption.innerText = "editer";
        figure.appendChild(figcaption);
        

        const suppression = document.createElement("button");
        suppression.className = "boutonSuppression"
        figure.appendChild(suppression);

        const iconSuppression = document.createElement("img");
        iconSuppression.className = "fa-solid fa-trash-can";
        iconSuppression.src = "assets/icons/trash-can-solid.svg"
        suppression.appendChild(iconSuppression)
        


        //problème à voir avec le bouton deplacement
        function genererBoutonDeplacement() {
        const boutonDeplacement = document.createElement("button");
        boutonDeplacement.className = "boutonDeplacement"
        boutonDeplacement.id = i +1
        boutonDeplacement.style = "display:none"
        
        figure.appendChild(boutonDeplacement);
        figure.addEventListener("mouseover", function() {
            if(boutonDeplacement.id === figure.id) {
            boutonDeplacement.style = "display:block"
              }


              
        })
          
        const iconDeplacement = document.createElement("img");
        iconDeplacement.className = "fa-solid fa-arrows-up-down-left-right"
        iconDeplacement.src = "assets/icons/arrows-up-down-left-right-solid.svg"
        boutonDeplacement.appendChild(iconDeplacement)
        }

         genererBoutonDeplacement() 



        function effacerBoutonDeplacement() {
            const boutonDeplacement = document.querySelectorAll(".boutonDeplacement")
            const modalWrapper = document.querySelector(".modal-wrapper"); 
            boutonDeplacement.id = i + 1
           
            modalWrapper.addEventListener("mouseover", function() {

            boutonDeplacement.style = "display:none";
            console.log(boutonDeplacement.style)
        })
        }
   
        effacerBoutonDeplacement()

    }
    
}



// premier affichage de la page
genererProjets(projets)


   
//Suppression des projets
function suppressionProjets () {
   
    for (let i = 0; i < projets.length; i++) {
        const boutonSuppression = document.querySelectorAll(".boutonSuppression")  
        boutonSuppression[i].type = "submit"
        boutonSuppression[i].id =  i + 1
        boutonSuppression[i].addEventListener("click", function() {
        
        

//comment faire la requête
        const element= document.querySelector("figure")
        fetch("http://localhost:5678/api/users/works/id", {method: 'DELETE', headers: {
        "Content-Type": "application/json"}, body: JSON.stringify(boutonSuppression[i].id)})
        .then(() => element.innerHTML = " ")

        })
    }
    


}
suppressionProjets()
  




