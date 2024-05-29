import utils from './utils.js';

//alert(utils.getToken())

function generateHTMLForWorks(works) {
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

function generateHTMLForFiltersWithEvents(categories) {
    const filters = document.querySelector('.filters');

    /******* btn tous ********/

    const btn = document.createElement('button');
    btn.innerText = 'Tous';
    btn.classList.add('active');
    filters.appendChild(btn);

    btn.addEventListener('click', function (event) {
        document.querySelector('button.active').classList.remove('active');
        event.target.classList.add('active');
        document.querySelectorAll('.work.hidden').forEach(function (element) {
            element.classList.remove('hidden');
        });
    });

    /******* btn filters ********/

    categories.forEach(function (category) {
        const btn = document.createElement('button');
        btn.innerText = category.name;

        btn.addEventListener('click', function (event) {
            const activeElement = document.querySelector('.active');

            //Stop if click again on the same filter
            if (activeElement === event.target) {
                return;
            }

            activeElement.classList.remove('active');
            event.target.classList.add('active');

            document.querySelectorAll('.work').forEach((element) => {
                const isCurrentCategory = element.classList.contains(
                    `category-${category.id}`
                );
                const isHidden = element.classList.contains('hidden');

                if (isCurrentCategory && isHidden) {
                    element.classList.remove('hidden');
                } else if (!isCurrentCategory && !isHidden) {
                    element.classList.add('hidden');
                }
            });
        });
        filters.appendChild(btn);
    });
}

function filtersAndEventRegenerate(categories) {
    const filters = document.querySelector('.filters');

    /******* btn tous ********/
    const btn = document.createElement('button');
    btn.innerText = 'Tous';
    filters.appendChild(btn);

    btn.addEventListener('click', function () {
        generateHTMLForWorks(works);
    });

    /******* btn filters ********/
    categories.forEach(function (category) {
        const btn = document.createElement('button');
        btn.innerText = category.name;

        btn.addEventListener('click', function () {
            document.querySelector('.gallery').innerHTML = '';
            generateHTMLForWorks(
                works.filter((work) => work.category.name === category.name)
            );
        });

        filters.appendChild(btn);
    });
}

const works = await utils.fetchJSON('/works');
generateHTMLForWorks(works);

const categories = await utils.fetchJSON('/categories');
generateHTMLForFiltersWithEvents(categories);
// filtersAndEventRegenerate(categories);
