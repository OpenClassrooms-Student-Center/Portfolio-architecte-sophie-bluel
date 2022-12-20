async function fetchAllWorks() {
  const works = await fetch("http://localhost:5678/api/works")
    .then(function (res) {
      return res.json();
    })
    .then(function (works) {
      return works;
    });
  console.log(works);
}

const getWorks = fetchAllWorks();

console.log(getWorks);

getWorks().then((response) => {
  works = response.map((work) => createGallery(work));
});

function createGallery(work) {
  const dom_figure = document.createElement("figure");
  const dom_img = document.createElement("img");
  const dom_figcaption = document.createElement("figcaption");
}
