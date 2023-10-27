import { fetchData } from './gallery.js';
import { appendProjectsToGallery } from './gallery.js';

const gallery = document.querySelector('#portfolio .gallery');
/**
 * Cette fonction récupère les données des projets de l'architecte depuis l'API
 * et remplit la page d'accueil du site avec les visuels & infos desdits projets.
*/

fetchData()
  .then((data) => {
    console.log('Fetched data OK :', data);
    appendProjectsToGallery(data, gallery);
  })
  .catch((error) => {
    console.error('An error occurred :', error);
  });