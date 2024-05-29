import utils from './utils.js';
import generateHTMLForWorks from './generateWorks.js';
import generateHTMLForFiltersWithEvents from './generateFilters.js';

if (utils.getToken() !== null) {
    const authButton = document.querySelector('#auth-button');
    authButton.innerHTML = '<a id="logout" href="login.html">logout</a>';

    const logoutLink = document.querySelector('#logout');
    logoutLink.addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.removeItem('loginToken');
        location.href = 'index.html';
    });
}

const works = await utils.fetchJSON('/works');
generateHTMLForWorks(works);

const categories = await utils.fetchJSON('/categories');
generateHTMLForFiltersWithEvents(categories);
// filtersAndEventRegenerate(categories);
