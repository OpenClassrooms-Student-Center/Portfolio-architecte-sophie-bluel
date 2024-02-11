
// CALL GET API ALL WORKS 

const getApi = async () => {
    try {
      const response = await fetch("http://localhost:5678/api/works");
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error to be caught by the calling function
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
      const figCaptionElement = document.createElement("figcaption");
      figCaptionElement.innerText = article.title;
  
      // Create a figure element to contain the image and its caption
      const sectionFigure = document.createElement("figure");
      sectionFigure.appendChild(imageElement);
      sectionFigure.appendChild(figCaptionElement);
  
      // Append the figure element to the gallery container
      gallery.appendChild(sectionFigure);
    });
  }
  

  async function fetchDataAndDisplayImages() {
    try {
      const data = await getApi();
      console.log(data); // Log the data fetched from the API
      // Call your function to generate images
      generateImages(data, "galleryContainer");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  // Call the fetchDataAndDisplayImages function to initiate fetching and displaying images
  fetchDataAndDisplayImages();
  


