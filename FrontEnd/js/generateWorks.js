export default function generateHTMLForWorks(works) {
    const gallery = document.querySelector('.gallery');

    works.forEach(function (work) {
        const img = document.createElement('img');
        img.src = work.imageUrl;

        const figCaption = document.createElement('figcaption');
        figCaption.innerText = work.title;

        const figure = document.createElement('figure');

        figure.classList.add(`work`, `category-${work.category.id}`);
        figure.appendChild(img);
        figure.appendChild(figCaption);

        gallery.appendChild(figure);
    });
}
