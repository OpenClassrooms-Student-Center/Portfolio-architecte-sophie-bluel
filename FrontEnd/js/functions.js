function isAuthenticated() {
    if (localStorage.getItem("token")) {
        return true
    }
    return false
}

function closeModal() {
    overlay.classList.remove('opened')
    fermetureModale.open = false
}