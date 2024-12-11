export function displayPhotosGallery() {
    const modalContainer = document.getElementById("modal");

    const galleryData = [
		{src:"./assets/images/abajour-tahina.png", alt:"Abajour Tahina"},
		{src:"./assets/images/appartement-paris-v.png", alt:"Appartement Paris V"},
	    {src:"./assets/images/restaurant-sushisen-londres.png", alt:"Restaurant Sushisen - Londres"},
		{src:"./assets/images/la-balisiere.png", alt:"Villa “La Balisiere” - Port Louis"},
		{src:"./assets/images/structures-thermopolis.png", alt:"Structures Thermopolis"},
		{src:"./assets/images/appartement-paris-x.png", alt:"Appartement Paris X"},
        {src:"./assets/images/villa-ferneze.png", alt:"Villa Ferneze - Isola d’Elba"},
        {src:"./assets/images/appartement-paris-xviii.png", alt:"Appartement Paris XVIII"},
        {src:"./assets/images/le-coteau-cassis.png", alt:"Pavillon “Le coteau” - Cassis"},
		{src:"./assets/images/bar-lullaby-paris.png", alt:"Bar “Lullaby” - Paris"},
		{src:"./assets/images/hotel-first-arte-new-delhi.png", alt:"Hotel First Arte - New Delhi"}				
    ];

    galleryData.forEach(item => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.alt;

        figure.appendChild(img);

        /*const delIcon = document.createElement("span");
        delIcon.classList.add("material-symbols-outlined");
        delIcon.classList.add("deleteProj");
        delIcon.innerText = "delete";
        
        modalContainer.appendChild(delIcon);*/

        modalContainer.appendChild(figure);
    });
}