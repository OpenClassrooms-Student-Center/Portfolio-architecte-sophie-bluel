
console.log('rrr');
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password');
    if (password) {
        password = password.value;
    }
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then(response => {
            if (response.status == "200") {
                return response.json();
            } else {
                throw new Error(response.status)
            }
        })
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/FrontEnd/Homepage_edit.html';
                return
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const errorMessageElement = document.getElementById('errorMessage');
            errorMessageElement.textContent = 'Erreur dans l’identifiant ou le mot de passe';
            errorMessageElement.classList.add('error');
            errorMessageElement.style.display = 'block';
        });
});
