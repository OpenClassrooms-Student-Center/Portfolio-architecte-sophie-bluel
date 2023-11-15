

// Récupérer le modal et les pages
var modal = document.getElementById('myModal');
var pages = document.getElementsByClassName('modal-content');

// Fonction pour afficher le modal et la première page
function openModal() {
  modal.style.display = 'block';
  pages[0].style.display = 'block';
}

// Fonction pour fermer le modal et réinitialiser les pages
function closeModal() {
  modal.style.display = 'none';
  for (var i = 0; i < pages.length; i++) {
    pages[i].style.display = 'none';
  }
}

// Fonction pour passer à la page suivante
function nextPage() {
  pages[0].style.display = 'none';
  pages[1].style.display = 'block';
}

// Fonction pour revenir à la page précédente
function prevPage() {
  pages[1].style.display = 'none';
  pages[0].style.display = 'block';
}

// Appeler la fonction openModal pour afficher le modal
openModal();
