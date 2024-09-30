async function affichertravauxmodale(travaux) { 
    const gallery = document.querySelector("#gallerymodale");
    gallery.innerHTML = "";

    for (let travail of travaux) {
        gallery.innerHTML += `
        <figure> 
            <p><i class="fa-solid fa-trash" style="color:black"></i></p>
            <img src="${travail.imageUrl}" alt="${travail.title}">
        </figure> `;
    }
}

async function affichercategoriesliste(categories) {
    const listecat = document.getElementById("listcategory");
    listecat.innerHTML = '<option value="none"></option>';
    for (let category of categories) {
        listecat.innerHTML += `<option value="${category.name}">${category.name}</option>`
    }
}

fetchTravaux().then(travaux => affichertravauxmodale(travaux));
fetchCategories().then(category => affichercategoriesliste(category));

const boutonmodifier = document.getElementById("boutonmodifier");
const modalemodif= document.getElementById("modalemodif");
const modalewrapper = document.getElementById("modal-wrapper");
const boutonquitter=document.getElementById("closemodal");

boutonmodifier.addEventListener("click", () => {
    modalemodif.style.display= null;
})
boutonquitter.addEventListener("click", () => {
    modalemodif.style.display= 'none';
})
modalemodif.addEventListener("click", () => {
    modalemodif.style.display= 'none';
})
modalewrapper.addEventListener("click", (event) => {
    event.stopPropagation();
})
