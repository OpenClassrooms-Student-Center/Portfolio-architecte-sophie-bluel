/**
 * 
 * @param {string} path 
 * @param {"GET"|"POST"|"PUT"|"DELETE"} method 
 * @param {*} body 
 */
async function fetchJSON(path, method = 'GET', body = null) {
    const response = await fetch(`http://localhost:5678/api${path}`, {
        method,
        body,
        headers: {"Content-Type": "application/json"},
    });

    return await response.json();
}

export default { fetchJSON }