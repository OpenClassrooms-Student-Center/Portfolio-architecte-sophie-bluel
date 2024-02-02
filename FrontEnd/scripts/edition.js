//import { genererPhotos } from "./photos.js";

let valeurToken = window.sessionStorage.getItem("token");
const token = JSON.parse(valeurToken);
//const reponse = await fetch("http://localhost:5678/api/works");
//const photos = await reponse.json();


export function suppression(photos){
    // event listener sur clic poubelle
    for (let i = 0; i < (photos.length); i++) {
        const bouton = document.querySelector(".trashButton"+i);
        bouton.addEventListener("click", function (event) {
            event.preventDefault();
            //
            //demander etes vous sur, si oui suite sinon fermeture fenetre demande
            //
            //

            supprimer(photos[i].id);


            return false;
        });
        
    }   
}


// fonction pour supprimer la photo demandée et actualiser l'affichage des 2 galeries

// GESTION ERREUR PAS OK ET FERMETURE MODALE a ne pas fermer

async function supprimer(i){


    await fetch("http://localhost:5678/api/works/"+i, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "Authorization" : "Bearer "+ token     
        } 
    })
        .then((response) => {
            console.log(response.status);
            if (response.status === 204) {
                const gallery = document.querySelector(".gallery");
                document.querySelector(".gallery").innerHTML = "";
                genererPhotos(photos, gallery, true);
                const miniatures = document.querySelector(".miniatures");
                document.querySelector(".miniatures").innerHTML = "";
                genererPhotos(photos, miniatures, false);
                return false;
            }
        })
        .catch((error) => {
            console.log("Une erreur s'est produite lors de la suppression de la photo :"+error);
        });
}

//affichage image avant envoi
//TROP COMPLIQUE AUJOURD'HUI !!!!!!!!!!!!!

//fonction pour ajouter une photo
// NE FONCTIONNE PAS
async function envoiPhoto() { 
    const envoi = document.querySelector(".fenetreAjout .valider");
    envoi.addEventListener ("submit", (event2)=> {
        event2.preventDefault();
        const photo = document.getElementById("photo");
        const titre = document.getElementById("titre").value;
        const categorie = document.getElementById("categorie").value;
        const formData = new FormData();
        formData.append("image", photo.files[0]);
        formData.append("title", titre);
        formData.append("category", categorie);
        
        console.log(formData);
        //try{
            const res = fetch("http://localhost:5678/api/works",{
                method : "POST",
                headers : {
                    "Accept" : "application/json",
                    "Authorization" : "Bearer "+ token,
                    "Content-Type" : "multipart/form-data",
                },
                body : formData
            });
            const resData =  res.json();
            console.log(resData);
        
        //}
        //catch (error){
            //console.log(error.message);
        //}
        
       
    });
}

envoiPhoto();


     
    


