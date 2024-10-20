import React, {useContext, useEffect, useState} from 'react';
import PlayersView from './PlayersView'
import { userContext } from '../context/userContext';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const LocationView = (props) => {
    const {id, locationid} = useParams()
    const {enemies, setEnemies} = useContext(userContext)
    const{ game, setGame} = useContext(userContext)
    const {bosses, setBosses} = useContext(userContext)
    const navigate = useNavigate()
    const [location, setLocation] = useState({
        locationName: '',
        treasureList: '',
        locationNotes: '',
        isCompleted: false
    })
    const [healthChange, setHealthChange] = useState({})
    const [enemyData, setEnemy] = useState({})
    const [bossData, setBoss] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try{
                const locationRes = await axios.get(`http://localhost:8004/api/location/${locationid}`, {withCredentials: true})
                setLocation(locationRes.data)
                
                const enemyRes = await axios.get(`http://localhost:8004/api/enemy/`, {withCredentials: true})
                setEnemies(enemyRes.data)
                
                const bossRes = await axios.get(`http://localhost:8004/api/boss/`, {withCredentials: true})
                setBosses(bossRes.data)

                const gameRes = await axios.get(`http://localhost:8004/api/games/${id}`, {withCredentials: true})
                setGame(gameRes.data)
                
            }catch(error){
                    console.log(error)
            }
        }
        fetchData()
    },[locationid])

    const locationEnemies = enemies.map(enemy => enemy.locationId._id == location._id ? enemy : null).filter(enemy => enemy)
    const locationBosses = bosses.map(boss => boss.locationId._id == location._id ? boss : null).filter(boss => boss)

    const healthHandler = (enemyId, value) => {
        setHealthChange(prev => ({...prev, [enemyId]: value}))
    }

    const enemyDecrease = (e, enemy) => {
        e.preventDefault()
        setEnemy(enemy)
        console.log(enemyData)
        const changeHealth = Math.max(Number(enemy.health) - Number(healthChange[enemy._id] || 0), 0)
        const updatedEnemy = {...enemy, health: changeHealth}
        console.log(changeHealth)
        setEnemies(prev => prev.map(e => (e._id === enemy._id ? updatedEnemy : e)))
        console.log(enemyData)
        axios.put(`http://localhost:8004/api/enemy/${enemy._id}`, updatedEnemy ,{withCredentials: true})
            .then(res => console.log(res.data) )
            .catch(err => console.log(err))
        setHealthChange(prev => ({...prev, [enemy._id]: 0}))
    }

    const enemyIncrease = (e,enemy) => {
        e.preventDefault()
        setEnemy(enemy)
        const changeHealth = (Number(enemy.health) + Number(healthChange[enemy._id] || 0))
        const updatedEnemy = {...enemy, health: changeHealth}
        setEnemies(prev => prev.map(e => (e._id === enemy._id ? updatedEnemy : e)))
        console.log(enemyData)
        axios.put(`http://localhost:8004/api/enemy/${enemy._id}`, updatedEnemy ,{withCredentials: true})
            .then(res => console.log(res.data) )
            .catch(err => console.log(err))
        setHealthChange(prev => ({...prev, [enemy._id]: 0}))
    }

    const bossDecrease = (e, boss) => {
        e.preventDefault()
        setBoss(boss)
        console.log(bossData)
        const changeHealth = Math.max(Number(boss.health) - Number(healthChange[boss._id] || 0), 0)
        const updatedboss = {...boss, health: changeHealth}
        console.log(changeHealth)
        setBosses(prev => prev.map(e => (e._id === boss._id ? updatedboss : e)))
        console.log(bossData)
        axios.put(`http://localhost:8004/api/boss/${boss._id}`, updatedboss ,{withCredentials: true})
            .then(res => console.log(res.data) )
            .catch(err => console.log(err))
        setHealthChange(prev => ({...prev, [boss._id]: 0}))
    }

    const bossIncrease = (e,boss) => {
        e.preventDefault()
        setBoss(boss)
        const changeHealth = (Number(boss.health) + Number(healthChange[boss._id] || 0))
        const updatedboss = {...boss, health: changeHealth}
        setBosses(prev => prev.map(e => (e._id === boss._id ? updatedboss : e)))
        console.log(bossData)
        axios.put(`http://localhost:8004/api/boss/${boss._id}`, updatedboss ,{withCredentials: true})
            .then(res => console.log(res.data) )
            .catch(err => console.log(err))
        setHealthChange(prev => ({...prev, [boss._id]: 0}))
    }

    const changeHandler = e => {
        const {name, value} = e.target
        setLocation(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault()
            
        axios.put(`http://localhost:8004/api/location/${locationid}`, location, {withCredentials: true})
            .then(() => navigate(`/game/${id}`))
            .catch(err => console.log(err))
    }

    const deleteEnemy = (enemyId) => {
        axios.delete(`http://localhost:8004/api/enemy/${enemyId}`, {withCredentials: true})
            .then(() => setEnemies(prev => prev.filter( enemy => enemy._id !== enemyId)))
            .catch(err => console.log(err))
    }

    const deleteBoss = (bossId) => {
        axios.delete(`http://localhost:8004/api/boss/${bossId}`, {withCredentials: true})
            .then(() => setBosses(prev => prev.filter( boss => boss._id !== bossId)))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h2 className="text-center text-4xl font-bold mt-2 mb-2 text-emerald-300">Location Name: {location.locationName}</h2>
            
            <PlayersView/>

            <div className='box-content h-fit w-100 mt-3'>
                <div className='flex gap-2 justify-center items-end'>
                    <h3 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-400">Enemies</h3>
                    <button className="btn btn-sm bg-emerald-600 mb-2">
                        <Link className='text-black' to={`/game/${id}/location/${locationid}/enemy/create`}>Add Enemies</Link>
                    </button>
                </div>
                <hr/>
                <div className='flex gap-2 flex-wrap'>
                    {
                        locationEnemies.map( enemy => (
                            <div className="card bg-neutral text-neutral-content w-50 mt-3 " key={enemy._id}>
                                <h3 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-600">Turn # {enemy.turnOrder}</h3>
                                <hr/>
                                <p className='mt-2 text-white'>Type: {enemy.enemyName}</p>
                                <p className='mt-2 text-white'>Health: {enemy.health}</p>
                                <p className='mt-2 text-white'>Armor Class: {enemy.armorClass}</p>
                                <p className='mt-2 text-white'>Resistance: </p>
                                <p className='text-wrap break-all text-white'>{enemy.resistance}</p>
                                <p className='mt-2 text-white'>Perks: </p>
                                <p className='text-wrap break-all text-white'>{enemy.perks}</p>
                                <hr />
                                <p className='mt-2 text-white'>Modify Health:</p>
                                <form className='flex gap-2 mt-2'>
                                    <input className='btn btn-sm btn-circle bg-emerald-600 text-black text-xl' type="button" value="-" onClick={(e) => enemyDecrease(e, enemy)}/>
                                    <input 
                                        type="number" 
                                        name="healthChange" 
                                        value={healthChange[enemy._id] || ''}
                                        onChange={(e) => healthHandler(enemy._id,e.target.value)}
                                        className='rounded-xs md:w-[100px] w-[50px]'
                                    />
                                    <button className='btn btn-sm btn-circle bg-emerald-600 text-black text-xl' onClick={(e) => enemyIncrease(e, enemy)}>+</button>
                                </form>
                                <button className="btn btn-ghost btn-sm mt-3 " onClick={() => deleteEnemy(enemy._id)}>Delete</button>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='box-content h-fit w-100 mt-3'>
                <div className='flex gap-2 justify-center items-end'>
                    <h3 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-400">Bosses</h3>
                    <button className="btn btn-sm bg-emerald-600 mb-2">
                        <Link className='text-black' to={`/game/${id}/location/${locationid}/boss/create`}>Add Bosses</Link>
                    </button>
                </div>
                <hr/>
                <div className='flex gap-2 flex-wrap'>
                    {
                        locationBosses.map( boss => (
                            <div className="card bg-neutral text-neutral-content w-50 mt-3 " key={boss._id}>
                                <h3 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-600">Turn # {boss.turnOrder}</h3>
                                <hr/>
                                <p className='mt-2 text-white'>Type: {boss.bossName}</p>
                                <p className='mt-2 text-white'>Health: {boss.health}</p>
                                <p className='mt-2 text-white'>Armor Class: {boss.armorClass}</p>
                                <p className='mt-2 text-white'>Resistance: </p>
                                <p className='text-wrap break-all text-white'>{boss.resistance}</p>
                                <p className='mt-2 text-white'>Perks: </p>
                                <p className='text-wrap break-all text-white'>{boss.perks}</p>
                                <hr />
                                <p className='mt-2 text-white'>Modify Health:</p>
                                <form className='flex gap-2 mt-2'>
                                    <input className='btn btn-sm btn-circle bg-emerald-600 text-black text-xl' type="button" value="-" onClick={(e) => bossDecrease(e, boss)}/>
                                    <input 
                                        type="number" 
                                        name="healthChange" 
                                        value={healthChange[boss._id] || ''}
                                        onChange={(e) => healthHandler(boss._id,e.target.value)}
                                        className='rounded-xs md:w-[100px] w-[50px]'
                                    />
                                    <button className='btn btn-sm btn-circle bg-emerald-600 text-black text-xl' onClick={(e) => bossIncrease(e, boss)}>+</button>
                                </form>
                                <button className="btn btn-ghost btn-sm mt-3 " onClick={() => deleteboss(boss._id)}>Delete</button>
                            </div>
                        ))
                    }
                </div>
            </div>

        <div className='box-content h-100 w-100 p-4  mt-3'>
            <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-yellow-500">Treasure</h1>
            <hr/>
            <p className='text-wrap break-all text-white mt-2'>{location.treasureList}</p>
        </div>
        
        
        <div className='box-content h-100 w-100 p-4 mt-3'>
            <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-400">Location Notes</h1>
            <hr/>
            <form className='mt-3' onSubmit={submitHandler}>
                <input type="hidden" name="locationName" value={location.locationName} />
                <input type="hidden" name="treasureList" value={location.treasureList} />
                <input
                    type='text'
                    name="locationNotes"
                    value={location.locationNotes}
                    onChange={changeHandler}
                    className='py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-yellow-400 text-black'
                />
                <br />
                <label className='mt-3'>
                    Completed Location? 
                    <input
                        type="checkbox" 
                        name="isCompleted"
                        value={true}
                        onChange={() => setLocation(prev => ({...prev, isCompleted : !location.isCompleted}))}
                        checked={location.isCompleted}
                        className='m-3'
                    />
                </label>
                <br />
                <p></p>
                <input type="submit" value="Save Location" className='py-3 bg-yellow-400 text-black w-60 rounded-md font-bold mt-4' />
            </form>

            </div>
        </div>
)}

export default LocationView;