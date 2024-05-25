import utils from "./utils.js";

// Function to generate HTML for Works
function generateHTMLForWorks(works) {
    //get the parent. HTML tag gallery
    const gallery = document.querySelector(".gallery");
    //empty de gallery
    gallery.innerHTML = "";

    //Loop to add an image and a figcaption to every WORK
    works.forEach(function (work) {
            //Create the image with the WORK image URL
            const img = document.createElement("img");
            img.src = work.imageUrl;

            //Create the fig caption with the WORK title
            const figCaption = document.createElement("figcaption");
            figCaption.innerText = work.title;
        
            //Create the figure tag to contain the img and the fig caption
            const figure = document.createElement("figure");
            //Add img and fig caption to the figure tag
            figure.appendChild(img);
            figure.appendChild(figCaption);
        
            //Add figure tag to the gallery
            gallery.appendChild(figure);
        });
}
// Function to generate HTML for filters 
function generateHTMLForFiltersWithEvents(categories) {
    //Select the filters tag on HTML
    const filters = document.querySelector(".filters")

    //Create tous button
    const btn = document.createElement("button");
            btn.innerText = "Tous";
    filters.appendChild(btn);
    //Add event listener to the button tous
    btn.addEventListener('click', function() {
        generateHTMLForWorks(works)
    })

    //loop to create a button for each category
    categories.forEach(function (category){
            // generate a button with the name of the category (filter)
            const btn = document.createElement("button");
            btn.innerText = category.name;

            /*Add and event listener to the button, 
            so every click it filter the information and just generate
            the WORKS on that categoty*/
            btn.addEventListener('click', function() {
                generateHTMLForWorks(works.filter(
                    work => work.category.name === category.name
                ))
            })
            // Add the button to the HTLM in the filter tag
            filters.appendChild(btn);
        });
}

/*recover info from /works(DB) using fetch fuction that I have on utils, 
so everytime that I have to use fetch I don't have to write everything.*/
const works = await utils.fetchJSON("/works");
// use the function to generate WORKS
generateHTMLForWorks(works)
//recover info from /categories(DB) using fetch function
const categories = await utils.fetchJSON("/categories");
//generate filters and works just for the filter 
generateHTMLForFiltersWithEvents(categories)
