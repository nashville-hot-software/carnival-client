import {
    createAuthHeaders,
    baseUrl
} from './userManager';

let API = {

    getOne: (resource, id) => {
        const authHeader = createAuthHeaders()
        return fetch(`${baseUrl}/${resource}/${id}`, {
            method: "GET",
            // headers: authHeader
        }).then(data => data.json())
    },
    //https://localhost:5001/api/v1/Resource
    getAll: (resource) => {
        const authHeader = createAuthHeaders()
        return fetch(`${baseUrl}/${resource}`, {
            method: "GET",
            // headers: authHeader
        }).then(data => data.json())

    },
    
    getOneResourceWithChild: (resource, id, secondResource) => {
        
        const authHeader = createAuthHeaders()
        return fetch(`${baseUrl}/${resource}/${id}?includes=${secondResource}`, {
            method: "GET",
            // headers: authHeader
        }).then(data => data.json())
    },
    //an Expand
    //(https://localhost:5001/api/v1/resource/1?includes=secondResource)
    PostData(resource, newObj) {
        const authHeader = createAuthHeaders()
        return fetch(`${baseUrl}/${resource}`, {
            method: "POST",
            body: JSON.stringify(newObj),
            headers: {
                // ...authHeader,
                // Accept: 'application/json',
            },
        }).then(response => response.json())
    },

    deleteUserData(resource, Id) {
        const authHeader = createAuthHeaders()
        return fetch(`${baseUrl}/${resource}/${Id}`, {
            method: "DELETE",
            // headers: authHeader
        }).then(response => response.json())

    },
    update(editedObject, database) {
        const authHeader = createAuthHeaders()
        return fetch(`${baseUrl}/${database}/${editedObject.id}`, {
            method: "PUT",
            headers: {
                // ...authHeader,
                // Accept: 'application/json',
            },
            body: JSON.stringify(editedObject)
        }).then(data => data.json())
    }
}
export default API
