 let modal = null
 
 const openModale =  function(e)  {
    e.preventDefault()
    const target = document.querySelector("#modale1")
    target.style = "display:null";
    target.removeAttribute("aria-hidden");
    modal = target;
    modal.addEventListener("click", closeModale)
    modal.querySelector(".js-close-modale").addEventListener("click", closeModale)
 }


document.querySelectorAll(".js-modale").forEach(a=> {
    a.addEventListener('click', openModale)
});


const closeModale =  function(e)  {
    if (modal === null) return
    e.preventDefault()
    modal.style = "display:none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeEventListener("click", closeModale);
    modal.querySelector(".js-close-modale").removeEventListener("click", closeModale)
    modal = null
}
