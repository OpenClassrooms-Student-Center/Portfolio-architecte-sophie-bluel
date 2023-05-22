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
    
async function getCategories() {
    const categoriesResponse = await fetch('http://localhost:5678/api/categories');
    const categories = await categoriesResponse.json();
    return categories;
};

let categories;

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


//Below we create the filters depending on the categories in the database
async function createCategoriesFilters() {
    categories = await getCategories();
    console.log(categories);
    categories.unshift({id: 0, name: "Tous"});
    console.log(categories);

    const filters = document.querySelector(".filters");
    for (let i in categories) {
        const filter = document.createElement("div");
        filter.classList.add("filter");        
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.name = categories[i].name;
        checkBox.classList.add("filterCheck");
        checkBox.classList.add(`checkCat${categories[i].id}`);
        const button = document.createElement("button");
        button.innerText = categories[i].name;
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
    
    function selectAllCat(){
        const articles = document.querySelectorAll("figure[class]");
        return articles;
    }
const articles = selectAllCat();
console.log(articles);
    
function uncheckExcept(value){
        const checkBoxs = document.querySelectorAll(".filterCheck");
        for (let i = 0; i < checkBoxs.length; i++){
            if (checkBoxs[i].classList.contains(`${value}`) == false) {
                checkBoxs[i].checked = false;
            }
        };
    }
function uncheck(value){
        const checkBoxs = document.querySelectorAll(".filterCheck");
        for (let i = 0; i < checkBoxs.length; i++){
            if (checkBoxs[i].classList.contains(`${value}`) == true) {
                checkBoxs[i].checked = false;
            }
        };
    }
    function hideAll(){
        const articles = selectAllCat();
        for (let i in articles){
            articles[i].style.display = "none";
        };
    }
    function showAll(){
        const articles = selectAllCat();
        uncheckExcept("checkCat0");
        for (let i in articles){
            articles[i].style.display = "block";
        };
    }

    function showCategory(value){
        uncheck("checkCat0");
        const articles = selectAllCat();
        for (let i in articles){
            if (articles[i].classList.contains(`cat${value}`) == true) {
                articles[i].style.display = "block";
            }
        };
    }
    function hideCategory(value){
        const articles = selectAllCat();
        for (let i in articles){
            if (articles[i].classList.contains(`cat${value}`) == true) {
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
        hideCategory("1");
    }
})
/*APPART*/
const checkAppart = document.querySelector(".checkCat2");
checkAppart.addEventListener('click', function(){
    if (checkAppart.checked == true) {
        showCategory("2")
    }else if (checkAppart.checked == false) {
        hideCategory("2");
    }
})
/*RESTO*/
const checkResto = document.querySelector(".checkCat3");
checkResto.addEventListener('click', function(){
    if (checkResto.checked == true) {
        showCategory("3")
    }else if (checkResto.checked == false) {
        hideCategory("3");
    }
})

/*TOUS*/
const checkAll = document.querySelector(".checkCat0");
checkAll.addEventListener('click', function(){
    if (checkAll.checked == true) {
        showAll();
    }
})


