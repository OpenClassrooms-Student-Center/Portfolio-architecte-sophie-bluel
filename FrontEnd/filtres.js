document.addEventListener('DOMContentLoaded', function () { // Ajout d'un aEL pour chargé mon fichier JS une fois que mon HTML est chargé uniquement
  const globalButton = document.querySelector('.btnGlobal') // Récupération du bouton pour afficher tous les travaux
  const objetsButton = document.querySelector('.btnObjets') // Récupération du bouton pour afficher tous les objets
  const appartementsButton = document.querySelector('.btnAppartements') // Récupération du bouton pour afficher tous les appartements
  const hotelsRestaurantsButton = document.querySelector('.btnHotels') // Récupération du bouton pour afficher tous les hôtels & restaurants

  globalButton.addEventListener('click', function (event) { // Ajout d'un aEL au click pour le bouton 'tous travaux'
    event.preventDefault() // Empêche le comportement par défaut
    try { // Bloc try : Série d'instrutions à effectuer
      galleryList.innerHTML = '' // Efface le contenu de ma galerie
      window.genererTravaux(works) // Recharge mes travaux une fois le filtre appliqué
    } catch (error) { // Le bloc catch attrapera l'erreur si une erreur se produit
      console.error('Une erreur s\'est produite : ' + error) // Affiche un message d'erreur et les détails de l'erreur
    }
  })

  objetsButton.addEventListener('click', function (event) { // Ajout d'un aEL au click pour le bouton 'objets'
    event.preventDefault() // Empêche le comportement par défaut
    try { // Bloc try : Série d'instrutions à effectuer
      const objetsFiltres = works.filter((work) => work.categoryId === 1) // Création de la variable contenant le résultat de mon filtre objet
      galleryList.innerHTML = '' // Efface le contenu de ma galerie
      window.genererTravaux(objetsFiltres) // Recharge mes travaux une fois le filtre objet appliqué
    } catch (error) { // Le bloc catch attrapera l'erreur si une erreur se produit
      console.error('Une erreur s\'est produite : ' + error) // Affiche un message d'erreur et les détails de l'erreur
    }
  })

  appartementsButton.addEventListener('click', function (event) { // Ajout d'un aEL au click pour le bouton 'appartement'
    event.preventDefault() // Empêche le comportement par défaut
    try { // Bloc try : Série d'instrutions à effectuer
      const appartementsFiltres = works.filter((work) => work.categoryId === 2) // Création de la variable contenant le résultat de mon filtre 'appartement'
      galleryList.innerHTML = '' // Efface le contenu de ma galerie
      window.genererTravaux(appartementsFiltres) // Recharge mes travaux une fois le filtre appartement appliqué
    } catch (error) { // Le bloc catch attrapera l'erreur si une erreur se produit
      console.error('Une erreur s\'est produite : ' + error) // Affiche un message d'erreur et les détails de l'erreur
    }
  })

  hotelsRestaurantsButton.addEventListener('click', function (event) { // Ajout d'un aEL au click pour le bouton 'hôtels & restaurants'
    event.preventDefault() // Empêche le comportement par défaut
    try { // Bloc try : Série d'instrutions à effectuer
      const hotelsRestaurantsFiltres = works.filter((work) => work.categoryId === 3) // Création de la variable contenant le résultat de mon filtre 'hôtels & restaurants'
      galleryList.innerHTML = '' // Efface le contenu de ma galerie
      window.genererTravaux(hotelsRestaurantsFiltres) // Recharge mes travaux une fois le filtre appartement appliqué
    } catch (error) { // Le bloc catch attrapera l'erreur si une erreur se produit
      console.error('Une erreur s\'est produite : ' + error) // Affiche un message d'erreur et les détails de l'erreur
    }
  })
})
