import React from 'react'
import './Input.css'

const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <div>
            <form action='' onSubmit={sendMessage}
                className='form'
            >
                <input type='text'
                    placeholder='enter a message'
                    className='chat-input'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' ?
                        sendMessage(e) : null}
                />
                <button className='send-btn'> <i class="material-icons send">send</i></button>
            </form>
        </div>
    )
}

export default Input
