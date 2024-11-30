// Fichier qui centralise le code pour les appels API
const apiUrl = 'http://localhost:5678/api'; // URL de l'API

// Fonction pour récupérer les travaux
// Définir la fonction getWorksFromAPI qui va permettre de récupérer les travaux depuis l'API 
async function getWorksFromAPI() {         
    console.log('Début récupération des travaux');
    try {
        const response = await fetch(`${apiUrl}/works`); // Utiliser la fonction fetch pour envoyer une requête GET à l'URL de l'API pour récupérer les travaux
        console.log('Réponse reçue:', response);  // J'affiche la réponse reçue dans la console

        if (!response.ok) {                           // Vérifier si la réponse est ok 
            throw new Error(`Erreur HTTP: ${response.status}`); // Gére l'erreur en affichant un message d'erreur avec le code de statut de la réponse 
        }

        const works = await response.json();  // Stocker les travaux récupérés dans la variable works en utilisant la méthode json() qui permet de lire le corps de la réponse en tant qu'objet JSON
        console.log('Travaux récupérés:', works);
        return works;                               // Retourner les travaux récupérés

    } catch (error) {                                 // Gérer les erreurs, (s'il y a une erreur catch l'attrape donc et nous renvoie un tableau vide)
        console.error('Erreur lors de la récupération des travaux:', error);
        return []; // Je retourne un tableau vide en cas d'erreur
    }
}

// Fonction pour récupérer les catégories
async function getCategories() {                 // Définir la fonction getCategories qui va permettre de récupérer les catégories 
    console.log('Début récupération des catégories');
    try {
        const response = await fetch(`${apiUrl}/categories`);          // Utiliser la fonction fetch pour envoyer une requête GET à l'URL de l'API pour récupérer les catégories
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);          // Gérer l'erreur en affichant un message d'erreur avec le statut de la réponse
        }

        const categories = await response.json();       // Stocker les catégories récupérées dans la variable categories en utilisant la méthode json() qui permet de lire le corps de la réponse en tant qu'objet JSON
        console.log('Catégories récupérées:', categories);
        return categories;                              // Retourner les catégories récupérées 
 
    } catch (error) {
        console.error('Erreur catégories:', error);      // Gérer les erreurs
        return [];                                  // Je retourne un tableau vide en cas d'erreur même principe que pour get les works
    }
}

// Fonction pour la connexion utilisateur
async function loginUser(email, password) {             // Définir la fonction loginUser avec les paramètres email et password, cette fonction va permettre de connecter l'utilisateur en utilisant les valeurs de l'email et du mot de passe)
    console.log('Tentative de connexion...');    
    try {
        const response = await fetch(`${apiUrl}/users/login`, { // Utiliser la fonction fetch pour envoyer une requête POST à l'URL de l'API pour connecter l'utilisateur en utilisant les valeurs de l'email et du mot de passe 
            method: 'POST',                                     // ICI c'est la "charge utile " c'est à dire le corps de la requête, on défini la méthode de la requête, ici POST pour créer un nouvel utilisateur (method: est une propriété de la requête et POST le verbe HTTP utiliser pour créer un nouvel utilisateur)
            headers: {                                           // En-tête de la requête
                'Content-Type': 'application/json'                 // Définir le type de contenu de la requête (content-type: application/json, permet d'indiquer au serveur que les données envoyées sont en format JSON)
            },
            body: JSON.stringify({ email, password })              // Convertir les valeurs de l'email et du mot de passe en JSON et les envoyer dans le corps de la requête 
        });
        
        if (!response.ok) {                               // Vérifier si la réponse est ok
            throw new Error('Identifiants incorrects');  // si elle ne l'ai pas lance une erreur qui sera gérer dans le catch, qui lui affichera un message d'erreur
        }
        
        const data = await response.json();                 // Stocker les données récupérées dans la variable data en utilisant la méthode json() qui permet de transformer le corps de la requête en tant qu'objet JSON
        console.log('Connexion réussie');                     // Afficher un message dans la console, que la requêt a réussie
        return data;                                        // Retourner les données récupérées, si tout est ok 

    } catch (error) {                                    //si il y a une erreur je l'affiche dans la console, ici catch l'attrape donc et nous renvoie un tableau vide
        console.error('Erreur connexion:', error);
        throw error;                                    // Gérer les erreurs, throw permet de lancer une exception c'est-à-dire de générer une erreur et de l'envoyer à l'appelant de la fonction. L'appelant doit ensuite gérer cette erreur en utilisant try...catch (par exemple dans le fichier login.js)                                                            
    }
}

