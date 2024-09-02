export async function getCategories() {
    const categories = await fetch('http://localhost:5678/api/categories').then(categories => categories.json());
    return categories;
}

export async function getWorks() {
    const works = await fetch('http://localhost:5678/api/works').then(works => works.json());
    return works;
}

