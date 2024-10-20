import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';
import axios from 'axios';

const EnemyCreateForm = (props) => {
    const {id, locationid} = useParams()
    const {location, setLocation} = useContext(userContext)
    const navigate = useNavigate()
    const [enemyErrors, setEnemyErrors] = useState({})
    const [enemy, setEnemy] = useState({
        turnOrder: '',
        enemyName: '',
        health: '',
        armorClass: '',
        perks: '',
        resistance: ''
    })
    const [amount, setAmount] = useState('')

    useEffect(() => {
        const sessionLocation = axios.get(`http://localhost:8004/api/location/${locationid}`, {withCredentials: true})
        setLocation(sessionLocation)
    }, [locationid])

    const changeHandler = e => {
        const {name, value} = e.target
        setEnemy(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault()
        
        for(let count=0; count < amount; count++){
            
            const generateTurn = Math.floor(Math.random() * (20 - 1 + 1)) + 1
            const newEnemy = {...enemy, locationId: locationid, turnOrder: generateTurn}
            
            axios.post(`http://localhost:8004/api/enemy/add`, newEnemy, {withCredentials: true})
            .then(res => console.log(res.data.turnOrder) )
            .catch(err => setEnemyErrors(err.response.data.validationErrors))
            
        }
    
        navigate(`/game/${id}/location/${locationid}`)
        
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[600px] rounded-3xl xl:shadow-xl">
                <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-300">Add Enemies</h1>
                <hr/>
                <div className='flex justify-center mt-10'>
                    <form onSubmit={submitHandler}>
                        <input 
                            type="hidden" 
                            name="turnOrder" 
                            value={enemy.turnOrder}
                        />
                        <p>{enemyErrors.turnOrder}</p>
                        <input 
                            type="number" 
                            name="amount" 
                            placeholder='Amount' 
                            onChange={e => setAmount(Number(e.target.value))}
                            min='1'
                            required
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p></p>
                        <br/>
                        <input 
                            type="text"
                            name='enemyName'
                            value={enemy.enemyName}
                            onChange={changeHandler}
                            placeholder='Enemy Type'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{enemyErrors.enemyName}</p>
                        <br/>
                        <input 
                            type="number" 
                            name='health'
                            value={enemy.health}
                            onChange={changeHandler}
                            placeholder='Health'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{enemyErrors.health}</p>
                        <br/>
                        <input 
                            type="number" 
                            name='armorClass'
                            value={enemy.armorClass}
                            onChange={changeHandler}
                            placeholder='Armor Class'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{enemyErrors.armorClass}</p>
                        <br/>
                        <input 
                            type="text" 
                            name='perks'
                            value={enemy.perks}
                            onChange={changeHandler}
                            placeholder='Perks'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{enemyErrors.perks}</p>
                        <br/>
                        <input 
                            type="text" 
                            name='resistance'
                            value={enemy.resistance}
                            onChange={changeHandler}
                            placeholder='resistance'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{enemyErrors.resistance}</p>
                        <br/>
                        <input type="submit" value="Add" className='text-black py-3 bg-yellow-400 text-white w-full rounded-md font-bold'/>
                    </form>
                </div>
            </div>
        </div>
)}

export default EnemyCreateForm;