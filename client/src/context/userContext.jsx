import {createContext, useState} from 'react'

export const userContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState({})
    const [game, setGame] = useState({})
    const [allGames, setAllGames] = useState([])
    const [location, setLocation] = useState({})
    const [allLocations, setAllLocations] = useState([])
    const [players, setPlayers] = useState([])
    const [enemies, setEnemies] = useState([])
    const [bosses, setBosses] = useState([])

    return (
        <userContext.Provider 
            value={{
                user, setUser, 
                game, setGame,
                allGames, setAllGames,
                location, setLocation,
                allLocations, setAllLocations,
                players, setPlayers,
                enemies, setEnemies,
                bosses, setBosses
                }}>
            {props.children}
        </userContext.Provider>
    )
}