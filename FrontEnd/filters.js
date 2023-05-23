
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

function relateCheck (value){

}


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


function filter(){
const checkBoxs = document.querySelectorAll(".filterCheck");
console.log(checkBoxs);

}

