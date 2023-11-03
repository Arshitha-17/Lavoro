import React, { useEffect, useState } from 'react'
import "./HrChats.css"
import { useNavigate } from 'react-router-dom'
import { usersApi } from '../../../axiosApi/axiosInstance'
import {toast} from "react-toastify"
const HrChats = () => {
  const [rooms, setRooms] = useState([])
  const [chatId, setchatId] = useState('')
  const [chats, setChats] = useState([])
  const [content, setContent] = useState('')


  const hrInfo = JSON.parse(localStorage.getItem("HRInfo"))
  
  const navigate = useNavigate()

 

  const sendHandler = ()=>{
    if(content ===''){
      return toast.error("Can't enter empty content")
    }
    try {
      
    } catch (error) {
      console.log(error);
    }
  }




  useEffect(() => {
    if (hrInfo._id) {
      let fetchRooms = async () => {
        let res = await usersApi.get(`/hr/get-hr-rooms/${hrInfo._id}`)
        setRooms(res.data.rooms)
        console.log(res.data.rooms);
      }
      fetchRooms()
    }
  }, [])

  useEffect(() => {
    console.log(chatId);
    let fetchMessages = async () => {
      let res = await usersApi.get(`/hr/get-room-messages/${chatId}`)
      console.log(res.data.message);
      if (res) {
        setChats(res.data.message)
      }
    }
    fetchMessages()
  }, [chatId])



  useEffect(() => {
    if (!hrInfo) {
      navigate('hr/login')
    }
  })


  return (
    <div>
      <div className='chatMainDiv'>
        <div className='d-flex'>
          <div className='userListDiv'>
            {rooms.length > 0 ? (
              rooms.map((chat, index) => (
                <div className='chatSubDiv m-3' key={index} onClick={() => setchatId(chat._id)} >
                  <h5>{chat.user.name} </h5>
                </div>
              ))
            ) : (
              <div className='flex h-full justify-center items-center'>
                <p className='text-blue-600 font-bold'>No Chats</p>
              </div>
            )}
          </div>
          <div className='chatDiv'>
            <div className='nameDiv'> <h4>Arshitha</h4></div>
            <div className='chatContainer'>
              {
                (chats && chats.length > 0) ? (
                  chats.map((chat, index) => (
                    (chat.senderType === "Hr") ? (
                      <div className='messageContainerRight my-2' key={index}>
                        <div className='messageRight'>
                          <h6 >{chat.content} </h6>
                        </div>
                      </div>
                    ):(
                      <div className='messageContainerLeft my-2'  key={index}>
                      <div className='messageLeft'>
                        <h6 >{chat.content} </h6>
                      </div>
                    </div>
                    )
                  ))
                ) : null
              }
            </div>
            <div className='messageInput'>
              <form className='messageForm'>
                <div className='inputMessage'>
                  <input value={content} type="text" className='inputBox' onChange={(e)=> setContent(e.target.value)} />
                </div>
                <div className='submitButtonDiv'>
                  <button type="submit" onClick={()=> sendHandler} className="submitButton btn btn-primary">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default HrChats