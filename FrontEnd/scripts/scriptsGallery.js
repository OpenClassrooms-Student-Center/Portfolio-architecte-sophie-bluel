
// // //récupération des travaux de l'API

//const { response } = require("express");

//  async function getWorks() {
//      const apiUrlWorks = 'http://localhost:5678/api/works'; //url de l'API
//     
//      const response = await fetch(apiUrlWorks, {        //
//          headers: {                                  //on envoie des headers
//              'Accept': 'application/json'            //on accepte du json
//          }
//      });
//      console.log(response);
//      const works = await response.json();        //on attend la réponse de la requête et on la met dans la variable works
//      console.log(works);                        //on affiche les travaux dans la console
    
// }

// getWorks();

//autre solution avec try... catch et les réponses de l'api
const apiUrlWorks = "http://localhost:5678/api/works"; 
console.log(apiUrlWorks)

async function getWorks() {
    try {
        const response = await fetch(apiUrlWorks);
        console.log("réponse reçue: ", response);
    
        // vérification du status
        if (!response.ok) {
            throw new Error(`Erreur HTTP! Status : ${response.status}`);
        }
        const works = await response.json();
        console.log("Travaux récupérés : ", works);
    return works;
    } catch (error){
        console.error("Erreur lors de la récupération des travaux : ", error);
        return []
    }
}
 getWorks(); 


 //ajout des travaux dans la galerie 
 async function addWorksGAllery () {
    const works = await getWorks();
    console.log("Travaux ajouter à la gallerie : ", works);

    const WorksContainer = document.querySelector(".gallery");
    WorksContainer.innerHTML = '';

    for (const work of works) {
        const workElement = document.createElement('figure');
        workElement.className = 'work';
        workElement.innerHTML =`
        <img src="${work.imageUrl}" alt="${work.title}"/>
        <figcaption>${work.title}</figcaption>
        `;

        WorksContainer.appendChild(workElement);
    }
    console.log("Tous les travaux ont été ajouté : ", WorksContainer);
    
 }
 
    addWorksGAllery();

console.log('Scriptexecuté jusqu\' la fin');

 