import { Table, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { usersApi } from '../../../axiosApi/axiosInstance';
import "./User_Hr_Manage.css"

const User_Manage = () => {
  const [allUsers, setAllUsers] = useState([]);

  const handleUserBlock = async (userId) => {
    try {
      // Send a request to the server to toggle the user's block status.
      const res = await usersApi.post(`admin/userBlock/${userId}`);
      if (res.data.isBlock !== undefined) {
        // Update the local state to reflect the change.
        setAllUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isBlock: !user.isBlock } : user
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await usersApi.get('admin/allUsers');
      setAllUsers(res.data);
    };
    fetchUser();
  }, [handleUserBlock]);

  return (
    <div>
      <h4 className='Userheading'>Users</h4>
      <div className='tableMainDiv'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0 ? (
              allUsers.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button className='blockUnblockbtn' onClick={() => handleUserBlock(user._id)}
                    style={{
                      backgroundColor: user.isBlock ? 'red' : 'green',
                      color: 'white', // You can adjust the text color
                    }}>
                      {user.isBlock ? 'Unblock' : 'Block'}
                    </Button>
                  </td>
                </tr>
              ))
            ) : null}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default User_Manage;
