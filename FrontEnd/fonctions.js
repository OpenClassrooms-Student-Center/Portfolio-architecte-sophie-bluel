function recupererContenuBase(url) {
    fetch(url)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            const baseDeDonnees = value;
            const gallery = document.getElementById("gallery");
            baseDeDonnees.forEach(element => {
                creerAffichage(element, gallery)
            });

        })
        .catch(function (err) {
            // Une erreur est survenue
        });
}

function creerAffichage(baseAffichage, parentAffichage) {
    const figure = document.createElement('figure');
    parentAffichage.appendChild(figure);
    const imageVignette = document.createElement('img');
    imageVignette.src = baseAffichage.imageUrl;
    figure.appendChild(imageVignette);
    const descriptionVignette = document.createElement('figcaption');
    descriptionVignette.innerText = baseAffichage.title;
    figure.appendChild(descriptionVignette);
}