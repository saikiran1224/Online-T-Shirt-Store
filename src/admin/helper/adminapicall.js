import { API } from "../../backend";

// Category Calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
        
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// get all Categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


// Product Calls

// Creating a Product
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => {
        return response.json()
    }).catch(err => console.json(err))
}

// Get A Product
export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.json(err))
}


// Get All Products
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// Update Product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => {
        return response.json()
    }).catch(err => console.json(err))
}

// Remove Product
export const removeProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.json(err))
}

