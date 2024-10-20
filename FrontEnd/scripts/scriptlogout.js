let Logout = document.getElementById("logout-menu");

Logout.addEventListener("click", () => {
        localStorage.removeItem('token');
        
        location.reload();
}) 




