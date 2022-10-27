import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated} from "./index"

const PrivateRoute = ({ component: Component, ...rest }) => {

   // let auth = useAuth();
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() ? // If its true, load the component (Terenary Operator)
          (
            <Component {...props}/>
          ) : ( 
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute;