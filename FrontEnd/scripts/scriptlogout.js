let Logout = document.getElementById("logoutmenu");

Logout.addEventListener("click", () => {
        localStorage.removeItem('token');
        
        location.href= "file:///C:/Users/heloi/Documents/Projets/Projet_3/Portfolio-architecte-sophie-bluel/FrontEnd/index.html"
}) 




