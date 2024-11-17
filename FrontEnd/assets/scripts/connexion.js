/****** Étape 2.2 Authentification de l'utilisateur ******/
/**
 * Cette fonction "écoute" le clic sur le bouton Se connecter sur la page de connexion.
 */
export function ajouterListenerConnexion() {
    const formulaireConnexion = document.getElementById("formulaireConnexion");
    formulaireConnexion.addEventListener("submit", function(event) {
        event.preventDefault();
    });
}