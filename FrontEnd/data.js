const categorie = await fetch ('http://localhost:5678/api/categories').then(categorie => categorie.json());
const work = await fetch ('http://localhost:5678/api/works').then(work => work.json());
export {categorie, work};