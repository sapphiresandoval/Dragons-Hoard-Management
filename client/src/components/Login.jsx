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
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[400px] rounded-3xl xl:shadow-xl">
                <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-300">Login</h1>
                <hr/>
                <div className='flex justify-center mt-10'>
                    <form onSubmit={submitHandler}> 
                        <input 
                            type="email" 
                            name="email"
                            value={userData.email}
                            onChange={changeHandler}
                            placeholder='Email'
                            className='py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400 text-black'
                        />
                        <p className='text-red-500'>{userErrors.email}</p> 
                        <br></br>
                        <input 
                            type="password" 
                            name="password"
                            value={userData.password}
                            onChange={changeHandler}
                            placeholder='Password'
                            className='py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400 text-black'
                        />
                        <p className='text-red-500'>{userErrors.password}</p>
                        <br></br>
                        <input type="submit" value="Login" className='py-3 bg-yellow-400 text-white w-full rounded-md font-bold text-black' />
                    </form>
                </div>
                <div className='class="flex justify-end mt-3 mb-4"'>
                    <Link to={'/register'}>Need to register?</Link>
                </div>
            </div>
        </div>
)}

export default Login;