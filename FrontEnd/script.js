

async function recupFiltres() {

    const reponse = await fetch("http://localhost:5678/api/categories")
    const filtres = await reponse.json();

    return filtres

}



async function recupTravaux() {

    const reponse = await fetch("http://localhost:5678/api/works")
    const travaux = await reponse.json();

    return travaux
}



async function integrationBtnFiltres() {

    let listfiltres = await recupFiltres()


    let container = document.querySelector(".containerBtnFilter")

    for (let i = 0; i < listfiltres.length; i++) {
        let button = document.createElement("button")
        button.className = "btnFiltres"
        button.textContent = listfiltres[i].name
        container.appendChild(button)




        button.addEventListener("click", async function () {

            let travaux = await recupTravaux()

            let idChoixCategories = listfiltres[i].id
            let travauxfiltrer = travaux.filter((projet) => projet.categoryId === idChoixCategories)
            integrationTravauxGalerie(travauxfiltrer)
        })

    }


}







async function integrationTravauxGalerie(listTravaux) {

    let gallery = document.querySelector(".gallery")
    gallery.innerHTML = ""


    for (let i = 0; i < listTravaux.length; i++) {

        let title = listTravaux[i].title
        let image = listTravaux[i].imageUrl


        let figure = document.createElement("figure")
        let imageBalise = document.createElement("img")
        let figcaption = document.createElement("figcaption")

        figcaption.innerText = title
        imageBalise.src = image
        imageBalise.alt = title


        figure.appendChild(imageBalise)
        figure.appendChild(figcaption)

        gallery.appendChild(figure)


    }





}


function affichageBtnTous() {
    let btnTous = document.getElementById("btnTous")
    btnTous.addEventListener("click", async function (event) {
        event.preventDefault
        const allworks = await recupTravaux()
        integrationTravauxGalerie(allworks)
    })
}




//si utilisateur connecter faire les etape suivants 

function affichageBtnModifTraveau() {
    if (localStorage.getItem("connexion") === "true") {

        let filtres = document.querySelector(".containerBtnFilter ")
        console.log(filtres)
        filtres.innerHTML = ""
        buttonModif = document.createElement("button")



        buttonModif.textContent = "modifier"
        buttonModif.addEventListener("click", function (event) {
            event.preventDefault;
            let overlay = document.querySelector(".overlay")
            overlay.classList.remove("overlayoff")
            creationModale();






        })

        filtres.appendChild(buttonModif)







    } else {

    }
}

function creationModale() {


    let overlay = document.createElement("div")
    overlay.classList.add("overlay")







    let pictureList = document.createElement("div")

    let addBtn = document.createElement("button")



    const iconFermer = document.createElement('i');
    iconFermer.classList.add("fa-x");
    closeDiv.appendChild(iconFermer)




    modaleContainer.appendChild(closeDiv)



    overlay.appendChild(modaleContainer);
    document.body.appendChild(overlay);
}


function closeModale() {
    let closDiv = document.querySelector(".closeDiv")
    closDiv.addEventListener("click", function (event) {
        event.preventDefault;
        let overlay = document.querySelector(".overlay")
        overlay.classList.add("overlayoff")






    })

    let overlay = document.querySelector(".overlay")
    overlay.addEventListener("click", function (event) {
        event.preventDefault;
        overlay.classList.add("overlayoff")

    })
}






async function main() {
    const allworks = await recupTravaux()
    recupFiltres()
    integrationTravauxGalerie(allworks)
    await integrationBtnFiltres()
    affichageBtnTous()
    affichageBtnModifTraveau()


    closeModale()

}


main()
