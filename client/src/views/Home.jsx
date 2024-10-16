import React, {useContext, useEffect, useState} from 'react';
import { userContext } from '../context/userContext';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Home = (props) => {
    const {user, setUser} = useContext(userContext)
    const {allGames, setAllGames} = useContext(userContext)

    useEffect(() => {
        axios.get('http://localhost:8004/api/games', {withCredentials: true})
            .then(res => setAllGames(res.data))
            .catch(err => console.log(err))
    }, [])

    const deleteGame = (id) => {
        axios.delete(`http://localhost:8004/api/games/${id}`, {withCredentials: true})
            .then(() => setAllGames(prev => prev.filter( game => id != game._id)))
    }

    const userGames = allGames.map(game => game.userId._id == user._id ? game : null).filter(game => game)
    

    return (
        <div className='allContent'>
            {
                userGames.map(game => (
                    <div className="card bg-neutral text-neutral-content w-96 hover:scale-105 mt-3" key={game._id}>
                        <div className="card-body items-center text-center">
                            <h3 className="card-title">
                                <Link to={`/game/${game._id}`}>{game.gameName}</Link>
                            </h3>
                            <p>World: {game.world}</p>
                            <p>Description: {game.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">
                                    <Link to={`/game/update/${game._id}`}>Update</Link>
                                </button>
                                <button className="btn btn-ghost" onClick={() => deleteGame(game._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
)}

export default Home;