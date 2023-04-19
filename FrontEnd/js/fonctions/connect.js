


const getToken = localStorage.key("SESSION");
const tagLogin = document.querySelector("#login");

/**
 * tell us if the user is connect !
 */
export function ifConnect() {

    if (getToken === "SESSION") {
        tagLogin.innerText = "Déconnexion";
        console.log("Je suis connecté");

    } else {
        tagLogin.innerText = "Login";
        console.log("Je ne suis pas connecté");
    };
};


/**
 * Event onClick for signOut before to go login.html
 */
export function loginButton() {

    tagLogin.addEventListener("click", function () {
        if (getToken === "SESSION") {
            localStorage.removeItem("SESSION");
            window.location.href = './index.html';

        } else {
            window.location.href = './login.html';
            // Appeler la function renderLogin
            console.log("Je ne suis pas connecté");
        };
    });
};
