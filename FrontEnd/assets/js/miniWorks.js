export function renderMiniWorks(category) {
    const modalWrapper = document.createElement("div");
    modalWrapper.className = "miniGallery";
    const divider = document.querySelector(".divider")

  
    fetch("http://localhost:5678/api/works")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((works) => {
        //pour chaque objet work dans works alors on va ...
        works.forEach((work) => {
  
            const newFigure = document.createElement("figure");
            const newImage = document.createElement("img");
            const trashCan = document.createElement("i")
            trashCan.classList.add("fa-regular", "fa-trash-can")
  
            newImage.src = work.imageUrl;
            newImage.alt = "Photo du projet";
  
            newFigure.appendChild(newImage);
            const newFigcaption = document.createElement("figcaption");
            newFigcaption.innerText = "éditer";
            newFigure.append(trashCan)
            newFigure.appendChild(newFigcaption);
            modalWrapper.appendChild(newFigure);
            divider.insertAdjacentElement("beforeBegin", modalWrapper)
                  
        })
      
      })


  
  }
  