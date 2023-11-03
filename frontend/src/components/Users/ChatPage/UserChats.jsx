import React, { useEffect, useState } from 'react'
import "./UserChats.css"
import { useNavigate, useParams } from 'react-router-dom'
import { usersApi } from '../../../axiosApi/axiosInstance'
const UserChats = () => {

  const [rooms, setRooms] = useState([])
  const [chatId, setchatId] = useState('')
  const [chats, setChats] = useState([])
  const [content, setContent] = useState('')
  const [messageSend, setMessageSend] = useState(false)
  const [hrName, setHrName] = useState('')
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const navigate = useNavigate()

  const { roomId } = useParams()

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [])






  useEffect(() => {
    if (roomId !== 'allchats') {
      setchatId(roomId);
    }
  }, [chatId]);


  const sendHandler = async (e) => {
    e.preventDefault()
    if (content === '') {
      return toast.error("Can't enter empty content")
    }
    try {
      const res = await usersApi.post(`/users/sendChat/${chatId}/${userInfo._id}/User`, { content })
      if (res) {
        console.log(res.data);
        setContent('')
        setMessageSend(true)

      }

    } catch (error) {
      console.log(error);
    }
  }



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

  useEffect(() => {

    let fetchMessages = async () => {
      let res = await usersApi.get(`/users/get-room-messages/${chatId}`)
      console.log(res.data.message);
      if (res) {
        setChats(res.data.message)
        setMessageSend(false)
      }
    }
    fetchMessages()
  }, [chatId, messageSend])





  return (
    <div>
      <div className='chatMainDiv'>
        <div className='d-flex'>
          <div className='userListDiv'>
            {rooms.length > 0 ? (
              rooms.map((chat, index) => (
                <div className='chatSubDiv m-3' key={index} onClick={() => {setchatId(chat._id); setHrName(chat.hr.name)}} >
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
            {
              (chatId) ? (
                <>
                  <div className='nameDiv'> <h4>{hrName}</h4></div>
                  <div className='chatContainer'>
                    {
                      (chats && chats.length > 0) ? (
                        chats.map((chat, index) => (
                          (chat.senderType === "User") ? (
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
                      ) : (
                        <div className='noChatDiv'>
                          <p>No Chats</p>
                        </div>
                      )
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
                </>
              ) : (
                <div className='noChatDiv'>
                  <p>No Chats</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserChats
