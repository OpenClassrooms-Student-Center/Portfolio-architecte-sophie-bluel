const BASE_URL = "http://localhost:5678/api/";
//const BASE_URL = "https://carnelian-western-sock.glitch.me/api/";
//fetch('https://carnelian-western-sock.glitch.me/api/data')
//.then(response => response.json())
//.then(data => {document.getElementById('dynamic-content').innerText = data.message;});



const works = "works";
const categories = "categories";
const login = "users/login";
let filter = 0;

let user = "";
let token = "";

let loginlogoutbtn = 0 


function rendernav(){
  const navbar = document.getElementById("navbar");
  const projets = document.createElement("li");
  const aprojects = document.createElement("a");
  aprojects.textContent = "projets";
  aprojects.href = "#projets";
  const contact = document.createElement("li");
  const acontact = document.createElement("a");
  acontact.textContent = "contact";
  acontact.href = "#contact";
  const login = document.createElement("li");
  const alogin = document.createElement("a");
  alogin.textContent = "login";
  alogin.href = "#";
  alogin.id = "login";
  alogin.addEventListener("click", () => loginlogout(alogin));
  const instagram = document.createElement("li");
  const ainstagram = document.createElement("a");
  const imginstagram = document.createElement("img");
  imginstagram.src = "assets/icons/instagram.png";
  ainstagram.href = "https://www.instagram.com/";

  navbar.appendChild(projets);
  navbar.appendChild(contact); 
  navbar.appendChild(login);
  navbar.appendChild(instagram);
  projets.appendChild(aprojects);
  contact.appendChild(acontact);
  login.appendChild(alogin);
  instagram.appendChild(ainstagram);
  ainstagram.appendChild(imginstagram);
};
function loginlogout(){
const loginout = document.getElementById("login");
  if (loginlogoutbtn === 0){
    renderloginpage();
    loginout.classList.add("activenav");
  }
  if (loginlogoutbtn === 1){
    loginout.classList.remove("activenav");
    loginout.textContent = "logout";
  }
  else if (loginlogoutbtn === 2){
    location.reload();
  }
}
function rendermain(){
  const main = document.getElementById("main");
  const introduction = document.createElement("section");
  introduction.id = "introduction";
  main.appendChild(introduction);
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = "./assets/images/sophie-bluel.png";
  img.alt = "Photo de Sophie Bluel";
  figure.appendChild(img);
  introduction.appendChild(figure);
  const article = document.createElement("article");
  introduction.appendChild(article);
  const h2 = document.createElement("h2");
  h2.textContent = "Designer d'espace";
  article.appendChild(h2);
  const p = document.createElement("p");
  p.textContent = "Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.";
  const p2 = document.createElement("p");
  p2.textContent = "Chaque projet sera étudié en commun, de façon à mettre en valeur les volumes, les matières et les couleurs dans le respect de l’esprit des lieux et le choix adapté des matériaux. Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.";
  const p3 = document.createElement("p");
  p3.textContent = "En cas de besoin, une équipe pluridisciplinaire peut-être constituée : architecte DPLG, décorateur(trice)";
  article.appendChild(p);
  article.appendChild(p2);
  article.appendChild(p3);
  const portfolio = document.createElement("section");
  portfolio.id = "portfolio";
  main.appendChild(portfolio);
  const Projets = document.createElement("div");
  Projets.id = "projets"
  portfolio.appendChild(Projets);
  const MesProjets = document.createElement("h2");
  MesProjets.textContent = "Mes Projets";
  Projets.appendChild(MesProjets);
  const buttons = document.createElement("div");
  buttons.id = "buttons";
  portfolio.appendChild(buttons);
  const gallery = document.createElement("div");
  gallery.id = "gallery";
  gallery.classList.add("gallery");
  portfolio.appendChild(gallery);
  const formstyle = document.createElement("section");
  formstyle.id = "formstyle";
  main.appendChild(formstyle);
  const contact = document.createElement("h2");
  contact.textContent = "Contact";
  contact.id = "contact";
  formstyle.appendChild(contact);
  const p4 = document.createElement("p");
  p4.textContent = "Vous avez un projet ? Discutons-en !";
  formstyle.appendChild(p4);
  const form = document.createElement("form");
  form.action = "#";
  form.method = "post";
  formstyle.appendChild(form);
  const name = document.createElement("label");
  name.textContent = "Nom";
  name.htmlFor = "name";
  form.appendChild(name);
  const inputname = document.createElement("input");
  inputname.type = "text";
  inputname.id = "name";
  inputname.name = "name";
  form.appendChild(inputname);
  const email = document.createElement("label");
  email.textContent = "Email";
  email.htmlFor = "email";
  form.appendChild(email);
  const inputemail = document.createElement("input");
  inputemail.type = "email";
  inputemail.id = "email";
  inputemail.name = "email";
  form.appendChild(inputemail);
  const message = document.createElement("label");
  message.textContent = "Message";
  message.htmlFor = "message";
  form.appendChild(message);
  const inputmessage = document.createElement("textarea");
  inputmessage.name = "message";
  inputmessage.id = "message";
  inputmessage.cols = "30";
  inputmessage.rows = "10";
  form.appendChild(inputmessage);
  const Envoyer = document.createElement("input");
  Envoyer.type = "submit";
  Envoyer.value = "Envoyer";
  form.appendChild(Envoyer);
}
async function fetchImages() {
    const url = `${BASE_URL}${works}`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    renderGallery(data);
};
function renderGallery(data) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  data.forEach((item) => {
    const figure = document.createElement("figure");
    figure.dataset.categoryId = item.category.id;
    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.title;
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = item.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
};
async function fetchCategories() {
    const url = `${BASE_URL}${categories}`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    renderCategoryButtons(data);
};
function renderCategoryButtons(data) {
  const buttons = document.getElementById("buttons");
  
  const allBtn = document.createElement("button");
  allBtn.textContent = "Tous";
  allBtn.classList.add("active");
  allBtn.addEventListener("click", () => {
    filterImages(0);
    setActiveButton(allBtn);
  });
  buttons.appendChild(allBtn);

  data.forEach((item) => {
    const btn = document.createElement("button");
    btn.textContent = item.name;
    btn.addEventListener("click", () => {
      filterImages(item.id);
      setActiveButton(btn);
    });
    buttons.appendChild(btn);
  });

  function setActiveButton(activeButton) {
      document.querySelectorAll("#buttons button").forEach((btn) => {
        btn.classList.remove("active");
      });
      activeButton.classList.add("active");
  }
}
async function filterImages(filterid) {
    const url = `${BASE_URL}${works}`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    if (filterid === 0) {
      renderGallery(data);
    } else {
      const filteredData = data.filter((item) => item.category.id === filterid);
      renderGallery(filteredData);
    }
};
function renderloginpage(){
    const loginpage = document.getElementById("main");
    loginpage.innerHTML = '';
    const sectionlogin = document.createElement("section");
    sectionlogin.id = "formstyle";
    const logintitle = document.createElement("h2");
    logintitle.textContent = "Log In";
    sectionlogin.appendChild(logintitle);
    const loginform = document.createElement("form");
    loginform.id = "loginform";
    loginform.addEventListener("submit", (event) => {
      event.preventDefault();
      verifylogin()
    });
    const loginlabelemail = document.createElement("label");
    loginlabelemail.textContent = "Email";
    loginlabelemail.htmlFor = "logininput";
    const logininput = document.createElement("input");
    logininput.id = "logininput";
    logininput.type = "email";
    const loginlabelpassword = document.createElement("label");
    loginlabelpassword.textContent = "Mot de passe"; 
    loginlabelpassword.htmlFor = "loginpassword";
    const loginpassword = document.createElement("input");
    loginpassword.id = "loginpassword";
    loginpassword.type = "password";
    const errormsg = document.createElement("p");
    errormsg.id = "errormsg";
    errormsg.classList.add("errormsghide");
    const loginbtn = document.createElement("input");
    loginbtn.id = "loginbtn";
    loginbtn.type = "submit";
    loginbtn.value = "Se connecter";
    const loginlink = document.createElement("a");
    loginlink.textContent = "Mot de passe oublié";
    loginlink.id = "button";
    loginlink.addEventListener("click", () => forgotenn());
    loginform.appendChild(loginlabelemail);
    loginform.appendChild(logininput);
    loginform.appendChild(loginlabelpassword);
    loginform.appendChild(loginpassword);
    loginform.appendChild(errormsg);
    loginform.appendChild(loginbtn);
    loginform.appendChild(loginlink);
    sectionlogin.appendChild(loginform);
    loginpage.appendChild(sectionlogin);
};
function verifylogin() {
    const email = document.getElementById("logininput").value;
    const password = document.getElementById("loginpassword").value;
    if (!email || !password) {
      let errormsg = document.getElementById("errormsg");
      errormsg.classList.remove("errormsghide");
      errormsg.innerHTML = "Veuillez remplir tous les champs";
    }
    else {
      verifyloginapi(email, password);
    }
};
async function verifyloginapi(email, password){
    const url = `${BASE_URL}${login}`;
    const errormsg = document.getElementById("errormsg");
    try{
      const response = await fetch(url, { 
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          "email": email,
          "password": password})
      });
      const data = await response.json(); 
      if (response.ok) {
        token = data.token;
        user = data.userId;
        rendereditpage();
      }
      else if (response.status === 401) {
        errormsg.classList.remove("errormsghide");
        errormsg.innerHTML = "Mot de passe incorrect";
      }
      else if (response.status === 404) {
        errormsg.classList.remove("errormsghide");
        errormsg.innerHTML = "Pas de compte avec cet email";
      }
      else {
        errormsg.classList.remove("errormsghide");
        errormsg.innerHTML = "Une erreur est survenue";
        console.error("status code unknown error:", error);
      }
    }
    catch (error) {
      console.error("post api longin error:", error);
      errormsg.classList.remove("errormsghide");
      errormsg.innerHTML = "Une erreur est survenue, Veuillez réessayer";
    }
};
function rendereditpage(){
  const loginpage = document.getElementById("main");
  loginpage.innerHTML = '';
  rendermain();
  fetchImages();
  fetchCategories();
  renderEditormode();
  loginlogoutbtn = 1;
  loginlogout();
  loginlogoutbtn = 2;
  const projets = document.getElementById("projets");
  const modify = document.createElement("div");
  modify.id = "modify";
  modify.addEventListener("click", () => modifypopup());
  projets.appendChild(modify);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "17");
  svg.setAttribute("height", "17");
  svg.setAttribute("viewBox", "0 0 17 17");
  svg.setAttribute("fill", "black");
  modify.appendChild(svg);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M14.0229 2.18576L14.3939 2.55679C14.6821 2.84503 14.6821 3.31113 14.3939 3.5963L13.5016 4.49169L12.0879 3.07808L12.9803 2.18576C13.2685 1.89751 13.7346 1.89751 14.0198 2.18576H14.0229ZM6.93332 8.23578L11.0484 4.11759L12.4621 5.53121L8.34387 9.64633C8.25494 9.73525 8.14455 9.79964 8.02496 9.83337L6.23111 10.3455L6.7432 8.55162C6.77693 8.43203 6.84133 8.32164 6.93025 8.23271L6.93332 8.23578ZM11.9408 1.14625L5.89074 7.1932C5.62397 7.45998 5.43078 7.78808 5.32959 8.14685L4.4526 11.2133C4.379 11.4708 4.44953 11.7468 4.63965 11.9369C4.82977 12.127 5.10574 12.1976 5.36332 12.124L8.42973 11.247C8.79156 11.1427 9.11967 10.9495 9.38338 10.6858L15.4334 4.63888C16.2951 3.77722 16.2951 2.37894 15.4334 1.51728L15.0624 1.14625C14.2007 0.284585 12.8024 0.284585 11.9408 1.14625ZM3.19844 2.34214C1.70816 2.34214 0.5 3.55031 0.5 5.04058V13.3812C0.5 14.8715 1.70816 16.0796 3.19844 16.0796H11.5391C13.0293 16.0796 14.2375 14.8715 14.2375 13.3812V9.94683C14.2375 9.539 13.9094 9.21089 13.5016 9.21089C13.0937 9.21089 12.7656 9.539 12.7656 9.94683V13.3812C12.7656 14.0589 12.2167 14.6078 11.5391 14.6078H3.19844C2.52076 14.6078 1.97188 14.0589 1.97188 13.3812V5.04058C1.97188 4.36291 2.52076 3.81402 3.19844 3.81402H6.63281C7.04065 3.81402 7.36875 3.48591 7.36875 3.07808C7.36875 2.67025 7.04065 2.34214 6.63281 2.34214H3.19844Z"
  );
  svg.appendChild(path);
  const modifytext =  document.createElement("p");
  modifytext.textContent = "modifier";
  modify.appendChild(modifytext);
}
function renderEditormode(){
  const header = document.getElementById("header");
  const Editormode = document.createElement("div");
  Editormode.id = "Editormode";
  header.appendChild(Editormode);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "17");
  svg.setAttribute("height", "17");
  svg.setAttribute("viewBox", "0 0 17 17");
  svg.setAttribute("fill", "white");
  Editormode.appendChild(svg);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M14.0229 2.18576L14.3939 2.55679C14.6821 2.84503 14.6821 3.31113 14.3939 3.5963L13.5016 4.49169L12.0879 3.07808L12.9803 2.18576C13.2685 1.89751 13.7346 1.89751 14.0198 2.18576H14.0229ZM6.93332 8.23578L11.0484 4.11759L12.4621 5.53121L8.34387 9.64633C8.25494 9.73525 8.14455 9.79964 8.02496 9.83337L6.23111 10.3455L6.7432 8.55162C6.77693 8.43203 6.84133 8.32164 6.93025 8.23271L6.93332 8.23578ZM11.9408 1.14625L5.89074 7.1932C5.62397 7.45998 5.43078 7.78808 5.32959 8.14685L4.4526 11.2133C4.379 11.4708 4.44953 11.7468 4.63965 11.9369C4.82977 12.127 5.10574 12.1976 5.36332 12.124L8.42973 11.247C8.79156 11.1427 9.11967 10.9495 9.38338 10.6858L15.4334 4.63888C16.2951 3.77722 16.2951 2.37894 15.4334 1.51728L15.0624 1.14625C14.2007 0.284585 12.8024 0.284585 11.9408 1.14625ZM3.19844 2.34214C1.70816 2.34214 0.5 3.55031 0.5 5.04058V13.3812C0.5 14.8715 1.70816 16.0796 3.19844 16.0796H11.5391C13.0293 16.0796 14.2375 14.8715 14.2375 13.3812V9.94683C14.2375 9.539 13.9094 9.21089 13.5016 9.21089C13.0937 9.21089 12.7656 9.539 12.7656 9.94683V13.3812C12.7656 14.0589 12.2167 14.6078 11.5391 14.6078H3.19844C2.52076 14.6078 1.97188 14.0589 1.97188 13.3812V5.04058C1.97188 4.36291 2.52076 3.81402 3.19844 3.81402H6.63281C7.04065 3.81402 7.36875 3.48591 7.36875 3.07808C7.36875 2.67025 7.04065 2.34214 6.63281 2.34214H3.19844Z"
  );
  svg.appendChild(path);
  const edittext =  document.createElement("p");
  edittext.textContent = "Mode édition";
  Editormode.appendChild(edittext);
}
function modifypopup (){
  const main = document.getElementById("main");
  const blackout = document.createElement("div");
  blackout.id = "blackout";
  main.appendChild(blackout);
  const popup = document.createElement("div");
  popup.id = "popup";
  main.appendChild(popup);
  const close = document.createElement("div");
  close.id = "close";
  close.addEventListener("click", () => rendereditpage());
  popup.appendChild(close);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "12");
  svg.setAttribute("height", "12");
  svg.setAttribute("viewBox", "0 0 12 12");
  svg.setAttribute("fill", "black");
  close.appendChild(svg);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M11.6546 2.05106C12.1235 1.58214 12.1235 0.820611 11.6546 0.351691C11.1856 -0.11723 10.4241 -0.11723 9.95519 0.351691L6.005 4.30563L2.05106 0.355442C1.58214 -0.113479 0.820611 -0.113479 0.351691 0.355442C-0.11723 0.824363 -0.11723 1.58589 0.351691 2.05481L4.30563 6.005L0.355442 9.95894C-0.113479 10.4279 -0.113479 11.1894 0.355442 11.6583C0.824363 12.1272 1.58589 12.1272 2.05481 11.6583L6.005 7.70437L9.95894 11.6546C10.4279 12.1235 11.1894 12.1235 11.6583 11.6546C12.1272 11.1856 12.1272 10.4241 11.6583 9.95519L7.70437 6.005L11.6546 2.05106Z"
  );
  svg.appendChild(path);
  const title = document.createElement("h3");
  title.textContent = "Galerie photo";
  popup.appendChild(title);
  const add = document.createElement("button");
  add.id = "add";
  add.innerText = "Ajouter une photo";
  add.addEventListener("click", () => addpopup());
  popup.appendChild(add);


  function addpopup(){
    title.textContent = "Ajout photo";
  }


}


function forgotenn(){
  const loginpage = document.getElementById("main");
  loginpage.innerHTML = '';
  const sectionlogin = document.createElement("section");
  sectionlogin.id = "formstyle";
  const logintitle = document.createElement("h2");
  logintitle.textContent = "Nouveau mot de passe";
  sectionlogin.appendChild(logintitle);
  const loginform = document.createElement("form");
  loginform.classList.add("formstyle");
  const loginlabelemail = document.createElement("label");
  loginlabelemail.textContent = "Email";
  const logininput = document.createElement("input");
  logininput.type = "email";
  const loginbtn = document.createElement("input");
  loginbtn.type = "submit";
  loginbtn.value = "Envoyer";
  loginform.appendChild(loginlabelemail);
  loginform.appendChild(logininput);
  loginform.appendChild(loginbtn);
  sectionlogin.appendChild(loginform);
  loginpage.appendChild(sectionlogin);
};

window.addEventListener("DOMContentLoaded", () => {
  rendermain();
  fetchImages();
  fetchCategories();
  rendernav();
});
