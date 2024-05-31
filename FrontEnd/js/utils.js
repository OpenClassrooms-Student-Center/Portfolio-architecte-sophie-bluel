//Function to call fetch
/**
 *
 * @param {string} path
 * @param {"GET"|"POST"|"PUT"|"DELETE"} method
 * @param {*} body
 */
async function fetchJSON(path, method = 'GET', body = null) {
    const token = getToken();
    const headers = { 'Content-Type': 'application/json' };

    if (token) {
        headers['authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`http://localhost:5678/api${path}`, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        return { error: true, status: response.status };
    }
    return data;
}

function getToken() {
    return localStorage.getItem('loginToken');
}

export default { fetchJSON, getToken };
