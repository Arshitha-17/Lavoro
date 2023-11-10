import React, { useEffect, useState } from 'react'
import "./HrChats.css"
import { useNavigate } from 'react-router-dom'
import { usersApi } from '../../../axiosApi/axiosInstance'
import { toast } from "react-toastify"

import io from "socket.io-client"

const ENDPOINT = "https://www.lavoroo.site";
let socket, selectedChatCompare;


const HrChats = () => {
  const [rooms, setRooms] = useState([])
  const [chatId, setchatId] = useState('')
  const [chats, setChats] = useState([])
  const [content, setContent] = useState('')
  const [messageSend, setMessageSend] = useState(false)
  const [userName, setUserName] = useState('')
  const [socketConnected, setSocketConnected] = useState(false)


  const hrInfo = JSON.parse(localStorage.getItem("HRInfo"))

  const navigate = useNavigate()


  useEffect(()=>{
    socket = io(ENDPOINT)
    socket.emit("setup",hrInfo)
    socket.on('connection',()=>setSocketConnected(true))
  },[])




  const sendHandler = async (e) => {
    e.preventDefault()
    if (content === '') {
      return toast.error("Can't enter empty content")
    }
    try {
      const res = await usersApi.post(`/hr/sendChat/${chatId}/${hrInfo._id}/Hr`, { content })
      if (res) {
        setContent('')
        setMessageSend(true)
        socket.emit('new message',res.data.newMessage)

      }
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
        setMessageSend(false)
        socket.emit("join chat",chatId)
      }
    }
    fetchMessages()
    selectedChatCompare = chats;
  }, [chatId, messageSend])



  useEffect(() => {
    socket.on('message received',(newMessageReceived)=>{
        if(!selectedChatCompare || chatId!==newMessageReceived.room._id){

        }else{
            setChats([...chats,newMessageReceived])
        }
    })
})




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
                <div className='chatSubDiv m-3' key={index} onClick={() => { (setchatId(chat._id)); setUserName(chat.user.name) }} >
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
            <div className='nameDiv'> <h4>{userName}</h4></div>
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
                    ) : (
                      <div className='messageContainerLeft my-2' key={index}>
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
              <form className='messageForm' onSubmit={sendHandler}>
                <div className='inputMessage'>
                  <input value={content} type="text" className='inputBox' onChange={(e) => setContent(e.target.value)} />
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


export default HrChats