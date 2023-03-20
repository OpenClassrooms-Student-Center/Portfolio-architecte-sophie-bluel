const apiUrl = 'http://localhost:5678/api'

async function getWorks() {
    const response = await fetch(`${apiUrl}/works`)
    const data = await response.json()
    return data
}

async function addWork(work) {
    const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        body: work,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
    })
    return response
}

async function deleteWork(workId) {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
    })
    return response
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
