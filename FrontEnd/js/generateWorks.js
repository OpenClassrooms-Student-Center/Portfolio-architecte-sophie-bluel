export function generateHTMLForWork(work, gallery) {
    const img = document.createElement('img');
    img.src = work.imageUrl;

    const figCaption = document.createElement('figcaption');
    figCaption.innerText = work.title;

    const figure = document.createElement('figure');

    figure.classList.add(`work`, `category-${work.category.id}`);
    figure.classList.add(`work`, `work-${work.id}`);
    figure.appendChild(img);
    figure.appendChild(figCaption);

    gallery.appendChild(figure);
}

export default function generateHTMLForWorks(works) {
    const gallery = document.querySelector('.gallery');

    works.forEach(function (work) {
        generateHTMLForWork(work, gallery);
    });
}
