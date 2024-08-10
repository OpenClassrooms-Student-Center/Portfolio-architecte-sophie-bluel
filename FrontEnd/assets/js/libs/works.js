
// fetch one work, returns tab of works
export const fetchWork = async () => {
    let response = await fetch(`http://localhost:5678/api/works`)
    let data = await response.json()

    console.log(data)
    return data

}

//create one work
export const createWork = async (image, title, category) => {
    //création une instance formData et on crée des données manipulables
    const formData = new FormData();
    formData.append('title', title)
    formData.append('image', image)
    formData.append('category', category)

    const token = localStorage.getItem('token')
    let response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': 'Berear ' + token,
        },
        body: formData
    })

    let data = await response.json()

    return data
}

// delete one work
export const deleteWork = async (_id) => {
    const token = localStorage.getItem('token')
    let response = await fetch(`http://localhost:5678/api/works/${_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Berear ' + token,
        },
    })

    let data = await response.json()

    return data
}