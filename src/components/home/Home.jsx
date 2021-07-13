import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../UserContext'
import { Link } from 'react-router-dom'
import RoomList from './RoomList'
import io from 'socket.io-client'
import './Home.css'

let socket;

export const Home = () => {
  const { user, setUser } = useContext(UserContext)
  const [room, setRoom] = useState('')
  const [rooms, setRooms] = useState([])

  const ENDPT = 'localhost:5000'

  useEffect(() => {
    socket = io(ENDPT)
    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [ENDPT])

  useEffect(() => {
    socket.on('output-rooms', rooms => {
      setRooms(rooms)
    })
  }, [])

  useEffect(() => {
    socket.on('room-created', room => {
      setRooms([...rooms, room])
    })
  }, [rooms])

  useEffect(() => {
    console.log(rooms)
  }, [rooms])


  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('create-room', room)
    console.log(room)
    setRoom('')

  }


  const setAsJohn = () => {
    const john = {
      name: 'John',
      email: 'john@email.com',
      password: '123',
      id: '123'
    }
    setUser(john)
  }

  const setAsTom = () => {
    const tom = {
      name: 'Tom',
      email: 'tom@email.com',
      password: '456',
      id: '456'
    }
    setUser(tom)
  }

  return (
    <div>
      <div className="flex-row">
        <div className="flex-col">
          <div className="myCard">
            <div className="card-content white-text">
              <span className="card-title">Welcome {user ? user.name : ''}</span>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div class="input-field col s12">
                    <input id="room" type="text" className="validate"
                      placeholder='enter a room name'
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                    />

                  </div>
                </div>
                <button className='btn'>Create Room</button>
              </form>
            </div>
            <div className="card-action">
              <a href="#" onClick={setAsJohn}>set as john</a>
              <a href="#" onClick={setAsTom}>set as tom</a>
            </div>
          </div>
        </div>
        <div className='flex-col'>
          <div className='rooms'>
            <RoomList rooms={rooms} />
          </div>
        </div>

      </div>
      <Link to='/chat'>
        <button>go to chat</button>
      </Link>
    </div>
  )
}
