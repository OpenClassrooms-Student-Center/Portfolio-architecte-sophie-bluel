async function getWorks () {
    const reponse = await fetch("http://localhost:5678/api/works");
    const data = await reponse.json();

    for(let work of data) {
        document.querySelector(".gallery").innerHTML += `<figure>
                                                        <img src=${work.imageUrl} alt="Hotel First Arte - New Delhi" crossorigin="anonymous">
                                                        <figcaption>${work.title}</figcaption>
                                                        </figure>`
    }
}
getWorks ();

