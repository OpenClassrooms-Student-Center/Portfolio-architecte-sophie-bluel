const answer = await fetch("http://localhost:5678/api/works");
const works = await answer.json();

const sectionGallery = document.querySelector(".gallery");

function generateImgGallery(works) {
	for (let i = 0; i < works.length; i++) {
		const photoGallery = works[i];
		const figureElement = document.createElement("figure");

		figureElement.dataset.id = works[i].id;

		const imgGallery = document.createElement("img");
		imgGallery.src = photoGallery.imageUrl;
		imgGallery.alt = photoGallery.title;
		imgGallery.crossOrigin = "anonymous";

		const figCaptureImg = document.createElement('figcaption');
		figCaptureImg.textContent = photoGallery.title;
		
		sectionGallery.appendChild(figureElement);
		figureElement.appendChild(imgGallery);
		figureElement.appendChild(figCaptureImg);
	}
};

generateImgGallery(works);

// création des boutons filtres
const boutonTous =document.createElement("button");
boutonTous.textContent = "Tous";
const boutonObjets =document.createElement("button");
boutonObjets.textContent = "Objets";
const boutonAppartements =document.createElement("button");
boutonAppartements.textContent = "Appartements";
const boutonHotel =document.createElement("button");
boutonHotel.textContent = "Hôtel & restaurants";

const divBtn = document.querySelector(".btn");

divBtn.appendChild(boutonTous);
divBtn.appendChild(boutonObjets);
divBtn.appendChild(boutonAppartements);
divBtn.appendChild(boutonHotel);

// configuration des boutons filtres
boutonTous.addEventListener("click",function(){
	sectionGallery.innerHTML = "";
	generateImgGallery(works);
});

	
boutonObjets.addEventListener("click",function(){
	const nameObjet = works.filter(function(work){
		return work.category.name == "Objets";
	});
	sectionGallery.innerHTML = "";
	generateImgGallery(nameObjet);
});

boutonAppartements.addEventListener("click",function(){
	const nameAppart = works.filter(function(work){
		return work.category.name == "Appartements";
	});
	sectionGallery.innerHTML = "";
	generateImgGallery(nameAppart);
});

boutonHotel.addEventListener("click",function(){
	const namehotel = works.filter(function(work){
		return work.category.name == "Hotels & restaurants";
	});
	sectionGallery.innerHTML = "";
	generateImgGallery(namehotel);
});


const sectionGallery2 = document.querySelector(".gallery-modal");

export function generateImgGallery2(works) {
	for (let i = 0; i < works.length; i++) {
		const photoGallery = works[i];
		const figureElement = document.createElement("figure");

		figureElement.dataset.id = works[i].id;

		const contenairImage = document.createElement("div");
		contenairImage.className="contenair-image";
		
		const iconTrash = document.createElement("i");
		iconTrash.className ="fa-solid fa-trash-can";

		const iconArrow = document.createElement("i");
		iconArrow.className="fa-solid fa-arrows-up-down-left-right";

		const btnIconeTrash = document.createElement("button");
		btnIconeTrash.className="btn-icone-trash";

		const btnIconeArrow = document.createElement("button");
		btnIconeArrow.className="btn-icone-arrow";

		const imgGallery = document.createElement("img");
		imgGallery.className="photo";
		imgGallery.src = photoGallery.imageUrl;
		imgGallery.alt = photoGallery.title;
		imgGallery.crossOrigin = "anonymous";

		const figCaptureImg = document.createElement('figcaption');
		
		sectionGallery2.appendChild(figureElement);
		btnIconeArrow.appendChild(iconArrow);
		btnIconeTrash.appendChild(iconTrash);
		contenairImage.appendChild(btnIconeArrow);
		contenairImage.appendChild(btnIconeTrash);
		contenairImage.appendChild(imgGallery);
		figureElement.appendChild(contenairImage);
		figureElement.appendChild(figCaptureImg);
		figCaptureImg.textContent = "éditer";
	}
};

generateImgGallery2(works);

// supprimer les elements de db
const btnDelete = document.querySelector("#supp-galerie");

btnDelete.addEventListener("click",function(){
let confirmation = confirm("Voulez-vous continuer ?");
console.log(works)
	if(confirmation == true){
	 	for (let i = 0; i < works.length; i++) {
			delete works[i];
		}
	// sectionGallery2.innerHTML="";
	// sectionGallery.innerHTML="";
	generateImgGallery2(works);
	generateImgGallery(works);
   }
   else{
	console.log("annulation de la suppression");
   }
})