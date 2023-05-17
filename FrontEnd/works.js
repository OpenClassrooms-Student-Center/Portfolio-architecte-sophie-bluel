// async function myFunction(){
//     console.log("Hello!");

//     const logInput = {
//         email: "sophie.bluel@test.tld",
//         password: "S0phie"
//     };
    
//     const chargeUtile = JSON.stringify(logInput);
//     const response = await fetch("http://localhost:5678/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: chargeUtile
//     });
//     const valeursLogin = await response.json();
//     console.log(valeursLogin);
//     const token = valeursLogin.token
//     console.log(token);
// };

// const login = document.querySelector(".login");
// login.addEventListener('click', myFunction);



let works = window.localStorage.getItem("works");
if (works == null){
    const worksResponse = await fetch('http://localhost:5678/api/works');
    works = await worksResponse.json();
    window.localStorage.setItem("works", JSON.stringify(works));
 }else{
    works = JSON.parse(works);
}


function createProjectContent() {
    for (let i in works) {

        const gallery = document.querySelector(".gallery");


        const work = document.createElement("figure");
        const workImage = document.createElement("img")
        const workTitle = document.createElement("figcaption");

        workImage.src = works[i].imageUrl;
        workTitle.textContent = works[i].title;

        gallery.appendChild(work);
        work.appendChild(workImage);
        work.appendChild(workTitle);

    }
};

createProjectContent();
console.log(works);