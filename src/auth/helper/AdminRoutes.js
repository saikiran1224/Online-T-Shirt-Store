import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated} from "./index"

const AdminRoute = ({ component: Component, ...rest }) => {

   // let auth = useAuth();
    return (
      <Route
        {...rest}
        render={props => // checking whether he is Admin or not
          isAuthenticated() && isAuthenticated().user.role === 1 ? // If its true, load the component (Terenary Operator)
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

export default AdminRoute;