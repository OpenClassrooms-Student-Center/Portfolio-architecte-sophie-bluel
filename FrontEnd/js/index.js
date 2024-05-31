import utils from './utils.js';
import generateHTMLForWorks from './generateWorks.js';
import generateHTMLForFiltersWithEvents from './generateFilters.js';

// if (utils.getToken() !== null) {
//     const logoutLink = document.querySelector('#logout');
//     logoutLink.addEventListener('click', function (event) {
//         event.preventDefault();
//         localStorage.removeItem('loginToken');
//         location.href = 'index.html';
//     });

//     document.querySelector('.filters').remove();
// } else {
const categories = await utils.fetchJSON('/categories');
generateHTMLForFiltersWithEvents(categories);
//}

const works = await utils.fetchJSON('/works');
generateHTMLForWorks(works);

// filtersAndEventRegenerate(categories);
