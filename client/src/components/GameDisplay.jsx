import React, {useContext,useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';
import axios from 'axios';

const GameDisplay = (props) => {
    const {id} = useParams()
    const {game, setGame} = useContext(userContext)

    useEffect(() => {
        axios.get(`http://localhost:8004/api/games/${id}`, {withCredentials: true})
            .then(res => setGame(res.data))
            .catch(err => console.log(err))
    }, [id])

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[400px] rounded-3xl xl:shadow-xl">
            <h1 className="text-center text-3xl font-bold mt-2 mb-2">{game.gameName}</h1>
            <hr/>
                <p className='text-xl font-bold mt-2 mb-2 text-white mt-4'>World Name: {game.world}</p>
                <p className='text-xl font-bold mt-2 mb-2 text-white mt-4'>Description: </p>
                <p className='text-lg mt-2 mb-2 text-white mt-4 text-wrap break-all'>{game.description}</p>
            </div>
        </div>
)}

export default GameDisplay;