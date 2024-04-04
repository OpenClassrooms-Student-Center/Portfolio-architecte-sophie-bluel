// Récupérer le formulaire
const form = document.querySelector('.login__form');

// Ajouter un écouteur d'événement pour le submit du formulaire
form.addEventListener('submit', function(event) {
    // Empêcher le comportement par défaut du formulaire (envoi de la requête)
    event.preventDefault();
    
    // Récupérer les valeurs des champs email et mot de passe
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Créer un objet contenant les données à envoyer
    const data = {
        email: email,
        password: password
    };

    // Envoyer les données au serveur
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la requête.');
        }
        return response.json();
    })
    .then(data => {
        // Traiter la réponse du serveur
        console.log(data);
        // Rediriger l'utilisateur vers une autre page, si nécessaire
        window.location.href = 'page_de_redirection.html';
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi de la requête:', error);
        // Afficher un message d'erreur à l'utilisateur
        const errorDiv = document.querySelector('.alredyLogged__error');
        errorDiv.textContent = 'Erreur dans l\'identifiant ou le mot de passe';
    });
});
