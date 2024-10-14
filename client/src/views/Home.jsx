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

    const userGames = allGames.filter(game => game.userId === user._id);

    const deleteGame = (id) => {
        axios.delete(`http://localhost:8004/api/games/${id}`, {withCredentials: true})
            .then(() => setAllGames(prev => prev.filter( game => id != game._id)))
    }

    return (
        <div className='allContent'>
            {
                userGames.map(game => (
                    <div className='displayBox' key={game._id}>
                        <h3>
                            <Link to={`/game/${game._id}`}>{game.gameName}</Link>
                        </h3>
                        <p>World: {game.world}</p>
                        <p>Description: {game.description}</p>
                        <button>
                            <Link to={`/game/update/${game._id}`}>Update</Link>
                        </button>
                        <button onClick={() => deleteGame(game._id)}>Delete</button>
                    </div>
                ))
            }
        </div>
)}

export default Home;