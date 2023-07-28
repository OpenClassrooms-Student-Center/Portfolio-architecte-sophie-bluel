document.querySelector('.form-login').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(function (response) {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Erreur d\'authentification');
            }
        })
        .then(function (data) {
            localStorage.setItem('token', data.token);
            window.location.href = '/FrontEnd/index.html';
        })
        .catch(function (error) {
            document.querySelector('.wrong-user-notification').textContent = error.message;
        });
});