
import {
    fetchCategories
} from '../libs/categories.js'

import {
    createWork,
    fetchWorks,
    deleteWork
} from '../libs/works.js'


let works = await fetchWorks()
console.log(works)

// initializing container
let gallery = document.querySelector(".gallery")

function displayWorks() {
    if(works) {
        for (let i = 0; i < works.length; i++) {
        //creation of elements of DOM for gallery
        const work = works[i]
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const figcaption = document.createElement("figcaption")
    
        //adding content in DOM elements
        img.src = work.imageUrl
        img.alt = work.title
        figcaption.textContent = work.title
    
        //replacing elements in DOM
        figure.appendChild(img)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
    }
    console.log("Travaux récupérés avec succès")
    console.log(works)

    }
}
displayWorks()
console.log(works)

