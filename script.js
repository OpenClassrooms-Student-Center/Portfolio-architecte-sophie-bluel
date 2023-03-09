async function getWorks(){
 const res = await fetch("http://localhost:5678/api/works");
 const data = await res.json();
 return data;
}

async function createGallery(){
    const works = await getWorks();
    const gallery = document.querySelector(".gallery");
    
    let categories = [];

    works.forEach(work=> {
        const element = document.createElement("figure");
        const imgElement = document.createElement("img");
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = work.title;
        imgElement.src = work.imageUrl;
        element.dataset.category = work.category.name;
        element.appendChild(imgElement);
        element.appendChild(captionElement);      
        gallery.appendChild(element);

        categories.push(work.category.name);
    });

    categories.unshift('Tous');
    const cleanCategories = new Set(categories);
    
    cleanCategories.forEach(category=> {

        const buttonElement = document.createElement("button");
        buttonElement.innerText = category;
        buttonElement.dataset.category = category;
        if(category === 'Tous'){
            buttonElement.classList.add("activefilter");
        }
        document.querySelector(".filtersdiv").appendChild(buttonElement);

        buttonElement.addEventListener("click", function(e) {
            e.preventDefault();
            console.log(buttonElement.dataset.category);
            const filters = document.querySelector(".filtersdiv");
            const filtersArray = Array.from(filters.children);
            filtersArray.forEach(buttonElement=> {
                buttonElement.classList.remove("activefilter");
            }); 
            buttonElement.classList.add("activefilter");

            let figure = document.querySelectorAll('.gallery figure');
            figure.forEach(figurework=> {
                if(buttonElement.dataset.category === 'Tous') {
                    figurework.classList.remove("no-show"); 
                }
                else if(figurework.dataset.category === buttonElement.dataset.category) {
                    figurework.classList.remove("no-show"); 
                }
                else {
                    figurework.classList.add("no-show");
                }
            });
        });
    });
}

createGallery();

if(localStorage.getItem("token") != null){
    document.querySelector('body').classList.add("user-logged");
}

document.querySelector("#logout-button").addEventListener("click",function(){
    localStorage.removeItem("token")
    document.location.href='index.html';
})
