import React, {useContext, useEffect, useState} from 'react';
import { userContext } from '../context/userContext';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PlayerView = (props) => {
    const {players, setPlayers} = useContext(userContext)
    const {id, locationid} = useParams()
    const {game, setGame} = useContext(userContext)

    useEffect(() => {
        axios.get('http://localhost:8004/api/player/', {withCredentials: true})
            .then(res => setPlayers(res.data))
            .catch(err => console.log(err))
    }, [id])

    const gamePlayers = players.map(player => player.gameId == game._id ? player : null).filter(player => player)


    return (
        <div className='box-content h-300 w-100 p-4  mt-3'>
            <div className='flex gap-3 justify-center items-end'>
            <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-400">Players</h1>
            
            <button className="btn btn-sm bg-emerald-600 mb-2">
                <Link className='text-black' to={`/game/${id}/player/create`}>Add Player</Link>
            </button>
            </div>
            <hr/>
            <div className='flex flex-wrap gap-2 mt-2'>
            {
                gamePlayers.map( player => (
                    <div className="card bg-neutral text-neutral-content w-50 mt-2 " key={player._id}>
                        <button className="btn btn-sm bg-emerald-600 mb-2">
                            <Link className='text-black' to={`/game/${id}/player/${player._id}/update`}>Update Player</Link>
                        </button>
                        <h3 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-600">{player.playerName}</h3>
                        <hr/>
                        <p className='mt-2 text-white'>Health: {player.health}</p>
                        <p className='mt-2 text-white'>Armor Class: {player.armorClass}</p>
                        <p className='mt-2 text-white'>Has Darkvision: {player.hasDarkvision ? 'Yes' : 'No'}</p>
                        <p className='mt-2 text-white'>Resistance: </p>
                        <p className='text-wrap break-all text-white'>{player.resistance}</p>
                        <p className='mt-2 text-white'>Perks: </p>
                        <p className='text-wrap break-all text-white'>{player.perks}</p>
                    </div>
                ))
            }
            </div>
        </div>
)}

export default PlayerView;