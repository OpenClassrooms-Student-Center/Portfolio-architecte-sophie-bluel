"use strict";
/**
 * HTTP DELETE
 * 
 * @param {String} endpoint - The endpoint URL to send the DELETE request to
 * @param {String} id - The ID of the item to delete
 * @param {String} authToken - The authentication token (if needed)
 * @returns {Boolean} - Returns true if the deletion was successful, false otherwise
 */
export async function httpDelete(endpoint, id, authToken) {
    try {
        const response = await fetch(`${endpoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete the item');
        }

        return true; // Return true on successful deletion
    } catch (error) {
        console.error(error);
        return false; // Return false on failure
    }
}
/**
 * HTTP POST
 * 
 * @param {String} endpoint - The endpoint URL to send the POST request to
 * @param {Object} data - The data to be sent in the body of the POST request
 * @param {String} authToken - The authentication token (if needed)
 * @returns {Object} - Returns the JSON response from the API if successful, or false if the request failed
 */
export async function httpPost(endpoint, data, authToken) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to send the POST request');
        }

        const responseData = await response.json();
        return responseData; // Return the JSON response from the API
    } catch (error) {
        console.error(error);
        return false; // Return false on failure
    }
}


/*
"use strict"
// API documentation: SWAGGER UI http://localhost:5678/api-docs/#/
const base = "http://localhost:5678/api/"

export const url_categories = "http://localhost:5678/api/categories";
export const url_deleteWork = "http://localhost:5678/api/works/";


httpPost('http://site.com', {
    email: email,
    password: password
});
*/
/**
 * Execute a HTTP request (POST) and return response data
 * @param string url
 * @param object body
 * @param object headers
 * @returns
 */
/*
async function httpPost(url, body = {}, headers = {}) {
    try {
        if (typeof body != 'object') {
            throw new Error('xxx');
        }

        headers = Object.assign({
            'Content-Type': 'application/json'
        }, headers);

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        const data = await response.json();
        return data;
    } catch (e) {
        console.warn(e);
        return false;
    }
}
*/
