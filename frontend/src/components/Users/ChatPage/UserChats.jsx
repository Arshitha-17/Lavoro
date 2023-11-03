import React, { useEffect, useState } from 'react'
import "./UserChats.css"
import { useNavigate } from 'react-router-dom'
import { usersApi } from '../../../axiosApi/axiosInstance'
const UserChats = () => {

  const [rooms, setRooms] = useState([])
const [roomid ,setRoomId]  = useState('')


  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const navigate = useNavigate()


  useEffect(() => {
    if (userInfo._id) {
      let fetchRooms = async () => {
        let res = await usersApi.get(`/users/getRooms/${userInfo._id}`)
        setRooms(res.data.rooms)
        console.log(res.data.rooms);
      }
      fetchRooms()
    }
  }, [])

  useEffect(()=>{
    console.log(roomid);
    let fetchMessages = async()=>{
      let res = await usersApi.get(`/users/get-room-messages/${roomid}`)
      console.log(res.data);
      if(res){
        setRoomId(res.data)
      }
    }
    fetchMessages()
  },[roomid])



  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  })


  return (
    <div>
      <div className='chatMainDiv'>
        <div className='d-flex'>

          <div className='userListDiv'>
            {rooms.length > 0 ? (
              rooms.map((chat, index) => (
                <div className='chatSubDiv m-3' key={index} onClick={ ()=> setRoomId(chat._id)} >
                  <h5>{chat.hr.name} </h5>
                </div>
              ))
            ) : (
              <div className='flex h-full justify-center items-center'>
                <p className='text-blue-600 font-bold'>No Chats</p>
              </div>
            )}
          </div>
          <div className='chatDiv'>
            <div className='nameDiv'> <h4>Arshitha</h4> </div>
            <div className='chatContainer'>
              <div className='messageContainerRight my-2'>
                <div className='messageRight'>
                  <h6 >Niraj Mannabudhiiiiii</h6>
                </div>
              </div>
              <div className='messageContainerLeft my-2'>
                <div className='messageLeft'>
                  <h6 >Niraj Mannabudhiiiiii</h6>
                </div>
              </div>

            </div>
            <div className='messageInput'>
              <form className='messageForm'>
                <div className='inputMessage'>
                  <input type="text" className='inputBox' />
                </div>
                <div className='submitButtonDiv'>
                  <button type="submit" className="submitButton btn btn-primary">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserChats
