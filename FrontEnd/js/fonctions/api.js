
/**
 * Connexion avec API
 * @param {*} url 
 * @param {*} options 
 * @returns 
 */
export async function fetchJSON(url, options = {}) {
    const headers = { Accept: 'application/json', ...options.headers }
    const r = await fetch(url, { ...options, headers })
    if (r.ok) {
        return r.json();
    }
    throw new Error('Erreur serveur', { cause: "Il y a un problème avec la connexion de API" });
};



