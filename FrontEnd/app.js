fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        // Organiser les travaux par catégorie
        const categories = data.reduce((acc, item) => {
            const categoryName = item.category.name;
            if (!acc[categoryName]) {
                acc[categoryName] = [];
            }
            acc[categoryName].push(item);
            return acc;
        }, {});

        // l'élément où afficher les données
        const element = document.getElementById('gallery');
        element.style.display = 'grid';
        element.style.gridTemplateColumns = 'repeat(3, 1fr)';
        element.style.gap = '10px';

        // Ajouter tous les travaux à la galerie
        data.forEach(item => {
            appendWorkToGallery(item, element);
        });

        // Créer l'élément de sélection de catégorie
        const filterContainerElement = document.createElement('div');
        filterContainerElement.id = 'filterContainer';

        // Créer un bouton pour chaque catégorie
        ['Tous', ...Object.keys(categories)].forEach(category => {
            const buttonElement = document.createElement('button');
            buttonElement.style.margin = '0 10px';
            buttonElement.style.width = 'auto';
            buttonElement.style.minWidth = '100px'
            buttonElement.style.color = '#1D6154'
            buttonElement.style.padding = '9px'
            buttonElement.style.borderRadius = '60px'
            buttonElement.style.fontWeight = '700'
            buttonElement.style.border = '1px solid #1D6154'
            buttonElement.style.backgroundColor = 'white'
            buttonElement.textContent = category;

            // Mettre à jour la galerie lorsque le bouton est cliqué
            buttonElement.addEventListener('click', () => {
                // Supprimer la classe "button-selected" de tous les boutons
                const buttons = filterContainerElement.querySelectorAll('button');
                buttons.forEach(button => {
                    button.classList.remove('button-selected');
                    button.style.backgroundColor = 'white'; // Réinitialiser la couleur de fond
                    button.style.color = '#1D6154'; 
                });

                // Ajouter la classe "button-selected" au bouton sélectionné
                buttonElement.classList.add('button-selected');
                buttonElement.style.backgroundColor = '#1D6154'; // Changer la couleur de fond
                buttonElement.style.color='white'; 

                // Vider la galerie
                const galleryElement = document.getElementById('gallery');
                galleryElement.innerHTML = '';

                // Ajouter les travaux de la catégorie sélectionnée à la galerie
                const selectedCategory = buttonElement.textContent;
                if (selectedCategory === 'Tous') {
                    data.forEach(work => appendWorkToGallery(work, galleryElement));
                } else {
                    categories[selectedCategory].forEach(work => appendWorkToGallery(work, galleryElement));
                }
            });


            filterContainerElement.appendChild(buttonElement);
        });

        // Ajouter le conteneur de filtres au document, avant la galerie
        const galleryElement = document.getElementById('gallery');
        galleryElement.parentNode.insertBefore(filterContainerElement, galleryElement);

        // Fonction pour ajouter un travail à la galerie
        function appendWorkToGallery(work, galleryElement) {
            let div = document.createElement('div');
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            div.style.alignItems = 'flex-start';
            div.style.margin = '10px';

            // créer un nouvel élément img
            let img = document.createElement('img');
            img.style.width = '100%';
            img.style.height = '413px';
            img.style.margin = '10px';
            let title = document.createElement('h3');

            // attribut src de l'élément img pour pointer vers l'image
            img.src = work.imageUrl;
            title.textContent = work.title;
            title.style.marginLeft = '10px'

            // ajouter l'élément img à l'élément gallery
            div.appendChild(img);
            div.appendChild(title);
            galleryElement.appendChild(div);
        }

        // Ajouter le conteneur de filtres et la galerie au conteneur commun
        const contentElement = document.getElementById('content');
        contentElement.appendChild(filterContainerElement);
        contentElement.appendChild(element);


        // Déclencher manuellement l'événement 'click' sur le premier bouton pour remplir la galerie avec tous les travaux
        filterContainerElement.querySelector('button').click();
    })
    .catch(error => console.error('Erreur:', error));
