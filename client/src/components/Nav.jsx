import React, {useContext, useState} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../services/user.services';
import { userContext } from '../context/userContext';

const Nav = (props) => {
    const {user, setUser} = useContext(userContext)
    const navigate = useNavigate()

    const location = useLocation()
    console.log(location)

    const logoutUser = () => {
        logout()
            .then(() => {navigate('/')})
            .catch(err => {console.log(err)})
    }

    if(location.pathname == '/' || location.pathname == '/register'){
        return (
            <nav className='nav'>
            <h1>Dragon's Hoard Management</h1>
        </nav>
        )
    }

    return (
        <nav className='nav'>
            <h1>Dragon's Hoard Management</h1>
            <ul className='navLinks'>
                <li>
                    <Link to={'/home'}>Home</Link>
                </li>
                <li>
                    <Link to={`/game/create`}>Add Game</Link>
                </li>
                <li>
                    <p onClick={logoutUser}>Logout</p>
                </li>
            </ul>
        </nav>
)}

export default Nav;