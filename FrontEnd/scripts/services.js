const getWorks = async () => {
    try {
        const response = await fetch('http://localhost:5678/api/works')
        const works = await response.json()
        return works
    } catch (error) {
        return []
    }
}

const login = async () => {
    try {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const emailErrorDiv = document.querySelector('.login-form__error--email')
        const passwordErrorDiv = document.querySelector('.login-form__error--password')
        emailErrorDiv.textContent = ''
        passwordErrorDiv.textContent = ''

        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        const data = await response.json()

        if (response.ok) {
            sessionStorage.setItem('authToken', data.token)
            sessionStorage.setItem('authUser', data.userId)
            window.location.replace('../index.html')
            // sophie.bluel@test.tld
        } else if (response.status === 401) {
            passwordErrorDiv.textContent = 'Mot de passe incorrect.'
        } else if (response.status === 404) {
            emailErrorDiv.textContent = 'Adresse email est introuvable.'
        } else {
            throw new Error("Une erreur s'est produite lors de la connexion.")
        }
    } catch (error) {
        console.error(error)
    }
}

const deleteWork = async (imageId) => {
    const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
    })
    if (response.status === 204) {
        works = [...works.filter((work) => work.id !== imageId)]
        createGallery(works)
        createGalleryPage()
        createCategories()
        createCategoriesButtons(categories, works)
        alert('Travail supprimé avec success!! ✅')
    } else if (response.status === 401) {
        alert(`Vous n'êtes pas autorisé à supprimer! ❌`)
    } else {
        alert(`Erreur lors de la suppression ❌`)
    }
}

const uploadWork = async (formData) => {
    const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
    })
    if (response.status === 201) {
        const work = await response.json()
        let category = { id: parseInt(work.categoryId) }
        if (work.categoryId === '1') category.name = 'Objets'
        if (work.categoryId === '2') category.name = 'Appartements'
        if (work.categoryId === '3') category.name = 'Hôtels & restaurants'
        work.category = category
        works.push(work)
        createGallery(works)
        createGalleryPage()
        createCategories()
        createCategoriesButtons(categories, works)
        createUploadPage()
        alert('Travail ajouté avec success!! ✅')
    } else if (response.status === 400) {
        alert(`Erreur lors de l'ajout ❌`)
    } else if (response.status === 401) {
        alert(`Vous n'avez pas les droits pour ajouter une photo ❌`)
    } else {
        alert(`Erreur lors de l'ajout❌`)
    }
}
