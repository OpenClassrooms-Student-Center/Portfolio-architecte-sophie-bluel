async function getAllWorks() {
    let gallery = document.querySelector('.gallery')
    let response = await fetch(`http://localhost:5678/api/works`)
    console.log(response);
    let works = await response.json()
   
    console.log(gallery);
    works.forEach(work => {
        let figureTemplate = `<figure>
				<img src="${work.imageUrl}" alt="${work.title}">
				<figcaption>${work.title}</figcaption>
		</figure>
        `
        console.log(figureTemplate);
        gallery.innerHTML += figureTemplate 
        
    });
    console.log(gallery);
}

getAllWorks()
