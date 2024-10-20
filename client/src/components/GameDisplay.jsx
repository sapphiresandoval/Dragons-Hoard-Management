import React, {useContext,useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { userContext } from '../context/userContext';
import axios from 'axios';
import PlayerView from '../views/PlayersView';

const GameDisplay = (props) => {
    const {id} = useParams()
    const {game, setGame} = useContext(userContext)
    const {allLocations, setAllLocations} = useContext(userContext)

    useEffect(() => {
        axios.get(`http://localhost:8004/api/games/${id}`, {withCredentials: true})
        .then(res => setGame(res.data))
        .catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        axios.get(`http://localhost:8004/api/location/`, {withCredentials: true})
        .then(res => setAllLocations(res.data))
        .catch(err => console.log(err))
    }, [id])

    const gameLocations = allLocations.map(location => location.gameId == game._id ? location : null).filter(location => location)

    return (
        <div className="flex justify-center items-center h-screen mt-2">
            <div className="xl:w-[1000px] px-10 h-[500px] rounded-3xl xl:shadow-xl">
                <h2 className="text-center text-3xl font-bold mt-1 mb-2 text-emerald-300">Game: {game.gameName}</h2>
                <hr/>
                <PlayerView/>

                <div className='box-content h-100 w-100 p-4 mt-3'>
                    <div className='flex gap-3 justify-center items-end'>
                    <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-400">Locations</h1>
                    <button className="btn btn-sm bg-emerald-600 mb-2 text-black">
                        <Link to={`/game/${id}/location/create`}>Add Location</Link>
                    </button>
                    </div>
                    <hr/>
                    <div>
                        {
                            gameLocations.map( location => (
                                <div className="card bg-neutral text-neutral-content w-50 mt-3 " key={location._id}>
                                    <h3 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-600">
                                        <Link  to={`/game/${id}/location/${location._id}`}>{location.locationName}</Link>
                                    </h3>
                                    <hr/>
                                    <p className='text-white'>{location.isCompleted ? 'Location is Completed' : 'Location is not Completed'}</p>
                                    <p className='text-white'>{location.locationNotes}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
)}

export default GameDisplay;