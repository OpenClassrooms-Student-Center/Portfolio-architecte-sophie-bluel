// FICHIER CENTRALISANT LES APPELS A L'API
export const apiUrl = 'http://localhost:5678/api'; 

// RECUPERER LES TRAVAUX DEPUIS L'API
export async function getWorksFromAPI() {         
    console.log('Début récupération des travaux');
    try {
        const response = await fetch(`${apiUrl}/works`); 
        console.log('Réponse reçue:', response);  

        if (!response.ok) {                           
            throw new Error(`Erreur HTTP: ${response.status}`); 
        }

        const works = await response.json();  
        console.log('Travaux récupérés:', works);
        return works;                               

    } catch (error) {                                 
        console.error('Erreur lors de la récupération des travaux:', error);
        return []; 
    }
}

// RECUPERER LES CATEGORIES
export async function getCategories() {                 
    console.log('Début récupération des catégories');
    try {
        const response = await fetch(`${apiUrl}/categories`);         
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);    
        }

        const categories = await response.json(); 
        console.log('Catégories récupérées:', categories);
        return categories;                             
 
    } catch (error) {
        console.error('Erreur catégories:', error);      
        return [];                  
    }
}

// CONNEXION UTILISATEUR
export async function loginUser(email, password) {         
    console.log('Tentative de connexion...');    
    try {
        const response = await fetch(`${apiUrl}/users/login`, { 
            method: 'POST',                                    
            headers: {                                        
                'Content-Type': 'application/json'          
            },
            body: JSON.stringify({ email, password })            
        });
        
        if (!response.ok) {                             
            throw new Error('Identifiants incorrects'); 
        }
        
        const data = await response.json();              
        console.log('Connexion réussie');                  
        return data;                                      

    } catch (error) {                                  
        console.error('Erreur connexion:', error);
        throw error;                                                                                              
    }
}

// SUPPRIMER UN WORK
export async function deleteWork(workId) {    
    console.log('Suppression du travail:', workId);  
    const token = localStorage.getItem('token');  // On recupere le token de l'utilisateur connecté dans le localStorage (car uniquement l'utilisateur qui a un token peut suprimer un work), le token se trouve dans le localStorage car il est stocké lorsque l'utilisateur se connecte et il est stocké dans le localStorage jusqu'a ce qu'il se deconnecte. Il a été stocké en utilisant localStorage.setItem('token', data.token) dans la fonction handlelogin
    
    try {
        const response = await fetch(`${apiUrl}/works/${workId}`, {  
            method: 'DELETE',                                         
            headers: {                          
                'Authorization': `Bearer ${token}`  // On ajoute le token d'authentification dans l'en-tête de la requête, ainsi que l'identifiant de l'utilisateur connecté, pour pouvoir supprimer le travail seulement si l'utilisateur est connecté
            }
        });
        
        if (!response.ok) {
            throw new Error('Erreur suppression');
        }

        console.log('Travail supprimé avec succès');
        return true; 

    } catch (error) {
        console.error('Erreur suppression:', error);
        return false;     
    }
}

// AJOUTER UN WORK
export async function addWork(formData) {           
    console.log('Ajout d\'un nouveau travail');
    const token = localStorage.getItem('token');  // On recupere le token, de l'utilisateur connecté, dans le localStorage, si l'utilisateur n'est pas connecté avec son token il ne peut pas ajouter de projet (le token a été stocké dans le localStorage lors de la connexion de l'utilisateur, il a été créee en utilisant localStorage.setItem('token', data.token) dans la fonction handlelogin)

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
        
        const newWork = await response.json();  
        console.log('Nouveau travail ajouté:', newWork);
        return newWork; 

    } catch (error) {
        console.error('Erreur lors de l\'ajout:', error);
        throw error;  
    }
}