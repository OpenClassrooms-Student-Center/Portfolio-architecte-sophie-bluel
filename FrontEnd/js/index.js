import utils from "./utils.js";

function generateHTMLForWorks(works) {
    const gallery = document.querySelector(".gallery");
    
    gallery.innerHTML = "";

    works
        .forEach(function (work) {
            const img = document.createElement("img");
            img.src = work.imageUrl;
        
            const figCaption = document.createElement("figcaption");
            figCaption.innerText = work.title;
        
            const figure = document.createElement("figure");
            figure.appendChild(img);
            figure.appendChild(figCaption);
        
            gallery.appendChild(figure);
        });
}

function generateHTMLForFiltersWithEvents(categories) {
    const filters = document.querySelector(".filters")

    categories
        .forEach(function (category){
            const btn = document.createElement("button");
            btn.innerText = category.name;

            btn.addEventListener('click', function() {
                generateHTMLForWorks(works.filter(
                    work => work.category.name === category.name
                ))
            })

            filters.appendChild(btn);
        });
}

const works = await utils.fetchJSON("/works");
generateHTMLForWorks(works)

const categories = await utils.fetchJSON("/categories");
generateHTMLForFiltersWithEvents(categories)
