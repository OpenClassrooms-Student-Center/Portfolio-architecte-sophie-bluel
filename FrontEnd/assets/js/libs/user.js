
//requêtte API pour connexion + enregistrement du token
export const login = async (email, password) => {
    let response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
        let data = await response.json()

        localStorage.setItem("token", data.token)
    }
    return response.ok
}

//suppression du token pour déconnexion
export const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "index.html"
} 
