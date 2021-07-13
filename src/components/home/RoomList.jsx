import React from 'react'
import { Link } from 'react-router-dom'

const RoomList = ({ rooms }) => {

  return (
    <div>
      <h2 className="rooms-title">Available Rooms</h2>
      {rooms.map((room) => (
        <Link to={'/chat/' + room._id + '/' + room.name} key={room._id}>
          <div className='room-one' >{room.name}</div>
        </Link>
      ))}
    </div>
  )
}

export default RoomList
