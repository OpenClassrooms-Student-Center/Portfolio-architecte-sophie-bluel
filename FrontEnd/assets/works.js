async function genererWorks(){
    fetch("http://localhost:5678/api/works/")
    .then(r => r.json())
    .then(works => {
        console.table(works);
        for (let i = 0; i < works.length; i++) {
            const figure = works[i];

            const sectionGallery = document.querySelector(".gallery");

            const figureElement = document.createElement("figure");

            const imgElement = document.createElement("img");
            imgElement.src = figure.imageUrl;
            imgElement.setAttribute("alt", figure.title )

            const figcaptionElement = document.createElement("figcaption");
            figcaptionElement.innerText = figure.title;

            sectionGallery.appendChild(figureElement);
            figureElement.appendChild(imgElement);
            figureElement.appendChild(figcaptionElement);
        }
    }
    )
}

genererWorks()