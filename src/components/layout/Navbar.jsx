import React from 'react'
import './Navbar.css'

const Navbar = () => {
    return (
        <div>
            <nav className='nav-custom'>
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo">Linkme</a>

                    <a href="#" data-target="mobile-demo"
                        className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="#">Login</a></li>
                        <li><a href="#">Signup</a></li>
                        <li><a href="#">Logout</a></li>
                    </ul>
                </div>
            </nav>
            <ul class="sidenav" id="mobile-demo">
                <li><a href="#">Login</a></li>
                <li><a href="#">Signup</a></li>
                <li><a href="#">Logout</a></li>
            </ul>
        </div>
    )
}

export default Navbar
