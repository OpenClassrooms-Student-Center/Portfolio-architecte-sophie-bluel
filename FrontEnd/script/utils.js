"use strict"
// API documentation: SWAGGER UI http://localhost:5678/api-docs/#/
//API LINK
export const works_endpoint = "http://localhost:5678/api/works";
export const url_categories = "http://localhost:5678/api/categories";
export const url_deleteWork = "http://localhost:5678/api/works/";

// FrontEnd > script > utils.js

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

httpPost('http://site.com', {
    email: email,
    password: password
});

/**
 * Execute a HTTP request (POST) and return response data
 * @param string url
 * @param object body
 * @param object headers
 * @returns
 */
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
