 //crée les bouton des catégories
 function boutonsCategories(){
  
  //récupèrer l'id de la section gallery
  const divPortfolio = document.getElementById('portfolio');

  //creer le conteneur
  const divBoutons = document.createElement('div');
  divBoutons.className = 'categories';

  //création des boutons
  const btnAll =document.createElement('button');
  btnAll.textContent='Tous';
  btnAll.id='all';

  const btn1 = document.createElement('button');
  btn1.textContent='objets';
  btn1.id='objets';

  const btn2 = document.createElement('button');
  btn2.textContent='appartements';
  btn2.id='appartements';

  const btn3 = document.createElement('button');
  btn3.textContent='hotels';
  btn3.id='hotels';

  //ajouter les boutons au conteneur
  divBoutons.appendChild(btnAll);
  divBoutons.appendChild(btn1);
  divBoutons.appendChild(btn2);
  divBoutons.appendChild(btn3);

  //ajouter les boutons du conteneur dans la section portfolio
  divPortfolio.querySelector('h2').insertAdjacentElement('afterend' ,divBoutons);
 

  //Ajouter le filtre pour les boutons
  btnAll.addEventListener('click', function() {
    // Affiche toutes les images
    document.querySelectorAll('.gallery img').forEach(image => {
        image.parentElement.style.display = 'block';
    });
  });
  
  btn1.addEventListener('click', function() {
    // Affiche les images avec data-category="1" 
    document.querySelectorAll('.gallery img').forEach(image => {
      if (image.getAttribute('category') === '1') {
        image.parentElement.style.display = 'block';
      } else {
        image.parentElement.style.display = 'none';
      }
    });
  });
  
  btn2.addEventListener('click', function() {
    // Affiche les images avec data-category="2" 
    document.querySelectorAll('.gallery img').forEach(image => {
      if (image.getAttribute('category') === '2') {
        image.parentElement.style.display = 'block';
      } else {
        image.parentElement.style.display = 'none';
      }
    });
  });
  
  btn3.addEventListener('click', function() {
    // Affiche les images avec data-category="3" 
    document.querySelectorAll('.gallery img').forEach(image => {
      if (image.getAttribute('category') === '3') {
        image.parentElement.style.display = 'block';
      } else {
        image.parentElement.style.display = 'none';
      }
    });
  });
  console.log(divBoutons)
}


// récuperer les images et les afficher dynamiquement 
 
function afficherImages() { 
    fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(images => {
        const imagesContainer = document.querySelector('.gallery');
  
        images.forEach(item => {
          const figure = document.createElement('figure');
          const img = document.createElement('img');
          const figcaption = document.createElement('figcaption');
  
          img.setAttribute('src', item.imageUrl);
          img.setAttribute('alt', item.title);
          img.setAttribute('category', item.categoryId); 
          
          img.setAttribute('crossorigin', 'anonymous');
          figcaption.textContent = item.title;
  
          figure.appendChild(img);
          figure.appendChild(figcaption);
          imagesContainer.appendChild(figure);
          console.log(item.categoryId);
        });
      })
      .catch(error => console.error(error));
  }
  

  

  
  
  