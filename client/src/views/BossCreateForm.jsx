import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';
import axios from 'axios';

const BossCreateForm = (props) => {
    const {id, locationid} = useParams()
    const {location, setLocation} = useContext(userContext)
    const navigate = useNavigate()
    const [bossErrors, setBossErrors] = useState({})
    const [boss, setBoss] = useState({
        turnOrder: '',
        bossName: '',
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
        setBoss(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault()
        
        for(let count=0; count < amount; count++){
            
            const generateTurn = Math.floor(Math.random() * (20 - 1 + 1)) + 1
            const newBoss = {...boss, locationId: locationid, turnOrder: generateTurn}
            
            axios.post(`http://localhost:8004/api/boss/add`, newBoss, {withCredentials: true})
            .then(res => console.log(res.data.turnOrder) )
            .catch(err => setBossErrors(err.response.data.validationErrors))
            
        }
    
        navigate(`/game/${id}/location/${locationid}`)
        
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[600px] rounded-3xl xl:shadow-xl">
                <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-300">Add Bosses</h1>
                <hr/>
                <div className='flex justify-center mt-10'>
                    <form onSubmit={submitHandler}>
                        <input 
                            type="hidden" 
                            name="turnOrder" 
                            value={boss.turnOrder}
                        />
                        <p></p>
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
                            name='bossName'
                            value={boss.bossName}
                            onChange={changeHandler}
                            placeholder='Boss Type'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{bossErrors.bossName}</p>
                        <br/>
                        <input 
                            type="number" 
                            name='health'
                            value={boss.health}
                            onChange={changeHandler}
                            placeholder='Health'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{bossErrors.health}</p>
                        <br/>
                        <input 
                            type="number" 
                            name='armorClass'
                            value={boss.armorClass}
                            onChange={changeHandler}
                            placeholder='Armor Class'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{bossErrors.armorClass}</p>
                        <br/>
                        <input 
                            type="text" 
                            name='perks'
                            value={boss.perks}
                            onChange={changeHandler}
                            placeholder='Perks'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{bossErrors.perks}</p>
                        <br/>
                        <input 
                            type="text" 
                            name='resistance'
                            value={boss.resistance}
                            onChange={changeHandler}
                            placeholder='resistance'
                            className='text-black py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400'
                        />
                        <p className='text-red-500'>{bossErrors.resistance}</p>
                        <br/>
                        <input type="submit" value="Add" className='text-black py-3 bg-yellow-400 text-white w-full rounded-md font-bold'/>
                    </form>
                </div>
            </div>
        </div>
)}

export default BossCreateForm;