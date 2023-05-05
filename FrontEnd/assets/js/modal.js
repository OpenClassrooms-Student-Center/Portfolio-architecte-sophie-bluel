import { renderMiniWorks } from "./miniWorks.js";

export function modalFunction() {
	const createModal = function (e) {
		const divTag = document.createElement("div");
		divTag.setAttribute("id", "modal1");
		divTag.classList.add("modal", "d-none");
		//divTag.classList.add('d-none')
		divTag.setAttribute("aria-hidden", "true");
		divTag.setAttribute("role", "dialogue");
		const main = document.querySelector("main");
		main.appendChild(divTag);
		return divTag;
	};

	function createModalContent() {
		const newOuterDiv = document.createElement("div");
		newOuterDiv.classList.add("modal-content");

		const newInnerDiv = document.createElement("div");
		newInnerDiv.classList.add("modal-wrapper");

		const closeX = document.createElement("span");
		closeX.className = "close";
		closeX.innerText = "x";
		const modalTitle = document.createElement("h3");
		modalTitle.innerText = "Galerie Photo";

		const gallery = document.querySelector(".gallery");

		const divider = document.createElement("hr");
		divider.className = "divider";

		const ajouterPhotoBtn = document.createElement("button");
		ajouterPhotoBtn.innerText = "Ajouter une photo";
		ajouterPhotoBtn.classList.add("ajouter-photo-btn");

		ajouterPhotoBtn.addEventListener("click", function () {
			removeModalContent();
			ajouterPhotoContent();
		});

		const deleteGalleryLink = document.createElement("a");
		deleteGalleryLink.innerText = "Supprimer la galerie";

		//all elements into a big div for easier styling
		newInnerDiv.appendChild(closeX);
		newInnerDiv.appendChild(modalTitle);
		newInnerDiv.appendChild(divider);
		newInnerDiv.appendChild(ajouterPhotoBtn);
		newInnerDiv.appendChild(deleteGalleryLink);
		//adding the styling div into the shell
		newOuterDiv.appendChild(newInnerDiv);

		//finally adding them into the modal html done above
		const modalDiv = document.getElementById("modal1");
		modalDiv.appendChild(newOuterDiv);
		renderMiniWorks();
	}

	function openModal() {
		const modalHTML = document.querySelector(".admin-div");
		modalHTML.addEventListener("click", function () {
			createModal();
			createModalContent();
			const modalTag = document.getElementById("modal1");
			modalTag.classList.remove("d-none");
			closeModal(modalTag);
		});
	}

	function closeModal(modal) {
		const closeX = document.querySelector(".close");
		const isModalContent = document.querySelector(".modal-content");
		modal.addEventListener("click", function (e) {
			if (e.target !== modal && !isModalContent.contains(e.target)) {
				// clicked outside the modal - remove the modal
				modal.remove();
			}
			if (e.target === closeX) {
				// clicked on the closeX element - remove the modal
				modal.remove();
			}
		});
	}

	openModal();

	//Second page of the modal

	function ajouterPhotoContent() {
		const newOuterDiv = document.querySelector(".modal-content");

		const newInnerDiv = document.createElement("div");
		newInnerDiv.classList.add("modal-ajouter-wrapper");

		const closeX = document.createElement("span");
		closeX.className = "close";
		closeX.innerText = "x";
		newInnerDiv.appendChild(closeX);

		const returnArrow = document.createElement("i");
		returnArrow.classList.add("return-arrow");
		returnArrow.innerText = "<-";
		newInnerDiv.appendChild(returnArrow);

		const modalTitle = document.createElement("h3");
		modalTitle.innerText = "Ajout Photo";
		newInnerDiv.appendChild(modalTitle);

		const ajouterPhotoDiv = document.createElement("div");
		const ajouterPhotoIcon = document.createElement("i");
		ajouterPhotoIcon.classList.add("fa-thin", "fa-image");
		const ajouterPhotoBtn = document.createElement("button");
		ajouterPhotoBtn.innerText = " + Ajouter Photo";
		ajouterPhotoBtn.classList.add("ajouter-btn");
		const ajouterPhotoFormats = document.createElement("p");
		ajouterPhotoFormats.innerText = "jpg, png : 4mo max";

		ajouterPhotoDiv.appendChild(ajouterPhotoIcon);
		ajouterPhotoDiv.appendChild(ajouterPhotoBtn);
		ajouterPhotoDiv.appendChild(ajouterPhotoFormats);

		newInnerDiv.appendChild(ajouterPhotoDiv);

		//create form the inputs need to go into
		const ajouterPhotoForm = document.createElement("form");
		//<form enctype="multipart/form-data" method="post" name="fileinfo">
		ajouterPhotoForm.setAttribute("enctype", "multipart/form-data");
		ajouterPhotoForm.setAttribute("method", "post");
		ajouterPhotoForm.setAttribute("name", "fileInfo");

		const ajouterPhotoTitleLabel = document.createElement("label");
		ajouterPhotoTitleLabel.setAttribute("for", "titre");
		ajouterPhotoTitleLabel.innerText = "Titre";
		ajouterPhotoTitleLabel.classList.add("titre", "titre-margin-top");
		newInnerDiv.appendChild(ajouterPhotoTitleLabel);
		const ajouterPhotoTitleInput = document.createElement("input");
		ajouterPhotoTitleInput.setAttribute("type", "text");
		ajouterPhotoTitleInput.setAttribute("name", "titre");
		ajouterPhotoTitleInput.classList.add("titre");

		ajouterPhotoForm.appendChild(ajouterPhotoTitleLabel);
		ajouterPhotoForm.appendChild(ajouterPhotoTitleInput);

		const ajouterPhotoCategorieLabel = document.createElement("label");
		ajouterPhotoCategorieLabel.setAttribute("for", "categorie");
		ajouterPhotoCategorieLabel.innerText = "Catégorie";
		ajouterPhotoCategorieLabel.classList.add("titre", "titre-margin-top");
		const ajouterPhotoCategorieInput = document.createElement("select");
		ajouterPhotoCategorieInput.setAttribute("id", "categorieSelect");
		ajouterPhotoCategorieInput.classList.add("titre");
		//creating the options for the select
		const ajouterPhotoCategorieOption1 = document.createElement("option");
		ajouterPhotoCategorieOption1.innerText = "Bar & Restaurant";
		ajouterPhotoCategorieInput.appendChild(ajouterPhotoCategorieOption1);
		ajouterPhotoForm.appendChild(ajouterPhotoCategorieLabel);
		ajouterPhotoForm.appendChild(ajouterPhotoCategorieInput);
		newInnerDiv.appendChild(ajouterPhotoForm);

		const divider = document.createElement("hr");
		divider.classList.add("divider", "titre-margin-top");
		newInnerDiv.appendChild(divider);
		const validerPhotoBtn = document.createElement("button");
		validerPhotoBtn.innerText = "Valider";
		validerPhotoBtn.classList.add("titre-margin-top", "valider-btn");
		newInnerDiv.appendChild(validerPhotoBtn);
		const modalHTML = document.getElementById("modal1");

		//put the new modal wrapper into the modal content box
		newOuterDiv.appendChild(newInnerDiv);
		modalHTML.appendChild(newOuterDiv);
	}

	function removeModalContent() {
		const modalContent = document.querySelector(".modal-wrapper");
		modalContent.remove();
	}

	const uploadWork = async function (formData) {
		const response = await fetch("http://localhost:5678/api/works/" + id, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				Authorization: "Bearer " + window.localStorage.getItem("token"),
			},
		});
	};
}
