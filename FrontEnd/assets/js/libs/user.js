

export const login = async (email,password) =>{
    let response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,password}),
    })

    let data = await response.json()

    return data
}

