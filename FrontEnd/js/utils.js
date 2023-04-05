async function getWorks() {        // fonction utilisé dans plusieurs script permettant de récupérer un travail via l'api //
    const res = await fetch("http://localhost:5678/api/works");
    const data = await res.json();
    return data;
}
