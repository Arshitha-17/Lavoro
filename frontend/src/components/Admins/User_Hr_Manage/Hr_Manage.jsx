import { Container, Row, Col } from 'react-bootstrap';
import HrProfileImage from '/home/arshithak/Desktop/Brocamp/Week 22/Lavoro/lavoro/frontend/public/Untitled.jpeg'; // Replace with the actual image path
import { AiOutlineUser, AiOutlineMessage, AiOutlineUnorderedList, } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdLogout, MdWorkOutline } from 'react-icons/md'
import { NavLink } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { usersApi } from '../../../axiosApi/axiosInstance';
import "./User_Hr_Manage.css"

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
  }, [handleHrBlock]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col className="sidebar m-4">

            <div className='sidebar-Content'>
              <div className="HrProfileImage">
                <img src={HrProfileImage} alt="User Profile" className="hr-profile-image" />
                <h2>Name</h2>
              </div>
              <div className='sidebar-headings'>

                <div className='heads'>
                  <div><AiOutlineMessage /> </div>
                  <NavLink to="/admin/hr_manage" className='head'>Hr Details</NavLink>
                </div>
                <div className='heads'>
                  <div><MdWorkOutline /> </div>
                  <NavLink to="/admin/user_manage" className='head'>User Details</NavLink>
                </div>
                <div className='heads'>
                  <div><AiOutlineUnorderedList /></div>
                  <NavLink to="/admin/JobList" className='head'>List Job</NavLink>
                </div>
                <div className='heads'>
                  <div><IoMdNotificationsOutline /></div>
                  <NavLink to="/admin/applications" className='head'>Applications</NavLink>
                </div>
                <div className='heads'>
                  <div><MdLogout /></div>
                  <NavLink to="/admin/logout" className='head'>Logout</NavLink>
                </div>

              </div>
            </div>
          </Col>
          <Col sm={9} className="content">
            <h4 className='Userheading'>Hr details</h4>
            <div className='tableMainDiv'>
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
                          <Button className='blockUnblockbtn' onClick={() => handleHrBlock(hr._id)}
                            style={{
                              backgroundColor: hr.isBlock ? 'red' : 'green',
                              color: 'white', // You can adjust the text color
                            }}>

                            {hr.isBlock ? 'Unblock' : 'Block'}
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : null}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hr_Manage;
