import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';


const AddCategory = () => {

  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  // destructuring
  const { user, token } = isAuthenticated()

  // creating a form
  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead mt-3">Enter the Category</p>
        <input type="text" className="form-control my-3" 
        autoFocus required placeholder='For Example Summer, etc.' 
        onChange={handleChange}
        value={name} />
        <button onClick={onSubmit} className="btn btn-outline-info mb-3">Create Category</button>
      </div>
    </form>
  )

  const goBack = () => (
    <div className="mt-5">
      <Link className='btn btn-sm btn-success mb-3' to="/admin/dashboard">Admin Home</Link>
    </div>
  )

  const handleChange = event => {
    setError("")
    setName(event.target.value)
  }

  const onSubmit = event => {
    event.preventDefault()
    setError("")
    setSuccess(false)

    // sending request to Backend
    // passing category as object
    createCategory(user._id, token, {name})
    .then(data => {
      if (data.error) {
        setError(true)
      } else {
        setError("")
        setSuccess(true)
        setName("")
      }
    })
  }

  const successMessage = () => {
      if(success) {
        return <h4 className='text-success'>Category created Sucessfully!</h4>
      }
  }

  const errorMessage = () => {
      if(error) {
        return <h4 className="text-danger">Failed to create category</h4>
      }
  }

  return (
    <Base title='Create a Category here' description='Add a new Category for new Tshirts' className='container bg-info p-4'>
      
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()} 
          {goBack()}
        </div>
      </div>
      
    </Base>
  )
}

export default AddCategory;
