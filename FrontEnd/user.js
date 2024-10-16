const gallery = document.querySelector(".gallery");

//Call the API to dynamically retrive the projects
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}
getWorks();   

//Display the gallery
async function addWorks() {
    const works = await getWorks();
    //console.log(works)
    works.forEach((work) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = work.imageUrl;
        figcaption.textContent = work.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}
addWorks();

async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}
getCategories();

async function filterCategory() {
    const category = await getWorks();
    console.log(category);
    const filters = document.querySelectorAll(".filters button");
    console.log(filters);
    filters.forEach(button => {
      button.addEventListener("click", (a) =>{
      btnId = a.target.id;
      gallery.innerHTML ="";
      console.log(btnId);

      });
    });
}
filterCategory();