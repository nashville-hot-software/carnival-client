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
    //(http://127.0.0.1:8000/resource/?limit=20)
    //https://localhost:5001/api/v1/Resource
    getAll: (resource, queryParam, value) => {
        const authHeader = createAuthHeaders()
        return fetch(`${baseUrl}/${resource}?${queryParam}=${value}`, {
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
    PostData:(resource, newObj) => {
        const authHeader = createAuthHeaders()
        return fetch(`${baseUrl}/${resource}`, {
            method: "POST",
            body: JSON.stringify(newObj),
            headers: {
                // ...authHeader,
                "Content-Type": "application/json"
            },
        })
    },

    deleteUserData:(resource, Id) => {
        return fetch(`${baseUrl}/${resource}/${Id}`, {
            method: "DELETE",
        })
    },
    update:(resource, editedObject, id) => {
        const authHeader = createAuthHeaders()
        return fetch(`${baseUrl}/${resource}/${id}`, {
            method: "PUT",
            headers: {
                // ...authHeader,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedObject)
        })
    }
}
export default API
