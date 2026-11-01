// assets/js/modal.js
import { displayWorks } from "./gallery.js";

export function initModal(editBtn, works, categories, onDeleteCallback, onAddCallback) {
    const modal = document.getElementById("modal");
    if (!modal) return;

    const modalClose = modal.querySelector(".modal-close");
    const btnAddPhotoView = document.getElementById("btn-add-photo");
    const modalGalleryView = document.getElementById("modal-gallery-view");
    const modalAddView = document.getElementById("modal-add-view");
    const modalBack = modal.querySelector(".modal-back");
    const inputUpload = document.getElementById("image-upload");
    const imagePreview = document.getElementById("image-preview");
    const modalGalleryContainer = modal.querySelector(".modal-gallery");
    
    const inputTitle = document.getElementById("photo-title");
    const selectCategory = document.getElementById("photo-category");
    const btnSubmit = document.getElementById("btn-submit-photo");
    const formAddPhoto = document.getElementById("form-add-photo");

    if (modalGalleryContainer && works) {
        displayWorks(works, modalGalleryContainer, true, onDeleteCallback);
    }

    if (selectCategory && categories) {
        selectCategory.innerHTML = '<option value=""></option>';
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            selectCategory.appendChild(option);
        });
    }

    if (inputUpload && imagePreview) {
        inputUpload.addEventListener("change", () => {
            const file = inputUpload.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
            checkFormValidation();
        });
    }

    function checkFormValidation() {
        if (inputUpload && inputTitle && selectCategory && btnSubmit) {
            if (inputUpload.files.length > 0 && inputTitle.value.trim() !== "" && selectCategory.value !== "") {
                btnSubmit.disabled = false;
            } else {
                btnSubmit.disabled = true;
            }
        }
    }

    if (inputTitle) inputTitle.addEventListener("input", checkFormValidation);
    if (selectCategory) selectCategory.addEventListener("change", checkFormValidation);

    function closeModal() {
        modal.style.display = "none";
        if (formAddPhoto) formAddPhoto.reset();
        if (imagePreview) {
            imagePreview.src = "";
            imagePreview.style.display = "none";
        }
        if (btnSubmit) btnSubmit.disabled = true;
        if (modalGalleryView && modalAddView) {
            modalGalleryView.style.display = "block";
            modalAddView.style.display = "none";
        }
    }

    if (!modal.dataset.listenerAttached) {
        modal.dataset.listenerAttached = "true";
        modal.addEventListener("click", (e) => {
            if (e.target === modal || e.target.closest(".modal-close")) {
                closeModal();
            }
            else if (e.target.closest("#btn-add-photo")) {
                if (modalGalleryView && modalAddView) {
                    modalGalleryView.style.display = "none";
                    modalAddView.style.display = "block";
                }
            }
            else if (e.target.closest(".modal-back")) {
                if (modalGalleryView && modalAddView) {
                    modalAddView.style.display = "none";
                    modalGalleryView.style.display = "block";
                }
            }
        });
    }

    // Gestione del submit senza clonazione per non perdere il file selezionato
    if (formAddPhoto && !formAddPhoto.dataset.listenerAttached) {
        formAddPhoto.dataset.listenerAttached = "true";

        formAddPhoto.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (!inputUpload.files[0] || inputTitle.value.trim() === "" || selectCategory.value === "") {
                alert("Veuillez remplir tous les champs et sélectionner une image.");
                return;
            }
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("image", inputUpload.files[0]);
            formData.append("title", inputTitle.value.trim());
            formData.append("category", selectCategory.value);

            if (onAddCallback) {
                await onAddCallback(formData, token);
                closeModal();
            }
        });
    }

    if (editBtn) {
        editBtn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.style.display = "flex";
            if (modalGalleryView) modalGalleryView.style.display = "block";
            if (modalAddView) modalAddView.style.display = "none";
        });
    }

    if (modalClose) modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

    if (btnAddPhotoView && modalGalleryView && modalAddView) {
        btnAddPhotoView.addEventListener("click", () => {
            modalGalleryView.style.display = "none";
            modalAddView.style.display = "block";
        });
    }

    if (modalBack && modalGalleryView && modalAddView) {
        modalBack.addEventListener("click", () => {
            modalAddView.style.display = "none";
            modalGalleryView.style.display = "block";
        });
    }
}