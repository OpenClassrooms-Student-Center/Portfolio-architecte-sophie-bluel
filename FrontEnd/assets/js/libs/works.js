
// fetch one work, returns tab of works
export const fetchWorks = async () =>{
    let response = await fetch(`http://localhost:5678/api/works`)
    let data = await response.json()
    
    console.log(data)
    return data
    
}

//create one work
export const createWork = async (image, title, category) =>{
    let response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({image, title, category}),
    })

    let data = await response.json()

    return data
}

// delete one work
export const deleteWork = async (_id) =>{
    let response = await fetch(`http://localhost:5678/api/works/${_id}`, {
        method: 'DELETE',
    })

    let data = await response.json()

    return data
}