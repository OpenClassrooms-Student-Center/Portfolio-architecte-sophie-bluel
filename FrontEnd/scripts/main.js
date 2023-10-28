import { fetchData } from './gallery.js';
import { appendProjectsToGallery } from './gallery.js';
import { getCategoryNames } from './gallery.js';
import { addFiltersBtns } from './gallery.js';
import { filterImages } from './gallery.js';

const gallery = document.querySelector('#portfolio .gallery');
/**
 * Cette fonction récupère les données des projets de l'architecte depuis l'API
 * et remplit la page d'accueil du site avec les visuels & infos desdits projets.
*/

fetchData()
  .then((data) => {
    console.log('Fetched data OK :', data);
    const categoryNames = getCategoryNames(data);
    addFiltersBtns(portfolio, gallery, categoryNames);
    appendProjectsToGallery(data, gallery, categoryNames);
  })
  .then(() => {
    const boxFilters = document.querySelector('.filters-container');

    console.log(boxFilters)
    const showAllButton = boxFilters.querySelector('button.all-projects');
    showAllButton.addEventListener('click', () => {
        filterImages('all');
    });
    const categoryButtons = boxFilters.querySelectorAll('button.filter-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterImages(button.getAttribute('data-category'));
        });
    });
  })
  .catch((error) => {
    console.error('An error occurred :', error);
  });