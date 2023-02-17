async function getWorks(){
 const res = await fetch("http://localhost:5678/api/works");
 const data = await res.json();
 return data;
}

async function createGallery(){
    const works = await getWorks();
    console.log(works);
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

    console.log(categories);
    const cleanCategories = new Set(categories);
    console.log(cleanCategories);

    cleanCategories.forEach(category=> {
        console.log(category);
        buttonFilters.addEventListener("click", function () {

        })
        


    });

    
    


}



















createGallery();

