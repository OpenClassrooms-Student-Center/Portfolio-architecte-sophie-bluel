// sophie.bluel@test.tld

const loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')
    const emailError = document.querySelector('.login-form__error--email')
    const passwordError = document.querySelector('.login-form__error--password')
    const submitError = document.querySelector('.login-form__error--submit')

    emailError.textContent = ''
    passwordError.textContent = ''
    submitError.textContent = ''

    if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = 'Veuillez entrer une adresse email valide.'
        return
    }
    if (!isValidPassword(passwordInput.value)) {
        passwordError.textContent = 'Le mot de passe doit contenir au moins 5 caractères.'
        return
    }
    try {
        const response = await login(emailInput.value, passwordInput.value)
        if (response.ok) {
            const { token, userId } = await response.json()
            sessionStorage.setItem('authToken', token)
            sessionStorage.setItem('authUser', userId)
            window.location.replace('../index.html')
        } else if (response.status === 401) {
            passwordError.textContent = `Le mot de passe que vous avez saisi est incorrect.`
        } else if (response.status === 404) {
            emailError.textContent = `L'adresse email que vous avez saisie est introuvable.`
        } else {
            submitError.textContent = `Une erreur est survenue lors de la tentative de connexion.`
        }
    } catch (error) {
        showNotification(error, 'negative')
    }
})

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

function isValidPassword(password) {
    return password.length >= 5
}
