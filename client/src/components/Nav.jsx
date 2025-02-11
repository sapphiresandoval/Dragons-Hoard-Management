import React, {useContext, useState} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { userContext } from '../context/userContext';
import axios from 'axios';


const Nav = (props) => {
    const {user, setUser} = useContext(userContext)
    const navigate = useNavigate()

    const location = useLocation()

    const logoutUser = () => {
        axios.post(`http://localhost:8004/api/user/logout`, {withCredentials: true})
            .then(() => {navigate('/')})
            .catch(err => {console.log(err)})
    }

    if(location.pathname == '/' || location.pathname == '/register'){
        return (
            <nav className="navbar-center">
            <h1 className='font-bold text-3xl text-yellow-500'> Dragon's Hoard Management</h1>
        </nav>
        )
    }

    return (
        <nav className='nav'>
            <h1 className='font-bold text-3xl text-yellow-500' >Dragon's Hoard Management</h1>
            <ul className="menu menu-horizontal px-1 text-emerald-300">
                <li>
                    <Link to={'/home'}>Home</Link>
                </li>
                <li>
                    <Link to={`/game/create`}>Add Game</Link>
                </li>
                <li>
                    <p className='text-emerald-300' onClick={logoutUser}>Logout</p>
                </li>
            </ul>
        </nav>
)}

export default Nav;