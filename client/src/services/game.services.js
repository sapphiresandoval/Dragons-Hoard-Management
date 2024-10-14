import axios from 'axios'

const GAME_INSTANCE = axios.create({
    baseURL: 'http://localhost:8004/api/games'
})

//Create
export const createGame = async gameData => {
    try{
        const res = await GAME_INSTANCE.post('/add', gameData)
        return res.data
    }catch(error){throw error}
}

//Read
//All
export const getAllGames = async () => {
    try{
        const res = await GAME_INSTANCE.get('/')
        return res.data
    }catch(error){throw error}
}

//One
export const getOneGame = async id => {
    try{
        const res = await GAME_INSTANCE.get(`${id}`)
        return res.data
    }catch(error){throw error}
}

//Update
export const updateGame = async gameData => {
    try{
        const res = await GAME_INSTANCE.put(`/${gameData._id}`, gameData)
        return res.data
    }catch(error){throw error}
}

//Delete
export const deleteGame = async id => {
    try{
        const res = await GAME_INSTANCE.delete(`${id}`)
        return res.data
    }catch(error){throw error}
}

