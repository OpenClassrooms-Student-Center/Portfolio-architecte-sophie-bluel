// assets/js/gallery.js
export function displayWorks(works, targetContainer, isModal = false, onDeleteCallback = null) {
    targetContainer.innerHTML = "";
    works.forEach(work => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;

        figure.appendChild(img);

        if (isModal) {
            const deleteIcon = document.createElement("div");
            deleteIcon.classList.add("delete-icon");
            deleteIcon.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
            
            deleteIcon.addEventListener("click", async (e) => {
                e.preventDefault();
                if (onDeleteCallback) {
                    await onDeleteCallback(work.id);
                }
            });

            figure.appendChild(deleteIcon);
        } else {
            const figcaption = document.createElement("figcaption");
            figcaption.innerText = work.title;
            figure.appendChild(figcaption);
        }

        targetContainer.appendChild(figure);
    });
}

export function createFilters(categories, allWorks, galleryContainer, portfolioSection) {
    if (document.querySelector(".filter-container")) return;

    const filterContainer = document.createElement("div");
    filterContainer.classList.add("filter-container");

    const btnAll = document.createElement("button");
    btnAll.innerText = "Tous";
    btnAll.classList.add("filter-btn", "active");
    btnAll.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btnAll.classList.add("active");
        displayWorks(allWorks, galleryContainer);
    });
    filterContainer.appendChild(btnAll);

    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.innerText = category.name;
        btn.classList.add("filter-btn");
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filteredWorks = allWorks.filter(work => work.categoryId === category.id);
            displayWorks(filteredWorks, galleryContainer);
        });
        filterContainer.appendChild(btn);
    });

    portfolioSection.insertBefore(filterContainer, galleryContainer);
}