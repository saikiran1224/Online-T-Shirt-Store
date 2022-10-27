import React, {useState} from "react"
import Base from "../core/Base"
import {Link} from "react-router-dom"
import { signup } from "../auth/helper";

const SignUp = () => {

    // using state and setting some temporary
    const [ values, setValues ] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    // getting paramters from values
    const { name, email, password, error, success } = values


    // handling the Change on Input fields - Higher Order Functions
    const handleInputChange = name => event => {

         // setting the values 
         // ...values means we are loading previous data
         setValues({...values, error: false, [name]: event.target.value})
    }

    // called when user clicks on Button
    const onSubmit = event => {

        // preventing the deafult action of form
        event.preventDefault()
        // setting the error as false
        setValues({...values, error: false})

        // calling the signup method from "Helper" class to perform backend operation
        signup({name, email, password})
            .then(data => {
                // If we get an error from signup method
                if(data.error) {
                    // setting the error
                    setValues({...values, error: data.error, success: false})
                } else {
                    // We are emptying all the fields and making success true
                    setValues({...values, name: "", email: "", password: "", error: "", success: true})
                }
            })
            .catch(console.log("Error in Sign up!"))
    }


    const signUpForm = () => {

        return (
            <div className="row">

                <div className="col-md-6 offset-sm-3 text-left">

                    <form>
 
                         <div className="form-group">
                            <label className="text-light">Name</label>
                            <input  className="form-control" 
                                    type="text" 
                                    onChange={handleInputChange("name")}
                                    value={name}></input>
                         </div>

                         <div className="form-group mt-3">
                            <label className="text-light">Email ID</label>
                            <input className="form-control" 
                                   type="email"
                                   onChange={handleInputChange("email")}
                                   value={email}  ></input>
                         </div>

                         <div className="form-group mt-3">
                            <label className="text-light">Password</label>
                            <input className="form-control" 
                                   type="password"
                                   onChange={handleInputChange("password")}
                                   value={password} ></input>
                         </div>

                         <button 
                                className="btn btn-success btn-block form-control mt-4"
                                onClick={onSubmit}  
                            >Submit</button>
                      

                    </form>
                    
                </div> 

            </div>
        )

    }


    const successMessage = () => {
        return (
        
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: success ? "" :"none"}}>
                        New Account was created successfully! Please <Link to="/signin">Login here</Link>
                    </div>
                </div>
            </div>
        )
    }

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

    return (
        <Base title="Sign up Page" description="A page for user to sign up!">
           
           {successMessage()}
           {errorMessage()}

           {signUpForm()}

           <p className="text-white text-center">{JSON.stringify(values)}</p>
        
        </Base>
    )
}

export default SignUp;
