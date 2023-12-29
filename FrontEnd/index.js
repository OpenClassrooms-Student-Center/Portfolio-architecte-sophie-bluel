
// const gallery = document.querySelector(".gallery")  //
// LANCEMENT DE PAGE 
loadCategories()
  .then((categories) => {
    createCategoriesContainer()
    // Une fois les travaux recuperes on appel nos fonctions
    displayCategories(categories) //Transmet categories au displayCategories 

  })
displayAllWorks()
