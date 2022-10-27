import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from './core/Home'
import SignUp from './user/Signup'
import SignIn from './user/Signin'
import UserDashboard from './user/UserDashBoard'
import AdminDashboard from './user/AdminDashBoard'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import AddCategory from './admin/AddCategory'
import ManageCategories from './admin/ManageCategories'
import AddProduct from './admin/AddProduct'

const Routes = () => {
  return (
     <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/signin" exact component={SignIn} />


            <PrivateRoute path="/user/dashboard" exact component={UserDashboard}/>



            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>

            <AdminRoute path="/admin/create/category" exact component={AddCategory} />
            <AdminRoute path="/admin/categories" exact component={ManageCategories} />

            <AdminRoute path="/admin/create/product" exact component={AddProduct} />


             
        </Switch>
     </BrowserRouter>
  )
}

export default Routes;


