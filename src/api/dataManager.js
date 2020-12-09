import { baseUrl } from './userManager';

let API = {

    getOne: (resource, id) => {
        return fetch(`${baseUrl}/${resource}/${id}`, {
            method: "GET",
        }).then(data => data.json())
    },
    //(http://127.0.0.1:8000/resource/?limit=20)
    //https://localhost:5001/api/v1/Resource
    getAll: (resource, queryParam, value) => {
        return fetch(`${baseUrl}/${resource}?${queryParam}=${value}`, {
            method: "GET",
        }).then(data => data.json())

    },
    
    getOneResourceWithChild: (resource, id, secondResource) => {
        
        return fetch(`${baseUrl}/${resource}/${id}?includes=${secondResource}`, {
            method: "GET",
        }).then(data => data.json())
    },
    PostData:(resource, newObj) => {
        return fetch(`${baseUrl}/${resource}`, {
            method: "POST",
            body: JSON.stringify(newObj),
            headers: {
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
        return fetch(`${baseUrl}/${resource}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedObject)
        })
    }
}
export default API
