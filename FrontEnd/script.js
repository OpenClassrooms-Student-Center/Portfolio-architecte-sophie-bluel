

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


    let container = document.querySelector(".containerBtnFilter  ")

    for (let i = 0; i < listfiltres.length; i++) {
        let btnTous = document.getElementById("btnTous")
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


async function main() {
    const allworks = await recupTravaux()
    recupFiltres()
    integrationTravauxGalerie(allworks)
    integrationBtnFiltres()


}


main()
