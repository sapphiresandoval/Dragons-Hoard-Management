import React, {useState, useContext, useEffect} from 'react';
import { userContext } from '../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const GameUpdateForm = (props) => {
    const {user, setUser} = useContext(userContext)
    const navigate = useNavigate()
    const {id} = useParams()
    const [gameErrors, setGameErrors] = useState({})
    const [game, setGame] = useState({
        gameName: '',
        world: '',
        description: ''
    })

    useEffect(()=> {
        axios.get(`http://localhost:8004/api/games/${id}`, {withCredentials: true})
            .then(res => setGame(res.data))
    },[])

    const changeHandler = e => {
        const {name, value} = e.target
        setGame(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault()
        
        axios.put(`http://localhost:8004/api/games/${game._id}`, game, {withCredentials: true})
            .then(() => navigate('/home'))
            .catch(err => {setGameErrors(err.response.data)
                console.log(err.response.data)
            })
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[450px] rounded-3xl xl:shadow-xl">
            <h1 className="text-center text-3xl font-bold mt-2 mb-2">Update Game</h1>
                <hr/>
                <div className='flex justify-center mt-10'>
                    <form onSubmit={submitHandler}>
                        <input 
                            type="text" 
                            name='gameName'
                            value={game.gameName}
                            onChange={changeHandler}
                            placeholder='Game Name'
                            className='py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{gameErrors.gameName}</p>
                        <br></br>
                        <input 
                            type="text"
                            name='world'
                            value={game.world}
                            onChange={changeHandler}
                            placeholder='World Name'
                            className='py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{gameErrors.world}</p>
                        <br></br>
                        <textarea 
                            name="description"
                            value={game.description} 
                            onChange={changeHandler}
                            placeholder='Description'
                            className='py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        ></textarea>
                        <p className='text-red-500'>{gameErrors.description}</p>
                        <br></br>
                        <input type="submit" value="Submit" className='py-3 bg-yellow-400 text-white w-full rounded-md font-bold'/>
                    </form>
                </div>
            </div>
        </div>
)}

export default GameUpdateForm;