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

async function getWorks() {
    
    const worksResponse = await fetch('http://localhost:5678/api/works');
    const works = await worksResponse.json();
    return works;
    
};
    


async function createProjectContent() {
    const works = await getWorks();
    console.log(works);
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
    }
};

const categoriesList = ["Tous"];
const categoriesId = [0];
//here we add a 0 for the "tous" category
async function createCategoriesFilters() {
    const works = await getWorks();
    
    for (let i in works) {
        if (categoriesList.includes(works[i].category.name) == false) {
            categoriesList.push(works[i].category.name);
            categoriesId.push(works[i].category.id);
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
        checkBox.classList.add(`checkCat${categoriesId[i]}`);
        const button = document.createElement("button");
        button.innerText = categoriesList[i];
        button.classList.add("filter-button");
        filters.appendChild(filter);
        filter.appendChild(checkBox);
        filter.appendChild(button);
    }
}

async function main(){
    await createProjectContent();
    await createCategoriesFilters();
}

await main();

/******FILTERS *******/
/*functions*/
console.log(categoriesList);
console.log(categoriesId);
    
    function selectAllCat(){
           return document.querySelectorAll(`.cat1, .cat2, .cat3`);
         }

    function uncheckExcept(value){
        const checkBoxs = document.querySelectorAll(".filterCheck");
        for (let i = 0; i < checkBoxs.length; i++){
            if (checkBoxs[i].classList.contains(`${value}`) == false) {
                checkBoxs[i].checked = false;
            }
        };
    }

    // function hideAll(){
    //     const articles = document.querySelectorAll("figure");
    //     for (let i in articles){
    //         articles[i].style.display = "none";
    //     };
    // }
    function showAll(){
        const articles = selectAllCat();
        uncheckExcept("checkCat0");
        for (let i in articles){
            articles[i].style.display = "block";
        };
    }

    function showCategory(value){
        const articles = selectAllCat();
        uncheckExcept(`checkCat${value}`);
        for (let i in articles){
            if (articles[i].classList.contains(`cat${value}`) == true) {
                articles[i].style.display = "block";
            }else{
                articles[i].style.display = "none";
            }
        };
    }
/*checkboxes*/
/*OBJETS*/
const checkObjet = document.querySelector(".checkCat1");
checkObjet.addEventListener('click', function(){
    if (checkObjet.checked == true) {
        showCategory("1")
    }else if (checkObjet.checked == false) {
        showAll();
    }
})
/*APPART*/
const checkAppart = document.querySelector(".checkCat2");
checkAppart.addEventListener('click', function(){
    if (checkAppart.checked == true) {
        showCategory("2")
    }else if (checkAppart.checked == false) {
        showAll();
    }
})
/*RESTO*/
const checkResto = document.querySelector(".checkCat3");
checkResto.addEventListener('click', function(){
    if (checkResto.checked == true) {
        showCategory("3")
    }else if (checkResto.checked == false) {
        showAll();
    }
})

/*TOUS*/
const checkAll = document.querySelector(".checkCat0");
checkAll.addEventListener('click', function(){
    if (checkAll.checked == true) {
        showAll();
    }
})



// console.log(checkAll);
// console.log(checkObjet);
// const checkAppart = document.querySelector(".checkCat2");
// console.log(checkAppart);
// const checkResto = document.querySelector(".checkCat3");
// console.log(checkResto);

// function hideAll(){
//     const articles = document.querySelectorAll("figure");
//     for (let i in articles){
//         articles[i].style.display = "none";
//     };
// }
// function showAll(){
//     const articles = document.querySelectorAll("figure");
//     for (let i in articles){
//         articles[i].style.display = "block";
//     };
// }

// const objets = document.querySelector(".cat1");
// console.log(objets);

// const articles = document.querySelectorAll("figure");
// console.log(articles);
// checkObjet.addEventListener('click', function(){
//     if (checkObjet.checked == true) {
//         hideAll().then(objets.style.display = "block");
//     } else {
//         objets.style.display = "none";
//     }
// });

// if (checkAll.checked == true) {
//     for (let i in articles){
//         articles[i].style.display = "block";
//     };
// }