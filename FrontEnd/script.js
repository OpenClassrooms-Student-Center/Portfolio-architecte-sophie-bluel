//const BASE_URL = "http://localhost:5678/api/";
const BASE_URL = "http://carnelian-western-sock.glitch.me/api/";
fetch('https://carnelian-western-sock.glitch.me/api/data')
.then(response => response.json())
.then(data => {
  document.getElementById('dynamic-content').innerText = data.message;
});



const works = "works";
const categories = "categories";
const login = "users/login";
let filter = 0;
async function fetchImages() {
    const url = `${BASE_URL}${works}`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    renderGallery(data);
}
function renderGallery(data) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "hey"; // Clear previous data-------------
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
}
async function fetchCategories() {
    const url = `${BASE_URL}${categories}`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    renderCategoryButtons(data);
}
function renderCategoryButtons(data) {
  const buttons = document.getElementById("buttons");
  const allBtn = document.createElement("button");
  allBtn.textContent = "Tous";
  allBtn.addEventListener("click", () => filterImages(0));
  buttons.appendChild(allBtn);
  data.forEach((item) => {
    const btn = document.createElement("button");
    btn.textContent = item.name;
    btn.addEventListener("click", () => filterImages(item.id));
    buttons.appendChild(btn);
  });
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
}
function renderloginbtn(){
    const loginbtn = document.getElementById("login");
    loginbtn.addEventListener("click", () => renderloginpage());
}
function renderloginpage(){
    const loginpage = document.getElementById("main");
    loginpage.innerHTML = '';
    const logintitle = document.createElement("h2");
    logintitle.textContent = "login";
    loginpage.appendChild(logintitle);
    const loginform = document.createElement("form");
    loginform.id = "loginform";
    const logininput = document.createElement("input");
    logininput.id = "logininput";
    logininput.type = "email";
    logininput.placeholder = "Email";
    const loginpassword = document.createElement("input");
    loginpassword.id = "loginpassword";
    loginpassword.type = "password";
    loginpassword.placeholder = "Password";
    const loginbtn = document.createElement("button");
    loginbtn.id = "loginbtn";
    loginbtn.type = "submit";
    loginbtn.textContent = "Se Connecter";
    const loginlink = document.createElement("a");
    loginlink.textContent = "mot de passe oublié";
    loginlink.addEventListener("click", () => forgotenn());
    loginform.appendChild(logininput);
    loginform.appendChild(loginpassword);
    loginform.appendChild(loginbtn);
    loginform.appendChild(loginlink);
    loginpage.appendChild(loginform);
}
function forgotenn(){
    const loginpage = document.getElementById("main");
    loginpage.innerHTML = '';
    const logintitle = document.createElement("h2");
    logintitle.textContent = "mot de passe oublié";
    loginpage.appendChild(logintitle);
    const loginform = document.createElement("form");
    const logininput = document.createElement("input");
    logininput.type = "email";
    logininput.placeholder = "Email";
    const loginbtn = document.createElement("button");
    loginbtn.textContent = "Envoyer Nouveau Mot de Passe";
    loginform.appendChild(logininput);
    loginform.appendChild(loginbtn);
    loginpage.appendChild(loginform);
}
function verifyLogin() {
    const loginform = document.getElementById("loginform");
    const loginInput = document.getElementById("logininput").value;
    const loginPassword = document.getElementById("loginpassword").value;

  if (!loginInput || !loginPassword) {
    alert("Veuillez remplir tous les champs.");
    return;
  }
}  
async function verifylogin(){

    const url = `${BASE_URL}${login}`;
    const response = await fetch(url, { method: "POST" });
    const data = await response.json();   
}



window.addEventListener("DOMContentLoaded", () => {
  fetchImages();
  fetchCategories();
  renderloginbtn();
});
