import { renderMiniWorks } from "./miniWorks.js";

export function modalFunction() {
	const createModal = function (e) {
		const divTag = document.createElement("div");
		divTag.setAttribute("id", "modal1");
		divTag.classList.add("modal");
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

		ajouterPhotoBtn.addEventListener("click", function (e) {
			removeModalContent();
			e.stopPropagation();
			e.preventDefault();
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
		closeModal();

	}
	
	function openModal() {
		const modalHTML = document.querySelector(".admin-div");
		modalHTML.addEventListener("click", function (e) {
			e.preventDefault()
		  const modalTag = createModal();
		  createModalContent(modalTag);
		  modalTag.classList.remove("d-none");
		  closeModal();
		});
	  }

	function closeModal() {
		const closeX = document.querySelector(".close");
		const modalOverlay = document.querySelector(".modal")	  
		// handle clicks on closeX and modal elements
		closeX.addEventListener("click", function () {
			modalOverlay.remove();
		});
		window.addEventListener("click", function(event) {
			if (event.target == modalOverlay) {
			  modalOverlay.remove()
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
		returnArrow.classList.add("return-arrow", "fa-solid", "fa-arrow-left-long");
		returnArrow.addEventListener("click", function () {
			removeAjouterModalContent();
			const divToRemove = document.querySelector(".modal-content")
			divToRemove.remove()
			createModalContent();
		});
		newInnerDiv.appendChild(returnArrow);

		const modalTitle = document.createElement("h3");
		modalTitle.innerText = "Ajout Photo";
		newInnerDiv.appendChild(modalTitle);

		const ajouterPhotoDiv = document.createElement("div");
		ajouterPhotoDiv.classList.add("ajouter-photo-img-div");
		const ajouterPhotoIcon = document.createElement("i");
		ajouterPhotoIcon.classList.add(
			"fa-regular",
			"fa-image",
			"image-placeholder"
		);

		const ajouterPhotoBtn = document.createElement("input");
		ajouterPhotoBtn.innerText = " + Ajouter Photo";
		ajouterPhotoBtn.classList.add("ajouter-btn");
		ajouterPhotoBtn.setAttribute("type", "file");

		const ajouterPhotoFormats = document.createElement("p");
		ajouterPhotoFormats.innerText = "jpg, png : 4mo max";

		ajouterPhotoDiv.appendChild(ajouterPhotoIcon);
		ajouterPhotoDiv.appendChild(ajouterPhotoBtn);
		ajouterPhotoDiv.appendChild(ajouterPhotoFormats);

		//create form the inputs need to go into
		const ajouterPhotoForm = document.createElement("form");
		ajouterPhotoForm.setAttribute("enctype", "multipart/form-data");
		ajouterPhotoForm.setAttribute("method", "post");
		ajouterPhotoForm.setAttribute("name", "fileInfo");
		ajouterPhotoForm.setAttribute("id", "ajouterPhotoForm");

		ajouterPhotoForm.appendChild(ajouterPhotoDiv);

		const ajouterPhotoTitleLabel = document.createElement("label");
		ajouterPhotoTitleLabel.setAttribute("for", "titre");
		ajouterPhotoTitleLabel.innerText = "Titre";
		ajouterPhotoTitleLabel.classList.add("titre", "titre-margin-top");
		newInnerDiv.appendChild(ajouterPhotoTitleLabel);
		const ajouterPhotoTitleInput = document.createElement("input");
		ajouterPhotoTitleInput.setAttribute("type", "text");
		ajouterPhotoTitleInput.setAttribute("name", "titre");
		ajouterPhotoTitleInput.required = true;
		ajouterPhotoTitleInput.classList.add("titre");

		ajouterPhotoForm.appendChild(ajouterPhotoTitleLabel);
		ajouterPhotoForm.appendChild(ajouterPhotoTitleInput);

		const ajouterPhotoCategorieLabel = document.createElement("label");
		ajouterPhotoCategorieLabel.setAttribute("for", "categorie");
		ajouterPhotoCategorieLabel.innerText = "Catégorie";
		ajouterPhotoCategorieLabel.classList.add("titre", "titre-margin-top");
		ajouterPhotoForm.appendChild(ajouterPhotoCategorieLabel);

		const selectCategory = document.createElement("select");
		selectCategory.className = "select-category";
		selectCategory.setAttribute("id", "select-category");
		ajouterPhotoForm.appendChild(selectCategory);


		// Dynamiser les categories pour qu'elles soient liés a l'API directement et non fait en dur
		fetch("http://localhost:5678/api/categories")
			.then((response) => response.json())

			.then((categories) => {
				const selectCategory = document.getElementById("select-category");
				categories.forEach((category) => {
					const newOption = document.createElement("option");
					newOption.innerText = category.name;
					newOption.setAttribute("value", category.name);
					selectCategory.appendChild(newOption);
				});
			});
	
		const divider = document.createElement("hr");
		divider.classList.add("divider", "titre-margin-top");
		ajouterPhotoForm.appendChild(divider)

		const validerPhotoBtn = document.createElement("input");
		validerPhotoBtn.setAttribute("type", "button")
		validerPhotoBtn.setAttribute("value", "Valider")
		validerPhotoBtn.classList.add("titre-margin-top", "valider-btn");
		validerPhotoBtn.addEventListener("submit", function (e) {
			e.preventDefault();
			if (ajouterPhotoTitleInput.checkValidity()) {
				uploadWork();
			}
		});
		ajouterPhotoForm.appendChild(validerPhotoBtn)
		newInnerDiv.appendChild(ajouterPhotoForm);

		
		const modalHTML = document.getElementById("modal1");

		//put the new modal wrapper into the modal content box
		newOuterDiv.appendChild(newInnerDiv);
		modalHTML.appendChild(newOuterDiv);
		closeModal();
	}


	function removeModalContent() {
		const modalContent = document.querySelector(".modal-wrapper");
		modalContent.remove();
	}

	function removeAjouterModalContent() {
		const modalAjouterContent = document.querySelector(
			".modal-ajouter-wrapper"
		);
		modalAjouterContent.remove();
	}

	function uploadWork() {
		const ajouterPhotoForm = document.forms.namedItem("fileInfo");
		ajouterPhotoForm.submit()
		const formData = new FormData(ajouterPhotoForm);
		const ajouterPhotoBtn = document.querySelector(".ajouter-btn");
		formData.append("image", ajouterPhotoBtn.files[0]);

		fetch("http://localhost:5678/api/works/", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				Authorization: "Bearer " + window.localStorage.getItem("token"),
			},
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}
}
