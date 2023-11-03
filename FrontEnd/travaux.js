

await fetch(`http://localhost:5678/api/works`)
.then(reponse => reponse.json())
.then(pieces => {
    document.querySelector(".gallery").innerHTML = "";
    
    function genererPieces(pieces){
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
        }
        
        genererPieces(pieces)

        const buttonAll = document.querySelector(".button__all");

        buttonAll.addEventListener("click", function() {
            const piecesFiltreesAll = pieces.filter(function(pieces) {
                return pieces;
            });
            document.querySelector(".gallery").innerHTML = "";
            genererPieces(piecesFiltreesAll);
        });
        
        const buttonObject = document.querySelector(".button__objet");
        
        buttonObject.addEventListener("click", function() {
            const piecesFiltreesObject = pieces.filter(function(piece) {
                return piece.categoryId === 1;
            });
            document.querySelector(".gallery").innerHTML = "";
            genererPieces(piecesFiltreesObject);
        });
        
        const buttonFlat = document.querySelector(".button__flat");
        
        buttonFlat.addEventListener("click", function() {
            const piecesFiltreesFlat = pieces.filter(function(piece) {
                return piece.categoryId === 2;
            });
            document.querySelector(".gallery").innerHTML = "";
            genererPieces(piecesFiltreesFlat);
        });
        
        const buttonHostel = document.querySelector(".button__hostel");
        
        buttonHostel.addEventListener("click", function() {
            const piecesFiltreesHostel = pieces.filter(function(piece) {
                return piece.categoryId === 3;
            });
            document.querySelector(".gallery").innerHTML = "";
            genererPieces(piecesFiltreesHostel);
        });

})


