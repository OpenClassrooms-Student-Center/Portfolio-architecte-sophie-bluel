fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const galleryElement = document.querySelector('.gallery');
    let projets = '';

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const elementHtml =
       `
        <div class="gallery-item">          
          <img src="${item.imageUrl}" class="image">
          <div class="title">${item.title}</div>      
        </div>
      `;
      projets += elementHtml;
    }
    galleryElement.innerHTML = projets;
  })
  .catch(error => {
    console.error('Une erreur s\'est produite :', error);
  });