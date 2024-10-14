import axios from 'axios'

const USER_INSTANCE = axios.create({
    baseURL: 'http://localhost:8004/api/user'
})

//Register 
export const register = async userData => {
    try{
        const res = await USER_INSTANCE.post('/register', userData)
        return res.data
    }catch(error){throw error}
}

//Login 
export const login = async userData => {
    try{
        const res = await USER_INSTANCE.post('/login', userData)
        return res.data
    }catch(error){throw error}
}

//Logout
export const logout = async () => {
    try{
        const res = await USER_INSTANCE.post('/logout')
        return res.data
    }catch(error){throw error}
}

//Read 

export const getAllUsers = async () => {
    try{
        const res = await USER_INSTANCE.get('/get_all')
        return res.data
    }catch(error){throw error}
}

export const getUserById = async id => {
    try{
        const res = await USER_INSTANCE.get(`/${id}`)
        return res.data
    }catch(error){throw error}
}