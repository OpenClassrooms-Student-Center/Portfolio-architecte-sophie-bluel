const {response } = require("express");
//recupération des travaux depuis l'api swagger
async function getWorks() {
    const apiUrl = "http://localhost:5678/api/works";  //je stocke la valeur d l url de l api dans une variable apiUrl
    const response = await fetch(apiUrl); //je fais un fetch de l'url de l'api et je stocke la réponse dans une variable response
    console.log(response);                   //je log la réponse, pour voir si elle est correcte
    
    const works = await response.json(); //je stocke les travaux dans une variable works, la méthode json() permet de convertir la réponse en json
    console.log(works);                   //je log les travaux pour voir si ils sont corrects
}
getWorks();                     //j'appelle la fonction getWorks


// //autre solution avec try catch et les réponses de l'api 
// async function getWorks() {
//     const apiUrlWorks = "http://localhost:5678/api/works"; //je stocke l'url de l'api dans une variable apiUrlWorks

//     // try {
//     //     const response = await fetch(apiUrlWorks); //je fais un fetch de l'url de l'api et je stocke la réponse dans une variable response
//     //     console.log(response); //je log la réponse, pour voir si elle est correcte

//     //     if (response.ok) { //si la réponse est ok
//     //         const works = await response.json(); //je stocke les travaux dans une variable works, la méthode json() permet de convertir la réponse en json
//     //         console.log(works); //je log les travaux pour voir si ils sont corrects
//     //     } else { //sinon
//     //         console.error("Retour du serveur : ", response.status); //je log une erreur
//     //     }
//     // }
//     // catch (error) { //si il y a une erreur
//     //   console.error("Erreur lors de la récupération des travaux : ", error) //je log l'erreur
//     // }

//     //autre idée plutot que celle de l' autocomplétion
//     try {
//         const response = await fatch("http://localhost:5678/api/works");
//         console.log("réponse reçue: ", response);
        

//         // vérificatio du status
//         if (!response.ok) {
//             throw new Error(`Erreur HTTP! Staus : ${response.status}`);
//         }
//         const works = await response.json();
//         console.log("Travaux récupérés : ", works);
//     return works;
//     } catch {
//         console.error("Erreur lors de la récupération des travaux : ", error);
//         return []
//     }
// }
// getWorks(); //j'appelle la fonction getWorks