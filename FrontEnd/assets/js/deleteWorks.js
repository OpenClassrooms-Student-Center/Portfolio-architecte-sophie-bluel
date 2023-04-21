export function deleteWorks() {
    const trashCan = document.querySelector(".deleteWork");
    trashCan.addEventListener("click", function (){
        const urlBase = "http://localhost:5678/api/works/"
        const figureDeleteId = document.querySelector(".miniGallery figure").id
        console.log(figureDeleteId)

    })
}