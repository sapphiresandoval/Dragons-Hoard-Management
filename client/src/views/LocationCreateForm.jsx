import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';
import axios from 'axios';

const LocationCreateForm = (props) => {
    const {id} = useParams()
    const {game, setGame} = useContext(userContext)
    const navigate = useNavigate()
    const [locationErrors, setLocationErrors] = useState({})
    const [location, setLocation] = useState({
        locationName: '',
        treasureList: '',
        locationNotes: '',
        isCompleted: false
    })

    useEffect(() => {
        const sessionGame = axios.get(`http://localhost:8004/api/games/${id}`, {withCredentials: true})
        setGame(sessionGame)
    }, [id])

    const changeHandler = e => {
        const {name, value} = e.target
        setLocation(prev => ({...prev, [name]: value}))
    }
    
    const submitHandler = e => {
        e.preventDefault()
        const newLocation = {...location, gameId: id}
        axios.post(`http://localhost:8004/api/location/add`, newLocation, {withCredentials: true})
            .then(() => navigate(`/game/${id}`))
            .catch(err => setLocationErrors(err.response.data.validationErrors))
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[450px] rounded-3xl xl:shadow-xl">
                <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-300">Add Location</h1>
                <hr/>
                <div className='flex justify-center mt-10'>
                    <form onSubmit={submitHandler}>
                        <input 
                            type="text"
                            name='locationName'
                            value={location.locationName}
                            onChange={changeHandler}
                            placeholder='Location Name'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{locationErrors.locationName}</p>
                        <br/>
                        <input 
                            type="text" 
                            name='treasureList'
                            value={location.treasureList}
                            onChange={changeHandler}
                            placeholder='Treasure List'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{locationErrors.treasureList}</p>
                        <br/>
                        <textarea
                            name='locationNotes'
                            value={location.locationNotes} 
                            onChange={changeHandler}
                            placeholder='Location Notes'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{locationErrors.locationName}</p>
                        <br/>
                        <label>
                            Completed? 
                            <input 
                                type="checkbox" 
                                name="isCompleted"
                                value={true}
                                onChange={() => setLocation(prev => ({...prev, isCompleted: !location.isCompleted}))}
                                checked={location.isCompleted}
                            />
                        </label>
                        <p className='text-red-500'>{locationErrors.isCompleted}</p>
                        <br />
                        <input type="submit" value="Add Location" className='text-black py-3 bg-yellow-400 text-white w-full rounded-md font-bold'/>
                    </form>
                </div>
            </div>
        </div>
)}

export default LocationCreateForm;