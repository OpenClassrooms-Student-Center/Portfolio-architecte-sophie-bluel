"use strict"
// API documentation: SWAGGER UI http://localhost:5678/api-docs/#/
//API ADDRESS
const base = "http://localhost:5678/api/"

/**
 * Make a HTTP GET Request and return an array
 * 
 * @param String url 
 * @returns Array
 */
async function httpGet(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

//GET WORKS
const works_endpoint = `${base}works`;
let works = [];

async function getWorks() {
    console.log(works);

    works = await httpGet(works_endpoint);
    console.log(works);

    works = works.slice(1, 5);

    works.push({ hello: "There" });
}



export const works_endpoint = "http://localhost:5678/api/works";
export const url_categories = "http://localhost:5678/api/categories";
export const url_deleteWork = "http://localhost:5678/api/works/";

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
