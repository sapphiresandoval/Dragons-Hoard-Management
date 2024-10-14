import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {userContext} from '../context/userContext'
import { register } from '../services/user.services';

const Registration = (props) => {
    const {user, setUser} = useContext(userContext)
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [userErrors, setUserErrors] = useState({})

    const changeHandler = e => {
        const {name, value} = e.target
        setUserData(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:8004/api/user/register',userData, {withCredentials: true})
            .then( res => {
                setUser(res.data)
                navigate('/home')
            })
            .catch(error => setUserErrors(error.response.data.validationErrors))
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>
                    Username: 
                    <input 
                        type="text"
                        name='username'
                        value={userData.username}
                        onChange={changeHandler} 
                    />
                </label>
                <label>
                    Email: 
                    <input 
                        type="text"
                        name='email'
                        value={userData.email}
                        onChange={changeHandler} 
                    />
                </label>
                <label>
                    Password: 
                    <input 
                        type="text"
                        name='password'
                        value={userData.password}
                        onChange={changeHandler} 
                    />
                </label>
                <label>
                    Confirm Password: 
                    <input 
                        type="text"
                        name='confirmPassword'
                        value={userData.confirmPassword}
                        onChange={changeHandler} 
                    />
                </label>
                <input type="submit" value="Register" />
            </form>
        </div>
)}

export default Registration;