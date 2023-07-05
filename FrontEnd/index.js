async function fetchData(url) {
    try {
        const response = await fetch(url);  
        const data = await response.json();
        console.log('Data fetched:', data);
        return data;
    } catch (error) {
        console.log(error)
    }
}


function createElement(work, container) {
    const projectElement = document.createElement('figure');
    projectElement.dataset.id = work.id;  
    const imageElement = document.createElement('img');

    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    imageElement.className = work.category.name;

    const captionElement = document.createElement('figcaption');
    captionElement.textContent = work.title;

    projectElement.appendChild(imageElement);
    projectElement.appendChild(captionElement);
    container.appendChild(projectElement);
}

async function deleteImage(event) {
    if (!event.target.classList.contains('fa-trash-can')) {
        return;
    }
    const workId = event.target.closest('.modal-image-container').dataset.id;

    works = works.filter(work => work.id !== workId);

    event.target.closest('.modal-image-container').remove();

    const gallery = document.querySelector('.gallery');
    const imageElement = gallery.querySelector(`figure[data-id="${workId}"]`);
    if (imageElement) {
        imageElement.remove();
    }
    try {
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation: ', error);
    }
}

document.addEventListener('click', deleteImage);


function displayCategories(categories) {
    const categoriesContainer = document.querySelector('.categories');

     const allCategoryElement = document.createElement('button');
     allCategoryElement.textContent = 'Tous';
     allCategoryElement.classList.add('category-button', 'active');  
     allCategoryElement.dataset.id = '0'; 

     allCategoryElement.addEventListener('click', function () {
        const buttons = document.querySelectorAll('.category-button');

        buttons.forEach(button => button.classList.remove('active'));

        this.classList.add('active');
    });

     categoriesContainer.appendChild(allCategoryElement);

    categories.forEach(category => {
        const categoryElement = document.createElement('button');
        categoryElement.textContent = category.name;
        categoryElement.classList.add('category-button');
        categoryElement.dataset.id = category.id;
        categoryElement.addEventListener('click', function () {
            const buttons = document.querySelectorAll('.category-button');

            buttons.forEach(button => button.classList.remove('active'));

            this.classList.add('active');
        });

        categoriesContainer.appendChild(categoryElement);
    });
}

document.addEventListener('click', event => {
    if (event.target.classList.contains('category-button')) {
        filterWorksByCategory(event.target.dataset.id);
    }
});

async function filterWorksByCategory(categoryId) {
    const works = await fetchData('http://localhost:5678/api/works');

    let filteredWorks;
    if (categoryId === "0") { 
        filteredWorks = works;
    } else {
        filteredWorks = works.filter(work => String(work.categoryId) === categoryId);
    }

    const gallery = document.querySelector('.gallery');
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }

    filteredWorks.forEach(work => {
        createElement(work, gallery);
    });
}


function fillCategoriesSelect(categories) {
    const selectElement = document.getElementById('categorie-projet');

    categories.forEach(category => {
        const optionElement = document.createElement('option');
        optionElement.text = category.name;
        optionElement.value = category.id;
        selectElement.appendChild(optionElement);
    });
}


async function init() {
    
    const works = await fetchData('http://localhost:5678/api/works');
    const categories = await fetchData('http://localhost:5678/api/categories');
    const token = localStorage.getItem('token')

    localStorage.setItem('works', JSON.stringify(works));

    fillCategoriesSelect(categories);
    const gallery = document.querySelector('#gallery');
    works.forEach(work => {
        createElement(work, gallery);
    });
    if (!token) {
        displayCategories(categories);
    }
}

init();
