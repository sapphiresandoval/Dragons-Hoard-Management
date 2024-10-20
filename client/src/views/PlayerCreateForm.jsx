import React, {useContext, useEffect, useState} from 'react';
import { userContext } from '../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PlayerCreateForm = (props) => {
    const {id} = useParams()
    const {game, setGame} = useContext(userContext)
    const navigate = useNavigate()
    const [playerErrors, setPlayerErrors] = useState({})
    const [player, setPlayer] = useState({
        playerName: '',
        health: '',
        armorClass: '',
        resistance: '',
        perks: '',
        hasDarkvision: false
    })
    
    useEffect(()=>{
        const sessionGame = axios.get(`http://localhost:8004/api/games/${id}`, {withCredentials: true})
        setGame(sessionGame)
    },[id])

    const changeHandler = e => {
        const {name, value} = e.target
        setPlayer(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault()
        const newPlayer = {...player, gameId: id}
        axios.post(`http://localhost:8004/api/player/add`, newPlayer, {withCredentials: true})
            .then(() => navigate(`/game/${id}`))
            .catch(err => setPlayerErrors(err.response.data.validationErrors))
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[600px] rounded-3xl xl:shadow-xl">
                <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-300">Add Player</h1>
                <hr/>
                <div className='flex justify-center mt-10'>
                    <form onSubmit={submitHandler}>
                        <input 
                            type="text" 
                            name='playerName'
                            value={player.playerName}
                            onChange={changeHandler}
                            placeholder='Player Name'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{playerErrors.playerName}</p>
                        <br/>
                        <input 
                            type="number" 
                            name='health'
                            value={player.health}
                            onChange={changeHandler}
                            placeholder='Health'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{playerErrors.health}</p>
                        <br/>
                        <input 
                            type="number" 
                            name='armorClass'
                            value={player.armorClass}
                            onChange={changeHandler}
                            placeholder='Armor Class'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{playerErrors.armorClass}</p>
                        <br/>
                        <input 
                            type="text" 
                            name='perks'
                            value={player.perks}
                            onChange={changeHandler}
                            placeholder='Perks'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{playerErrors.perks}</p>
                        <br/>
                        <input 
                            type="text" 
                            name='resistance'
                            value={player.resistance}
                            onChange={changeHandler}
                            placeholder='Resistance'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{playerErrors.resistance}</p>
                        <br/>
                        <label>
                            Has Darkvision? 
                            <input 
                                type="checkbox" 
                                name="hasDarkvision"
                                value={true}
                                onChange={() => setPlayer(prev => ({...prev, hasDarkvision: !player.hasDarkvision}))}
                                checked={player.hasDarkvision}
                                className='m-3'
                            />
                        </label>
                        <p className='text-red-500'>{playerErrors.hasDarkvision}</p>
                        <br />
                        <input type="submit" value="Add" className='text-black py-3 bg-yellow-400 text-white w-full rounded-md font-bold'/>
                    </form>
                </div>
            </div>
        </div>
)}

export default PlayerCreateForm;