 const gallery=document.querySelector(".gallery");
 gallery.innerHTML=""

fetch("http://localhost:5678/api/works")
    .then((response)=>{
     if (response.ok){
         return response.json()
     }
 })
 .then((works)=>{
    
    //pour chaque objet work dans works alors on va ...
     works.forEach(work => {
        //créer une figure + img en html
        const newFigure = document.createElement("figure");
        const newImage = document.createElement("img");
        //Assigner des attributs  (src et alt) aux instances des constantes qui vinnent d'etre crééer ( newImage)
        newImage.src = work.imageUrl;
        newImage.alt = "Photo du projet";
        //Ensuite on va insérer l'image dans la figure avec la fonction appendChild
        newFigure.appendChild(newImage);
        const newFigcaption = document.createElement("figcaption");
        //On assigne la valeur contenue dans l'attribut "title" a la figcaption
        newFigcaption.innerText = work.title;
        newFigure.appendChild(newFigcaption);
        //On réinsere le tout(la figure complète) dans la gallerie
        gallery.appendChild(newFigure);
    });
 })
 //afficher un msg d'erreur à l'ecran si pb avec la fonction
 .catch((err)=>{
     gallery.innerHTML=`<p>Une erreur est survenue (${err})</p>`
 })


 fetch("http://localhost:5678/api/categories")
    .then(response => response.text())
    .then(body => console.log(body))
    .then((categories) =>{
        const createButton= document.createElement('button');
        
        const filterAllbtn = document.querySelector(".filter-all")
        filterAllbtn.addEventListener("click", function () {
            // on affiche tous les travaux 

    })

        const filterObjectsbtn = document.querySelector(".filter-objects")
        filterAllbtn.addEventListener("click", function () {
            // Condition if categoryId === 1
                // On affiche que les travaux des objects 

    })

    })