import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {userContext} from '../context/userContext'
import axios from 'axios'


const Login = (props) => {
    const {user, setUser} = useContext(userContext)
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    const [userErrors, setUserErrors] = useState({})
    
    const changeHandler = e => {
        const {name, value} = e.target
        setUserData(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:8004/api/user/login', userData, {withCredentials: true})
            .then( res => {
                setUser(res.data)
                navigate('/home')
            })
            .catch(error => {
                setUserErrors(error.response.data.message)
            })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>
                    Email: 
                    <input 
                        type="email" 
                        name="email"
                        value={userData.email}
                        onChange={changeHandler}
                    />
                </label>
                <p>{userErrors.email}</p>
                <label>
                    Password: 
                    <input 
                        type="text" 
                        name="password"
                        value={userData.password}
                        onChange={changeHandler}
                    />
                </label>
                {userErrors.password}
                <input type="submit" value="Login" />
            </form>
            <Link to={'/register'}>Need to register?</Link>
        </div>
)}

export default Login;