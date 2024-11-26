// Fichier qui centralise le code pour les appels API
const apiUrl = 'http://localhost:5678/api'; // URL de l'API

// Fonction pour récupérer les travaux
async function getWorksFromAPI() {         // Définir la fonction getWorksFromAPI qui va permettre de récupérer les travaux depuis l'API 
    console.log('Début récupération des travaux');
    try {
        const response = await fetch(`${apiUrl}/works`); // Utiliser la fonction fetch pour envoyer une requête GET à l'URL de l'API pour récupérer les travaux
        console.log('Réponse reçue:', response);

        if (!response.ok) {                           // Vérifier si la réponse est ok 
            throw new Error(`Erreur HTTP: ${response.status}`); // Gérer l'erreur en affichant un message d'erreur avec le code de statut de la réponse
        }

        const works = await response.json();  // Stocker les travaux récupérés dans la variable works en utilisant la méthode json() qui permet de lire le corps de la réponse en tant qu'objet JSON 
        console.log('Travaux récupérés:', works);
        return works;                               // Retourner les travaux récupérés

    } catch (error) {                                 // Gérer les erreurs
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
            throw new Error(`Erreur HTTP: ${response.status}`);          // Gérer l'erreur en affichant un message d'erreur avec le code de statut de la réponse
        }

        const categories = await response.json();       // Stocker les catégories récupérées dans la variable categories en utilisant la méthode json() qui permet de lire le corps de la réponse en tant qu'objet JSON
        console.log('Catégories récupérées:', categories);
        return categories;                              // Retourner les catégories récupérées 
 
    } catch (error) {
        console.error('Erreur catégories:', error);      // Gérer les erreurs
        return [];                                  // Je retourne un tableau vide en cas d'erreur
    }
}

// Fonction pour la connexion utilisateur
async function loginUser(email, password) {             // Définir la fonction loginUser avec les paramètres email et password, cette fonction va permettre de connecter l'utilisateur en utilisant les valeurs de l'email et du mot de passe 
    console.log('Tentative de connexion...');       // Afficher un message dans la console
    try {
        const response = await fetch(`${apiUrl}/users/login`, { // Utiliser la fonction fetch pour envoyer une requête POST à l'URL de l'API pour connecter l'utilisateur en utilisant les valeurs de l'email et du mot de passe 
            method: 'POST',                                     // Définir la méthode de la requête
            headers: {                                           // Définir les en-têtes de la requête 
                'Content-Type': 'application/json'                 // Définir le type de contenu de la requête 
            },
            body: JSON.stringify({ email, password })              // Convertir les valeurs de l'email et du mot de passe en JSON et les envoyer dans le corps de la requête 
        });
        
        if (!response.ok) {                               // Vérifier si la réponse est ok
            throw new Error('Identifiants incorrects');
        }
        
        const data = await response.json();                 // Stocker les données récupérées dans la variable data en utilisant la méthode json() qui permet de lire le corps de la réponse en tant qu'objet JSON
        console.log('Connexion réussie');
        return data;                                        // Retourner les données récupérées, si tout est ok 

    } catch (error) {
        console.error('Erreur connexion:', error);
        throw error;                                    // Gérer les erreurs, throw permet de lancer une exception c'est-à-dire de générer une erreur et de l'envoyer à l'appelant de la fonction. L'appelant doit ensuite gérer cette erreur en utilisant try...catch (par exemple dans le fichier login.js)                                                            
    }
}

// Fonction pour supprimer un travail
async function deleteWork(workId) {
    console.log("Suppression du travail:", workId);
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(`${apiUrl}/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        // if (!response.ok) {
        //     throw new Error('Erreur suppression');
        // }

        console.log("Travail supprimé avec succès");
        return true;

    } catch (error) {
        console.error("Erreur suppression:", error);
        return false;
    }
}

// Fonction pour ajouter un nouveau travail
async function addWork(formData) {
    console.log("Ajout d'un nouveau travail");
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${apiUrl}/works`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData // On utilise FormData pour pouvoir envoyer l'image, où formdata est un objet qui permet de stocker les données du formulaire
        });
        
        if (!response.ok) {
            throw new Error('Erreur ajout projet');
        }
        
        const newWork = await response.json();
        console.log("Nouveau travail ajouté:", newWork);
        return newWork;

    } catch (error) {
        console.error("Erreur lors de l'ajout:", error);
        throw error;
    }
}