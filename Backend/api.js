const URL_API = "http://localhost:5678/api/works";

export function fetchData(callback) {
    fetch(URL_API)
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(error => console.error('Erreur dans la récupération des données:', error));
}