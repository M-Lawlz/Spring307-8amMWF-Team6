import React, { useState } from 'react'
import App from "firebase/app";
import "firebase/auth";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import Form from "react-bootstrap/Form";



const AddTourForm = props => {
  const initialFormState = { id: null, name: '', username: '' }
  const [user, setUser] = useState(initialFormState)

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }


  return (
    <form
    >
      <label>Tour Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <label>Username</label>
      <input type="text" name="username" value={user.username} onChange={handleInputChange} />
      <button>Add new Tour</button>
      <label>
      Description:
      <textarea value />
      </label>
    </form>
  )
}

export default AddTourForm