import React, { useState,useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { Table, Button, Form } from 'react-bootstrap';
import './Category.css'
import { usersApi } from '../../../axiosApi/axiosInstance';
import { toast } from 'react-toastify';

const Category = () => {
  const [added, setAdded] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [newCategory, setNewCategory] = useState('')

const [allCategories, setAllCategories] = useState([])

  const addCategory =async () => {
    
    try {

      let res = await usersApi.post('admin/adminCategory', { categoryName: newCategory })
      console.log(res)
      if (res.data.message) {
        toast.success("Successfully added")
      }
        setNewCategory('')
        setShowModal(false)
        setAdded(true)

    } catch (error) {
      
      return toast.error(error.response.data.message)
      

    }
  }


// delete

const deleteCategory =async(categoryId)=>{

  try {
    const res = await usersApi.delete(`/admin/adminCategory/${categoryId}`)
    if(res.data.message){
      toast.success('Category Successfully Deleted')
      setAdded(true)
    }

  } catch (error) {
    toast.error("Error Occured")
  }
  
}

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
      <h1 className='cat-heading p-3 text-white'>Categories</h1>
      <div className=' px-5'>
      <button className='categotyButton rounded-pill px-3'  onClick={() => setShowModal(true)}>Add Category</button>
      </div>
      <div className='p-5'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category</th>
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
