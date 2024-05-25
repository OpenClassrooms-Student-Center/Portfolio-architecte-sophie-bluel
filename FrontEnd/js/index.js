import utils from "./utils.js";

// Function to generate HTML for Works
function generateHTMLForWorks(works) {
    //get the parent. HTML tag gallery
    const gallery = document.querySelector(".gallery");

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

        //Add 3 classes yo figure (work and category-nº)
        figure.classList.add(`work`, `category-${work.category.id}`);

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

    //Create tous button (Can I do it on HTML? To DO: try)
    const btn = document.createElement("button");
    btn.innerText = "Tous";

    //Add class active to the button by default
    btn.classList.add('active');

    //Add btn to filter tag
    filters.appendChild(btn);

    //Add event listener to the button tous
    btn.addEventListener('click', function (event) {
        //get active btn and remove active class
        document.querySelector('button.active').classList.remove('active');

        //add active class to the current btn
        event.target.classList.add("active");

        //
        document.querySelectorAll('.work.hidden').forEach(function (element) {
            element.classList.remove('hidden');
        })
    })

    //loop to create a button for each category
    categories.forEach(function (category) {
        // generate a button with the name of the category (filter)
        const btn = document.createElement("button");
        btn.innerText = category.name;

        /*Add and event listener to the button, 
        so every click it filter the information and just generate
        the WORKS on that categoty*/
        btn.addEventListener('click', function (event) {
            // add class to current buton
            document.querySelector('.active').classList.remove('active')
            event.target.classList.add("active")

            document.querySelectorAll('.work').forEach(element => {
                const isCurrentCategory = element.classList.contains(`category-${category.id}`);
                const isHidden = element.classList.contains('hidden');

                if (isCurrentCategory && isHidden) {
                    element.classList.remove('hidden')
                } else if (!isHidden) {
                    element.classList.add('hidden')
                }
            })
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
