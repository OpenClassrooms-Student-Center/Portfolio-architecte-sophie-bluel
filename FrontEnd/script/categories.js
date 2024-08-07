const categories_endpoint = "http://localhost:5678/api/categories";
const galleryNode = document.querySelector('[rel=js-gallery]');
const filtersNode = document.createElement('div'); // Add this line
const parentNode = galleryNode.parentNode; // Ensure this is correct

(async () => {
    const categories = await httpGet(categories_endpoint);
    console.log(categories);

    if (!categories) {
        // handle error
    }

    createFilters(categories);
})();

function createFilters(categories) {
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.dataset.id = 0;
    allButton.classList.add('active');
    filtersNode.appendChild(allButton);

    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category.name;
        button.dataset.id = category.id;
        filtersNode.appendChild(button);
    });

    const buttons = filtersNode.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener("click", applyFilter);
    });

    parentNode.insertBefore(filtersNode, galleryNode);
}

function applyFilter(event) {
    resetFilters();
    const button = event.target;
    const category = button.dataset.id;
    button.classList.add('active');
    filterGallery(category);
}

function resetFilters() {
    const buttons = filtersNode.querySelectorAll('button');
    buttons.forEach(button => button.classList.remove('active'));
}

function filterGallery(category) {
    const articles = galleryNode.querySelectorAll(".articleCard");
    articles.forEach(article => {
        if (category === "0" || article.getAttribute("data-category") === category) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
}
