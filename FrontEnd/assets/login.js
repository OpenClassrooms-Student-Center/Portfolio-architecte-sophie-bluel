

// Scenario du projet: 

// 1. L utilisateur clique sur se connecter
   //a. L utilisateur est redirigé vers la page de connexion


// 2. L utilisateur rentre son email et son mot de passe
// 3. L utilisateur clique sur le bouton se connecter

    //3.a. le systeme verifie si l utilisateur existe
        //3.a.(1) L utilisateur n existe pas
            //3.a.(2) Le systeme affiche un message d erreur
        //3.a.(3) L utilisateur existe -> on passe à l etape 3.b


    //3.b. Le systeme verifie si le mot de passe est correct
        //3.b.(1). Le mot de passe est incorrect
            //3.b.(2) Le systeme affiche un message d erreur
        //3.b.(3) Le mot de passe est correct -> on passe à l etape 4

//4. L utilisateur est connecté
//5. L utilisateur est redirigé vers la page d accueil pour les utilisateurs connectés
 //6. L utilisateur clique sur le bouton se deconnecter
    //6.a. L utilisateur est deconnecté
    //6.b. L utilisateur est redirigé vers la page d'accueil pour les utilisateurs non connectés


    //TESTS

    

//variables globales



//  const gallery = document.querySelector('.gallery')// selectionne la div "gallery"
//const response = await fetch(`http://localhost:5678/api/works`)//recupere les donnees de l'api
//console.log(response);//affiche les donnees de l'api
//const projects = await response.json() //transforme les donnees en json

//console.log(gallery);//affiche la classe gallery






//1. L'utilisateur ajoute des images
    //1.a. L utilisateur clique sur le bouton ajouter une image
    //1.b. La fenetre d'ajout d'image s'ouvre
    //1.c. L utilisateur selectionne une image
    //1.d. L utilisateur doit nommer l'image
    //1.d. L utilisateur clique sur le bouton ouvrir/ajouter
    //1.e. La fenetre d'ajout d'image se ferme
    //1.f. L'image se telecharge 
    //1.g. L image est ajoutée à la liste des images de l utilisateur


//2. L utilisateur supprime des images
    //2.a. L utilisateur clique sur le bouton supprimer une image
    //2.b. La fenetre de suppression d'image s'ouvre
    //2.c. L utilisateur selectionne une image
    //2.d. L utilisateur clique sur le bouton supprimer
    //2.e. La fenetre de suppression d'image se ferme
    //2.f. L'image est supprimée de la liste des images de l utilisateur


//3. L'utilisateur filtre des images
//3.a. L utilisateur clique sur le bouton filtrer
//3.b. La fenetre de filtrage s'ouvre
//3.c. L utilisateur selectionne un filtre
//3.d. L utilisateur clique sur le bouton appliquer
//3.e. La fenetre de filtrage se ferme
//3.f. L'image est filtrée

    

