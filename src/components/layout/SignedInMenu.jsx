import React from 'react'
import { Link } from 'react-router-dom'

const SignedInMenu = ({ logout }) => {
    return (
        <li onClick={logout}><Link to="#">Logout</Link></li>
    )
}

export default SignedInMenu
