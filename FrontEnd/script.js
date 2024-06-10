

async function recupFiltres() {

    const reponse = await fetch("http://localhost:5678/api/categories")
    const filtres = await reponse.json();
    console.log(filtres)
    return filtres

}



async function recupTravaux() {

    const reponse = await fetch("http://localhost:5678/api/works")
    const travaux = await reponse.json();

    return travaux
}



function integrationBtnFiltres() {
    let container = document.querySelector(".containerBtnFilter  ")

    let buttonObjet = document.createElement("button")
    let buttonAppartements = document.createElement("button")




    container.appendChild(buttonAppartements)
    container.appendChild(buttonObjet)



}


async function integrationTravauxGalerie() {

    let gallery = document.querySelector(".gallery")
    const listTravaux = await recupTravaux()

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



recupFiltres()
integrationTravauxGalerie()
integrationBtnFiltres()
