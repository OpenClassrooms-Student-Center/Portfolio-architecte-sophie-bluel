    const reponseWorks = await fetch("http://localhost:5678/api/works");
    const  works = await reponseWorks.json();
    export {works};

    const reponseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await reponseCategories.json();
    export {categories};