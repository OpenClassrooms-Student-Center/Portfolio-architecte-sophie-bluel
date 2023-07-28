window.addEventListener('load', function () {
    var loginLink = document.getElementById('login-link');
    var token = localStorage.getItem('token'); 

    if (token) {
        loginLink.innerHTML = '<a href="#" id="logout-action">logout</a>'; 
        document.getElementById('logout-action').addEventListener('click', logout); 
    }

    function logout() {
        localStorage.removeItem('token');
        window.location.href = 'login.html'; 
    }
});