// Fonction pour supprimer un travail
async function deleteWork(workId) {    
    console.log("Suppression du travail:", workId);  // On affiche dans la console que le travail est supprimé et workId nous indique donc quel travail est supprimé
    const token = localStorage.getItem('token');  // On recupere le token de l'utilisateur connecté dans le localStorage (car uniquement l'utilisateur qui a un token peut suprimer un work), le token se trouve dans le localStorage car il est stocké lorsque l'utilisateur se connecte et il est stocké dans le localStorage jusqu'a ce qu'il se deconnecte. Il a été stocké en utilisant localStorage.setItem('token', data.token) dans la fonction handlelogin
    
    try {
        const response = await fetch(`${apiUrl}/works/${workId}`, {   // On utilise la fonction fetch pour envoyer une requête DELETE à l'URL de l'API pour supprimer le travail
            method: 'DELETE',                                         // ICI comme ci-dessus, c'est la "charge utile " c'est à dire le corps de la requête, on défini la método de la requête, ici DELETE pour supprimer un travail
            headers: {                                                   // En-tête de la requête, on doit defnir l'identifiant de l'utilisateur connecté, pour pouvoir supprimer le travail seulement si l'utilisateur est connecté
                'Authorization': `Bearer ${token}`  // On ajoute le token d'authentification dans l'en-tête de la requête, ainsi que l'identifiant de l'utilisateur connecté, pour pouvoir supprimer le travail seulement si l'utilisateur est connecté
            }
        });
        
        if (!response.ok) {
            throw new Error('Erreur suppression');
        }

        console.log("Travail supprimé avec succès");
        return true;  // On retourne true si la suppression a fonctionné

    } catch (error) {
        console.error("Erreur suppression:", error);
        return false;     // On retourne false si la suppression a echoué
    }
}

// Fonction pour ajouter un nouveau travail
//pour cette fonction je vais utiliser formdata qui permet d'envoyer des données du formulaire en utilisant le protocole multipart/formdata(commme ela est préciser dans la doc de l'api), (pour formadata je vais utiliser un objet FormData qui permet de stocker les données du formulaire)(cf MDN)
async function addWork(formData) {           
    console.log("Ajout d'un nouveau travail");
    const token = localStorage.getItem('token');  // On recupere le token de l'utilisateur connecté dans le localStorage, si l'utilisateur n'est pas connecté avec son token il ne peut pas ajouter de projet 

    try {
        const response = await fetch(`${apiUrl}/works`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`  // On ajoute le token d'authentification dans l'en-tête de la requête token bearer est un protocole de sécurité qui permet de protéger les données envoyées et reçues entre le client et le serveur et donc il est important de l'ajouter dans l'en-tête de la requête. Le token est stocké dans le localStorage et ici on l'ajoute dans l'en-tête de la requête
            },
            body: formData // FormData data gère automatiquement l'encodage multipart/formdata (defini dans l 'api)(cf MDN), (on ne peut pas ici utilisé le content-type sur application/json car le Json ne permet pas d'envoyer des fichiers,images) On utilise FormData pour pouvoir envoyer l'image, où formdata est un objet qui permet de stocker les données du formulaire
        });
        
        if (!response.ok) {
            throw new Error('Erreur ajout projet');
        }
        
        const newWork = await response.json();  // On recupere le travail nouvellement ajouter, on utiklise .json() pour lire le corps de la requête en tant qu'objet JSON et on le stocke dans la variable newWork
        console.log("Nouveau travail ajouté:", newWork);
        return newWork;  // On retourne le travail nouvellement ajouter 

    } catch (error) {
        console.error("Erreur lors de l'ajout:", error);
        throw error;  // Gérer les erreurs
    }
}