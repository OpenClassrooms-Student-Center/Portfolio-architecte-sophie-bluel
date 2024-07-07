

//get one category
export const fetchCategories = async () =>{
    let response = await fetch(`http://localhost:5678/api/categories`)
    let data = await response.json()

    return data
}