

const getApi = async () => {
    try {
      const response = await fetch("http://localhost:5678/api/works");
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; 
    }
  };
  



  function generateImages(images, containerId) {
    const gallery = document.getElementById(containerId);
    gallery.innerHTML = "";
  
    // Loop through the images array and create HTML elements for each image
    images.forEach(article => {
      const imageElement = document.createElement("img");
      imageElement.src = article.imageUrl;
      imageElement.alt = article.title;
      imageElement.dataset.categoryId = article.categoryId;
      const figCaptionElement = document.createElement("figcaption");
      figCaptionElement.innerText = article.title;
  
      // Create a figure element to contain the image and its caption
      const sectionFigure = document.createElement("figure");
      sectionFigure.appendChild(imageElement);
      sectionFigure.appendChild(figCaptionElement);
  
      gallery.appendChild(sectionFigure);
    });
  }
  

  async function fetchDataAndDisplayImages() {
    try {
      const data = await getApi();
      console.log(data); 
      generateImages(data, "galleryContainer");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  
  fetchDataAndDisplayImages();
  


// Filters 

function generateFilters() {
    const categories = [
        { name: "Tous", id: 0 },
        { name: "Objets", id: 1 },
        { name: "Appartement", id: 2 },
        { name: "Hôtels & restaurants", id: 3 }
    ];

    const portfolioSection = document.getElementById("filters");
    const filterContainer = document.createElement("div");
    filterContainer.classList.add("filter-container");

    categories.forEach(category => {
        const { name, id } = category;
        const filterButton = document.createElement("button");
        filterButton.textContent = name;
        filterButton.classList.add("filter-button");
        filterButton.dataset.categoryId = id.toString(); // Assigning category ID to data attribute
        filterButton.addEventListener("click", handleFilterClick);
        filterContainer.appendChild(filterButton);
    });

    portfolioSection.insertBefore(filterContainer, portfolioSection.firstChild);
}

function handleFilterClick(event) {
    const categoryId = event.target.dataset.categoryId;

    const allImages = document.querySelectorAll(".gallery img");
    allImages.forEach(image => {
        const imageCategory = image.dataset.categoryId;
        if (categoryId === "0" || imageCategory === categoryId) {
            image.parentElement.style.display = "block"; // Show the figure containing the image
        } else {
            image.parentElement.style.display = "none"; // Hide the figure containing the image
        }
    });
}

window.addEventListener("DOMContentLoaded", async function() {
    await fetchDataAndDisplayImages();
    generateFilters();
});


