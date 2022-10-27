import {API} from "../../backend"

export const signup = user => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
           Accept: "application/json",
           "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

// Sign in
export const signin = user => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
           Accept: "application/json",
           "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};


// checking whether the user is successfully signed in
export const authenticate = (data, next) => {

    // setting the JWT 
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data)) // JSON Web Token
        next();
    }

}

// Signout
export const signout = next => {

    // We are removing the jWT since user wants to signout
    if(typeof window !== "undefined") {
        localStorage.removeItem("jwt") // JSON Web Token
        next();

        return fetch(`${API}/signout`, {
            method: "GET",

        }).then(response => {
            console.log("Signout success!")
        })
        .catch(err => {
            console.log(err)
        });
    }
};

// 
export const isAuthenticated = () => {

    if(typeof window == "undefined") {
        return false
    }

    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false
    }

}