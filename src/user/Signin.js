import React, {useState} from "react"
import Base from "../core/Base"
import {Link, Redirect} from "react-router-dom"

import {signin, authenticate, isAuthenticated} from "../auth/helper"

const SignIn = () => {

    const [values, setValues] = useState({
        email: "a@gmail.com",
        password: "12345",
        error: "",
        loading: false,
        didRedirect: false // We need to redirect to Admin or User Dashboard
    })

    // destructuring
    const { email, password, error, loading, didRedirect} = values;
    const {user} = isAuthenticated();

    // handling the Change on Input fields - Higher Order Functions
    const handleInputChange = name => event => {

        // setting the values 
        // ...values means we are loading previous data
        setValues({...values, error: false, [name]: event.target.value})
    }

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };

    const errorMessage = () => {
    return (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-danger" style={{display: error ? "" :"none"}}>
                    {error} 
                </div>
            </div>
        </div>
    )
    }

    const onSubmit = event => {

        event.preventDefault();

        setValues({...values, error:false, loading: true})

        signin({email, password})
        .then(data => {
           
            if(data.error) {
                setValues({...values, error:true, loading: false})
            } else {
                // passing data to middleware
                authenticate(data, () => {
                    setValues({...values, didRedirect: true})
                })

            }
        })
        .catch(console.log("sign in request failed!"))
    }

    const performRedirect = () => {

        if(didRedirect) {
            if(user && user.role === 1) {
                return <Redirect to="/admin/dashboard"/>
            } else {
                return <Redirect to="/user/dashboard"/>
            }
        }

        if(isAuthenticated()) {
            return <Redirect to="/" />;
        }
    }
     
    const signInForm = () => {

        return (
            <div className="row">

                <div className="col-md-6 offset-sm-3 text-left">

                    <form>
 
                         <div className="form-group mt-3">
                            <label className="text-light">Email ID</label>
                            <input className="form-control" onChange={handleInputChange("email")} type="email" value={email}></input>
                         </div>

                         <div className="form-group mt-3">
                            <label className="text-light">Password</label>
                            <input className="form-control" onChange={handleInputChange("password")} type="password" value={password}></input>
                         </div>

                         <button className="btn btn-success btn-block form-control mt-4" onClick={onSubmit}>Submit</button>
                      

                    </form>
                    
                </div> 

            </div>
        )

    }


    return (
        <Base title="Sign in Page" description="A page for user to sign in!">
           
          {loadingMessage()}
          {errorMessage()}
          {signInForm()}
          {performRedirect()}
          <p className="text-white text-center">{JSON.stringify(values)}</p>
 
        
        </Base>
    )
}

export default SignIn;
