const response = await fetch("http://localhost:5678/api/works");
const data = await response.json();

function genererArticles(data) {
    for (let i = 0; i < data.length; i++) {
        const figureElement = document.createElement("figure")
        const imgElement = document.createElement("img")
        const figcaptionElement = document.createElement("figcaption")

        figureElement.innerhtml = data[i]
        imgElement.src = data[i].imageUrl
        figcaptionElement.innerText = data[i].title

        figureElement.appendChild(imgElement)
        figureElement.appendChild(figcaptionElement)
        document.querySelector(".gallery").appendChild(figureElement)
    }
}

// console.log(data)
genererArticles(data);


/***** filtres *****/

const filterByAll = document.querySelector(".all")
filterByAll.addEventListener("click", function () {
    const piecesFiltrees = data.filter(function (article) {
        return article.categoryId > 0;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererArticles(piecesFiltrees);
});

const filterByObjects = document.querySelector(".objects")
filterByObjects.addEventListener("click", function () {
    const piecesFiltrees = data.filter(function (article) {
        return article.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererArticles(piecesFiltrees);
});

const filterByApp = document.querySelector(".appartements")
filterByApp.addEventListener("click", function () {
    const piecesFiltrees = data.filter(function (article) {
        return article.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererArticles(piecesFiltrees);
});

const filterByBar = document.querySelector(".bar")
filterByBar.addEventListener("click", function () {
    const piecesFiltrees = data.filter(function (article) {
        return article.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererArticles(piecesFiltrees);
    // console.log(piecesFiltrees)
});



