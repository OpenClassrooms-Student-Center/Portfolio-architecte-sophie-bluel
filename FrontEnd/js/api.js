const apiUrl = 'http://localhost:5678/api'

async function getWorks() {
    const response = await fetch(`${apiUrl}/works`)
    const data = await response.json()
    return data
}

async function addWork(work) {
    const response = await fetch(`${apiUrl}/works`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(work),
    })
    const data = await response.json()
    return data
}

async function deleteWork(id) {
    const response = await fetch(`${apiUrl}/works/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
    })
    const data = await response.json()
    return data
}

async function login(email, password) {
    const response = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
    return response
}

// const login = async () => {
//     try {
//         const email = document.getElementById('email').value
//         const password = document.getElementById('password').value
//         const emailErrorDiv = document.querySelector('.login-form__error--email')
//         const passwordErrorDiv = document.querySelector('.login-form__error--password')
//         emailErrorDiv.textContent = ''
//         passwordErrorDiv.textContent = ''

//         const response = await fetch('http://localhost:5678/api/users/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email: email,
//                 password: password,
//             }),
//         })
//         const data = await response.json()

//         if (response.ok) {
//             sessionStorage.setItem('authToken', data.token)
//             sessionStorage.setItem('authUser', data.userId)
//             window.location.replace('../index.html')
//             // sophie.bluel@test.tld
//         } else if (response.status === 401) {
//             passwordErrorDiv.textContent = 'Mot de passe incorrect.'
//         } else if (response.status === 404) {
//             emailErrorDiv.textContent = 'Adresse email est introuvable.'
//         } else {
//             throw new Error("Une erreur s'est produite lors de la connexion.")
//         }
//     } catch (error) {
//         console.error(error)
//     }
// }

export { getWorks, addWork, deleteWork, login }
