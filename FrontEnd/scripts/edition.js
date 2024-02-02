let valeurToken = window.sessionStorage.getItem("token");
const token = JSON.parse(valeurToken);
console.log(token);


//FONCTIONS UTILISEES


//affichage image avant envoi à créer


//fonction pour ajouter une photo  NE FONCTIONNE PAS
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







     
    


