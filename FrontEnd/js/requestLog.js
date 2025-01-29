export async function requestLog(email, password) {

    const data = {
        email: email,
        password: password
    }
    
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    console.log(reponse.status);

    if (reponse.status === 200){
        let authData = await reponse.json();
        authData = JSON.stringify(authData);
    
        sessionStorage.setItem("authData", authData);
        window.location.replace("index.html")
        //let banniereEdit = document.querySelector("#banniere-edit");
        //banniereEdit.style.display = "flex";

    }else {
        const messageErreur = document.createElement("h3");
        messageErreur.innerText = "Erreur dans l'identifiant ou le mot de passe";
        document.querySelector("#erreur-connexion").appendChild(messageErreur);
    }
    
}

export function verifAuthor(){

    const authData = window.sessionStorage.getItem("authData");
    const auth= JSON.parse(authData)
    let banniereEdit = document.querySelector(".banniere-edit");
    let boutonEdit = document.querySelector(".button");
    let filtres = document.querySelector(".filtres");
    let filtresOff = document.querySelector(".filtres-off");
    let loginLink = document.querySelector("#login-link");
    let logoutLink = document.querySelector("#logout-link");
    
    if(auth !== null) {
        if(logoutLink.classList.contains("hidden")){
            logoutLink.classList.remove("hidden");
            loginLink.classList.add("hidden");
        }
        if (filtres){
            filtres.classList.replace("filtres", "filtres-off");
        }
        if(banniereEdit.innerHTML === ""){
           let editSquare = document.createElement("span");
           editSquare.classList.add("material-symbols-outlined");
           editSquare.innerText = "edit_square";
           let modifText = document.createElement("p");
           modifText.innerText = "Mode édition";

           banniereEdit.appendChild(editSquare);
           banniereEdit.appendChild(modifText);
        }

        if(boutonEdit.innerHTML === ""){
            let editSquareB = document.createElement("span");
            editSquareB.classList.add("material-symbols-outlined");
            editSquareB.innerText = "edit_square";
            let modifTextB = document.createElement("p");
            modifTextB.innerText = "modifier";
 
            boutonEdit.appendChild(editSquareB);
            boutonEdit.appendChild(modifTextB);
        }

    }else{
        if(loginLink.classList.contains("hidden")){
            loginLink.classList.remove("hidden");
            logoutLink.classList.add("hidden");
        }
        if (filtresOff){
            filtresOff.classList.replace("filtres-off", "filtres");
        }

        if(banniereEdit.innerHTML !== ""){
            banniereEdit.innerHTML = "";
        }

        if(boutonEdit.innerHTML !== ""){
            boutonEdit.innerHTML = "";
        }   
    }
}

    

