import React, { useState, useContext } from 'react'
import { UserContext } from '../../UserContext'
import { Redirect } from 'react-router'


const Login = () => {
    const { user, setUser } = useContext(UserContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //ERRORS
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')


    const submitHandler = async (e) => {
        e.preventDefault()
        setEmailError('')
        setNameError('')
        setPasswordError('')
        console.log(name, email, password)
        try {
            const res = await fetch(
                'https://mern-socket-chat-app-ben.herokuapp.com/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            console.log(data)
            if (data.errors) {
                setEmailError(data.errors.email)
                setNameError(data.errors.name)
                setPasswordError(data.errors.password)
            }
            if (data.user) {
                setUser(data.user)
            }
        } catch (err) {
            console.log(err)
        }
    }
    if (user) {
        return <Redirect to='/' />
    }
    return (
        <div className="row">
            <h3 className='h3'>Login</h3>
            <form className="col s12" onSubmit={submitHandler}>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            id="email"
                            type="email"
                            className="validate"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className='email error red-text'>{emailError}</div>
                        <label htmlFor="email">email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            id="password"
                            type="password"
                            className="validate"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='password error red-text'>{passwordError}</div>
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <button className='btn'>Login</button>
            </form>
        </div>

    )
}

export default Login
