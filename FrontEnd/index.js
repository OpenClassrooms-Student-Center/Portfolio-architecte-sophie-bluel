
// const gallery = document.querySelector(".gallery")  //
// LANCEMENT DE PAGE 
start()

function start() {
  loadWorks()
    .then((works) => {
      // Une fois les travaux recuperes on appel nos fonctions
      clearWorks()
      displayWorks(works) //Transmet works au displayworks
    })
  loadCategories()
  .then ((categories)=>{
    console.log(categories);
    createCategoriesContainer()
      // Une fois les travaux recuperes on appel nos fonctions
      displayCategories(categories) //Transmet categories au displayCategories 
            
  }) 
}

// CREER LES BOUTONS 





//  Cette fonction va lancer clearWorks (pour vider les projets).
function onCategoryClick(clearWorks) {

}


// for (let i = 0; i < categories.length; i++) {
//   const element = categories[i];
// }