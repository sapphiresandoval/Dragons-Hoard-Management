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
        <div className='content'> 
            <h2>{game.gameName} Details</h2>
            <p>World Name: {game.world}</p>
            <p>Description: </p>
            <p>{game.description}</p>
        </div>
)}

export default GameDisplay;