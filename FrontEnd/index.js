async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works");
    const data = await reponse.json();

    for(let work of data) {
        document.querySelector(".gallery").innerHTML += `<figure>
                                                        <img src=${work.imageUrl} alt="" crossorigin="anonymous">
                                                        <figcaption>${work.title}</figcaption>
                                                        </figure>`
    }
}
getWorks();


async function getCategories() {
    const reponse =await fetch("http://localhost:5678/api/categories");
    const data = await reponse.json();
    for(let categorie of data){
            document.querySelector(".filtres").innerHTML += `<button class="categories-btn" data-id="${categorie.id}">${categorie.name}</button>`
            }
            const filterButton = document.querySelector(".filtres");
            filterButton.addEventListener("click",function () {
                console.log("hello");
                document.querySelector(".gallery").innerHTML ="";
                getWorks();
            });
}
getCategories();

