import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import { Link, useParams } from 'react-router-dom'
import Messages from './messages/Messages'
import Input from '../input/Input'
import io from 'socket.io-client'

let socket;

export const Chat = () => {
    const ENDPT = 'localhost:5000'

    const { user, setUser } = useContext(UserContext)
    let { room_id, room_name } = useParams()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket = io(ENDPT)
        socket.emit('join', { name: user.name, room_id, user_id: user._id })
    }, [])


    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message])
        })
    })

    useEffect(() => {
        socket.on('output-message', messages => {
            setMessages(messages)
        })
    })
    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, room_id, () => {
                setMessage('')
            })
        }
    }

    return (
        <div>
            <Messages messages={messages} user_id={user._id} />
            <Input
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
            />
        </div>
    )
}
