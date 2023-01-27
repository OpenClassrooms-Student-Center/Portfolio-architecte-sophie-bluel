const FormValidImg = document.forms["ajout-image-presentation"];
const title = document.querySelector('#title');
const inputFile = document.querySelector('#image');
const typePhoto = document.querySelector("#Category");

let user = JSON.parse(sessionStorage.getItem('user'));
console.log(user.token);

FormValidImg.addEventListener("submit",function(e){
    e.preventDefault();


fectPhoto();

});
async function fectPhoto(){ 
let valeurForm = new FormData();
valeurForm.append("title",title.value);
valeurForm.append("image",inputFile.value);
valeurForm.append("category",typePhoto.value);

    const response = await fetch("http://localhost:5678/api/works",{
    method:'POST',
    headers:{
        "accept":"application/json",
        "content-Type":"multipart/form-data",
        "content-Type":"text/html",
        "authorization":"bearer "+ user.token
    },
    body:valeurForm
})
.then(response => response.json())
.then(data => {
    console.log(data)
})
.catch(error => {    
    console.error('Error:', error);
    console.log(JSON.stringify(error));
});}

// function imgPost(){
//     fetch("http://localhost:5678/api/works",{
//     method:"POST",
//     headers:{
//         "authorization":"bearer "+ document.cookie,
//         "accept": "application/json",
//         "content-Type":"multipart/form-data",
//         "content-Type:":"text/html"
//     },
//     body:JSON.stringify({
//         "image":inputFile.value,
//         "title":title.value,
//         "category":category
//     })
// })
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// })
// .catch(error => {    
//     console.error('Error:', error);
// });}




// async function postImg (){
//     try {
//         let reponse = await fetch("http://localhost:5678/api/works",{
//             method:'post',
//             headers:{
//                 'authorization':'bearer'+ document.cookie,
//                 'content-type':'multipart/form-data',
//                 "accept": "application/json"
//             },
//             body:JSON.stringify({
//                         "image":inputFile.value,
//                         "title":title.value,
//                         "categoryId":category
//                     })

//         });
//         let data = await reponse.json();
//         console.log("coucou")
//         console.log(data);
//         return data;
//     } catch(err) {
//         console.log('error:',error);
//         return err;
//     }
// }


// FormValidImg.addEventListener("submit",function(e){
//      const title = document.querySelector('#title-img');
//     const inputFile = document.querySelector('#image-uploads');
//     let category = 0;
//     let typePhoto = document.querySelector("#Categorie-name");

//     if (typePhoto.value = "Objets") {
//         category=1;
//     }
//     if (typePhoto.value = "Appartements") {
//         category=2;
//     }
//     if (typePhoto.value = "Hotels & restaurants") {
//         category=3;
//     }
//     else{
//         console.log("mauvaise option")
//     }
//     let result = await postImg();
//     console.log(result);
// });