import { Table, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { usersApi } from '../../../axiosApi/axiosInstance';

const Hr_Manage = () => {
  const [allHr, setAllHr] = useState([]);

  const fetchHrData = async () => {
    try {
      const res = await usersApi.get('admin/allHr');
      setAllHr(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleHrBlock = async (hrId) => {
    try {
      const res = await usersApi.post(`admin/HrBlock/${hrId}`);
      if (res.data.isBlock !== undefined) {
        // Update the local state to reflect the change.
        setAllHr((prevHr) =>
          prevHr.map((hr) =>
            hr._id === hrId ? { ...hr, isBlock: res.data.isBlock } : hr
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHrData();
  }, []);

  return (
    <div>
      <h4>Hr details</h4>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Hr Name</th>
              <th>Hr Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allHr.length > 0 ? (
              allHr.map((hr, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{hr.name}</td>
                  <td>{hr.email}</td>
                  <td>
                    <Button onClick={() => handleHrBlock(hr._id)}>
                      {hr.isBlock ? 'Unblock' : 'Block'}
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

export default Hr_Manage;
