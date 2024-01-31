import { genererPhotos } from "./photos.js";


//photos à récupérer

export function suppression(photos){
    // event listener sur clic poubelle
    for (let i = 1; i < (photos.length+1); i++) {
        const bouton = document.querySelector(".trashButton"+i);
        bouton.addEventListener("click", function () {
            console.log("j'ai cliqué sur "+i);
            //
            //demander etes vous sur, si oui suite sinon fermeture fenetre demande
            //
            //
            //
            supprimer(i);
        });
        
    }   
}
// fonction pour supprimer la photo demandée et actualiser l'affichage des 2 galeries
export async function supprimer(i){
    let valeurToken = window.sessionStorage.getItem("token");
    const token = JSON.parse(valeurToken);
    const reponse = await fetch("http://localhost:5678/api/works");
    const photos = await reponse.json();
    await fetch("http://localhost:5678/api/works/"+i, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            "authorization" : "Bearer "+ token+"z"      
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
            }
        })
        .catch((error) => {
            console.log("Une erreur s'est produite lors de la suppression de la photo :",
                error
            );
        });
}



