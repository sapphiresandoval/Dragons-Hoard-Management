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
        <div>
            <form onSubmit={submitHandler}>
                <label>
                    Game Name:
                    <input 
                        type="text" 
                        name='gameName'
                        value={game.gameName}
                        onChange={changeHandler}
                    />
                </label>
                <p>{gameErrors.message}</p>
                <label>
                    World Name: 
                    <input 
                        type="text"
                        name='world'
                        value={game.world}
                        onChange={changeHandler}
                    />
                </label>
                <label>
                    Description: 
                    <textarea 
                        name="description"
                        value={game.description} 
                        onChange={changeHandler}
                    ></textarea>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
)}

export default GameUpdateForm;