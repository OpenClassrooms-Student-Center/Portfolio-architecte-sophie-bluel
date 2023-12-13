
document.addEventListener("DOMContentLoaded", function() {

    /*Verification du token*/
    const storedToken = localStorage.getItem("user");
    //

    /*Supprimer token*/
    function deletetoken() {
        localStorage.removeItem("user");

        window.location.href = "login.html";
    }
    //

    const sectionBouttons = document.getElementById("bouttons-container");
    const gallery = document.querySelector(".gallery");

    const tousButton = document.createElement("button");
    tousButton.innerHTML = "Tous";
    tousButton.addEventListener("click", function() {
        removeAllButtonBackgrounds();
        this.classList.add("active");
        fetchDataFromApi();
    });
    sectionBouttons.appendChild(tousButton);

    fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
                const categoryButton = document.createElement("button");
                categoryButton.innerHTML = category.name;

                categoryButton.addEventListener("click", function() {
                    removeAllButtonBackgrounds();
                    this.classList.add("active");
                    if (category.id === 4) {
                        fetchDataFromApi();
                    } else {
                        fetchDataFromApi(category.id);
                    }
                });

                sectionBouttons.appendChild(categoryButton);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la requête pour les catégories :', error.message);
        });

    function removeAllButtonBackgrounds() {
        const buttons = sectionBouttons.getElementsByTagName("button");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("active");
        }
    }

    function fetchDataFromApi(categoryId) {
        const apiUrl = `http://localhost:5678/api/works`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (categoryId !== undefined) {
                    const filteredData = data.filter(item => item.categoryId === categoryId);
                    updateImages(filteredData);
                } else {
                    updateImages(data);
                }
            })
            .catch(error => {
                console.error('Erreur lors de la requête pour les œuvres :', error.message);
            });
    }


    function updateImages(images) {
        gallery.innerHTML = "";
    
        images.forEach(image => {
            
            const imgElement = document.createElement("img");
            imgElement.src = image.imageUrl;
            imgElement.alt = image.title;
    
            
            const captionElement = document.createElement("p");
            captionElement.textContent = image.title;
    
            
            const imageContainer = document.createElement("div");
            imageContainer.appendChild(imgElement);
            imageContainer.appendChild(captionElement);
    
            
            gallery.appendChild(imageContainer);
        });
    }

    const sectionImages = document.querySelector(".gallery");

    if (sectionImages) {
        fetch('http://localhost:5678/api/works', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
        .then(response => response.json())
        .then(projectsData => {

            projectsData.forEach(project => {
                const projectElement = document.createElement("div");
                projectElement.classList.add("project");

                const imageElement = document.createElement("img");
                imageElement.src = project.imageUrl;

                const titleElement = document.createElement("h3");
                titleElement.textContent = project.title;

                projectElement.appendChild(imageElement);
                projectElement.appendChild(titleElement);

                sectionImages.appendChild(projectElement);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la requête API :', error.message);
        });
    } else {
        console.error("Error: Could not find the .gallery element");
    }

    /*Gestion de la connexion*/

    if (storedToken !== null) {
        document.querySelector('.bandereau').style.display = 'flex';
        document.querySelector('#bouttons-container').style.display='none';
        document.querySelector('.modalButton').style.display = 'flex';

    } else {
        document.querySelector('.bandereau').style.display = 'none';
        document.querySelector('#bouttons-container').style.display='flex';
        document.querySelector('.modalButton').style.display = 'none';
    }

    const logoutButton = document.getElementById("logoutButton");

    if (storedToken !== null) {

        logoutButton.textContent = "Logout";
        logoutButton.addEventListener("click", deletetoken);
    } else {

        logoutButton.textContent = "Login";
        logoutButton.addEventListener("click", redirectToLogin);
    }
});

function deletetoken() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

function redirectToLogin() {
    window.location.href = "login.html";
}
    /*GESTION MODAL*/

    function closeModal() {
        document.querySelector('.overlay').style.display = 'none';
        document.querySelector('.modale__photo').classList.remove('modale__photo--open');
    }
    
    function modalUpload() {
        document.querySelector('.modale').classList.add('modal--open');
    }
    
    function backModal() {
        document.querySelector('.modale').classList.remove('modal--open');
        resetModal();
    }
    
    function close() {
        document.querySelector('.modale').classList.remove('modal--open');
    }
    
    function openModal() {
        document.querySelector('.overlay').style.display = 'block';
        document.querySelector('.modale__photo').classList.add('modale__photo--open');
        updateGalleryModalWithImages();
    }
    
    function closeModal2() {
        document.querySelector('.modale').classList.remove('modal--open');
        resetModal();
    }

    function updateGalleryModalWithImages() {
        let galleryImages = document.querySelectorAll('.gallery img');
        let galleryModal = document.querySelector('.gallery__modal');
    
        galleryModal.innerHTML = '';
    
        galleryImages.forEach((image, index) => {
            let imageId = image.parentNode.dataset.imageId;
    
            let imgContainer = document.createElement("div");
            imgContainer.classList.add("modal-image-container");
    
            let imgClone = image.cloneNode(true);
            imgContainer.appendChild(imgClone);
    
            let buttonElement = document.createElement("button");
            buttonElement.style.backgroundImage = 'url("assets/images/trash-can-solid.png")';
            buttonElement.style.border = "none";
            buttonElement.addEventListener("click", function() {
                deleteImageFromApi(imageId);
                galleryImages[index].parentNode.remove();
    
                markImageAsDeleted(imageId);
            });
            imgContainer.appendChild(buttonElement);
    
            galleryModal.appendChild(imgContainer);
        });
    }