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

/**
 * HTTP POST with FormData (for uploading images)
 * 
 * @param {String} endpoint - The endpoint URL to send the POST request to
 * @param {FormData} formData - The form data containing the image, title, and category
 * @param {String} authToken - The authentication token (if needed)
 * @returns {Object} - Returns the JSON response from the API if successful, or false if the request failed
 */
export async function httpPostFormData(endpoint, formData, authToken) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                // No 'Content-Type' header, it will be set automatically by the browser
            },
            body: formData
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