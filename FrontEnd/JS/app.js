//********************** IMPORTS *************/

import {worksCreate,filterBouton,filterAction,initImage} from './images.js'
import {addProjet, initModal,openModal,closeModal,switchModal,Affichage,detruire,buildContent} from './modal.js'
// Recup des images 
//********************** FETCH *************/

const apiUrl = "http://localhost:5678/api/"
const urlWork = `${apiUrl}works`
const reponseCategory = await fetch(`${apiUrl}categories`);
const category = await reponseCategory.json();


//********************** VARIABLES ***********/
const reponseWorks = await fetch(`${urlWork}`);
const library = await reponseWorks.json();
const gallery = document.querySelector(".gallery");
const filter = document.querySelector(".filter");
const  btnFilter = document.querySelector('.btn-filter')
const btnFilterTous = document.querySelector('#filterTous')
const loginContainer = document.querySelector('.login-action-container')
const token = localStorage.getItem('token');

//---------------- INIT------------------------//
//Au chargement de la page 

function init () { 
    library.forEach(async element => {
        worksCreate(element);
    })
    category.forEach((element ,index) => {
        const filterName = 'filter' + element.id;
        filterBouton(element);
        })
        initImage();
        filterAction();
        if(isTokenPresent === false){
            console.log("pas connecté");
            return
        }
        else{  
            console.log(
                "token present",localStorage.getItem('token')); 
            logOut();
            addModifers();
            fetch('modal.html')
            .then(response => {
                if (response.ok) {
                return response.text()}
            })
            .then(htmlModal => {
                loginContainer.innerHTML = htmlModal
                initModal();
                buildContent();
                openModal();
                closeModal();
                switchModal();
                Affichage();
                detruire()
                addProjet();
            })
    }
    
};

init();

function isTokenPresent() {
    return localStorage.getItem("token") !== null;
  }; 

function logOut (){
    const navbar= document.querySelector('nav');
    const login = document.querySelector('#nav-login');
    login.style.display ='none'
    const logout = document.querySelector('#nav-logout');
    logout.style.display="flex";
    logout.addEventListener('click', ()=> {
        console.log("click : logout");
        localStorage.removeItem('token')
        console.log("token present",localStorage.getItem('token')); 
        loginContainer.innerHTML ="";
        logout.style.display="none";
        login.style.display ="block";
        document.querySelectorAll('.modifier').forEach((element)=>{
            element.remove()
        } )
    })
}


function addModifers(){
    const figure = document.querySelector('#introduction-img')
    const article = document.querySelector('#introduction-article')
    const titre = document.querySelector('#portfolio-title')
    createModifierIndex(figure)
    createModifierIndex(article)
    createModifierIndex(titre)
}

function createModifierIndex(e){
    if(e === document.querySelector('#introduction-img')){
        const div = document.createElement('figcaption');
        buildModifier(div)
        e.append(div)
    }
    else if( e === document.querySelector('#portfolio-title')){
        const div = document.createElement('div');

        buildModifier(div)
        e.append(div);
        }
    else if( e === document.querySelector('#introduction-article')){
        const div = document.createElement('div');
        buildModifier(div)
        e.prepend(div);
        };
};

function buildModifier(e){
    e.classList.add('modifier');
    const img = document.createElement('img')
    img.classList.add('modifier-image')
    img.src= './assets/images/icon-modifier-image.png'
    const span = document.createElement('span');
    span.innerText = 'modifier';
    e.append(img);
    e.append(span)
}

