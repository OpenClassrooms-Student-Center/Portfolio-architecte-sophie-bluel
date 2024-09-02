export async function getCategories() {
    return await fetch('http://localhost:5678/api/categories')
        .then(response => response.json());
}

export async function getWorks() {
    return await fetch('http://localhost:5678/api/works')
        .then(response => response.json());
}
