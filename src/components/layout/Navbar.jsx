import React, { useContext } from 'react'
import { UserContext } from '../../UserContext'
import { Link } from 'react-router-dom'
import SignedInMenu from './SignedInMenu'
import SignedOutMenu from './SignedOutMenu'
import './Navbar.css'

const Navbar = () => {
    const { user, setUser } = useContext(UserContext)

    const logout = async () => {
        try {
            const res = fetch('https://mern-socket-chat-app-ben.herokuapp.com/logout', {
                credentials: 'include',
            })
            const data = (await res).json()
            console.log('logout data', data)
            setUser(null)
        } catch (err) {
            console.log(err.message)
        }

    }
    const menu = user ? <SignedInMenu logout={logout} /> : <SignedOutMenu />
    return (
        <div>
            <nav className='nav-custom'>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">Linkme</Link>

                    <a href="#" data-target="mobile-demo"
                        className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {menu}

                    </ul>
                </div>
            </nav>
            <ul class="sidenav" id="mobile-demo">
                {menu}
            </ul>
        </div>
    )
}

export default Navbar
