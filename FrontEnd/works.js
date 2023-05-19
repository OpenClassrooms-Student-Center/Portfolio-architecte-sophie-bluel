// async function myFunction(){
//     console.log("Hello!");

//     const logInput = {
//         email: "sophie.bluel@test.tld",
//         password: "S0phie"
//     };
    
//     const chargeUtile = JSON.stringify(logInput);
//     const response = await fetch("http://localhost:5678/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: chargeUtile
//     });
//     const valeursLogin = await response.json();
//     console.log(valeursLogin);
//     const token = valeursLogin.token
//     console.log(token);
// };

// const login = document.querySelector(".login");
// login.addEventListener('click', myFunction);



let works = window.localStorage.getItem("works");
if (works == null){
    const worksResponse = await fetch('http://localhost:5678/api/works');
    works = await worksResponse.json();
    window.localStorage.setItem("works", JSON.stringify(works)); // attention pas besoin ni de creer 
    // une nouvelle variable ni meme d'utiliser le local storage
 }else{
    works = JSON.parse(works);
}


function createProjectContent() {
    for (let i in works) {

        const gallery = document.querySelector(".gallery");


        const work = document.createElement("figure");
        const workImage = document.createElement("img")
        const workTitle = document.createElement("figcaption");
        work.classList.add(`cat${works[i].category.id}`);
        workImage.src = works[i].imageUrl;
        workTitle.textContent = works[i].title;

        gallery.appendChild(work);
        work.appendChild(workImage);
        work.appendChild(workTitle);
console.log(works);
    }
};
function createCategoriesFilters() {
    const categoriesList = ["Tous"];
    const categoriesId = [];
    
    for (let i in works) {
        if (categoriesList.includes(works[i].category.name) == false) {
            categoriesList.push(works[i].category.name);
            categoriesId.push(works[i].category.id);
            console.log(categoriesList);
            console.log(categoriesId);
        }
    }
    
    const filters = document.querySelector(".filters");
    for (let i in categoriesList) {
        const filter = document.createElement("div");
        filter.classList.add("filter");
        
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.name = categoriesList[i];
        checkBox.classList.add("filterCheck");
        const button = document.createElement("button");
        button.innerText = categoriesList[i];
        button.classList.add("filter-button");
        console.log(button);
        filters.appendChild(filter);
        filter.appendChild(checkBox);
        filter.appendChild(button);
    }
    
}

// I want to create a function that will filter the projects by category when checking the boxes
function filterProjects() {
    const filterChecks = document.querySelectorAll(".filterCheck");
    const gallery = document.querySelector(".gallery");
    console.log(filterButtons);
    console.log(filterChecks);
    console.log(gallery);

    
}





function main (){
    createProjectContent();
    createCategoriesFilters();
}

main();