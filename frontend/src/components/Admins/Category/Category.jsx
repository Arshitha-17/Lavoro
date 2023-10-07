import React, { useState,useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { Table, Button, Form } from 'react-bootstrap';

import { usersApi } from '../../../axiosApi/axiosInstance';
import { toast } from 'react-toastify';

const Category = () => {
  const [added, setAdded] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [newCategory, setNewCategory] = useState('')

const [allCategories, setAllCategories] = useState([])

  const addCategory = () => {
    
    try {

      const res = usersApi.post('admin/adminCategory', { categoryName: newCategory })
      console.log(res)
      if (res.status==201) {
        setNewCategory('')
        setShowModal(false)
        setAdded(true)
        toast.success("Successfully added")
      }


    } catch (error) {
      if (res.status === 400) {
        return toast.error(error.response.data.message)
      }

    }
  }


// delete

// const deleteCategory =()=>{
//   const 
// }

// get method
useEffect(()=>{
  const fetchCategories= async()=>{
    const res=await usersApi.get('/admin/adminCategory')
    if(res.data){
      console.log(res.data);
      setAllCategories(res.data)
      setAdded(false)
    }
  }
  fetchCategories()
  
},[added])

  return (
    <div>
      <h1>Categories</h1>
      <div className='px-3'>
      <button  onClick={() => setShowModal(true)}>Add Category</button>
      </div>
      <div className='p-3'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Categoty</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allCategories.map((category, index) => (
            <tr key={index}>
              <td>{category.categoryName}</td>
              <td><button variant='Warning' >Edit</button></td>
              <td><button variant='danger' onClick={()=>deleteCategory(category._id)} >Delete</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      {/* Modal for adding a new category */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={addCategory}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Category;
