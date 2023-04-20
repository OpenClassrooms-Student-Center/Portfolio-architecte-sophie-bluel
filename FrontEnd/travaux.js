

const reponse = await fetch(`http://localhost:5678/api/works`);
const pieces = await reponse.json();

document.querySelector(".gallery").innerHTML = "";

for(let i = 0; i < pieces.length; i++){
const sectionFiches = document.querySelector(".gallery");
const piecesElement = document.createElement("figure");

const nomElement = document.createElement("p");
nomElement.innerText = pieces[i].title;
const imageElement = document.createElement("img");
imageElement.src = pieces[i].imageUrl;


sectionFiches.appendChild(piecesElement);
piecesElement.appendChild(imageElement);
piecesElement.appendChild(nomElement);
}