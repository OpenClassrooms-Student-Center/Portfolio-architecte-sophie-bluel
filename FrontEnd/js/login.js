import utils from './utils.js';

const formLogin = document.querySelector('.login-form');

formLogin.addEventListener('submit', async function (event) {
    //to not change URL and recharge page
    event.preventDefault();

    const form = event.target;
    //creation of body to fetch
    const userData = {
        email: form.elements.email.value,
        password: form.elements.password.value,
    };

    //move to auth
    const login = await utils.callAPI(
        '/users/login',
        'POST',
        JSON.stringify(userData)
    );

    if (login.error) {
        alert('Échec de la connexion');
        return;
    }

    localStorage.setItem('loginToken', login.token);
    //until here
    location.href = 'admin.html';
});
