import './App.css'
import {Route, Routes} from 'react-router-dom'
import Login from './components/Login'
import Registration from './components/Registration'
import Home from './views/Home'
import Nav from './components/Nav'
import GameForm from './components/GameForm'
import GameUpdateForm from './components/GameUpdateForm'
import GameDisplay from './components/GameDisplay'
import PlayerCreateForm from './views/PlayerCreateForm'
import LocationCreateForm from './views/LocationCreateForm'
import EnemyCreateForm from './views/EnemyCreateForm'
import BossCreateForm from './views/BossCreateForm'
import LocationView from './views/LocationView'
import PlayerUpdateForm from './views/PlayerUpdateForm'

function App() {

  return (
    <>
      <Nav/>
      <Routes>
        {/* user Login/Reg */}
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/home' element={<Home/>} />

        {/* Game routes */}
        <Route path='/game/create' element={<GameForm/>} />
        <Route path='/game/update/:id' element={<GameUpdateForm/>}/>
        <Route path='/game/:id' element={<GameDisplay/>}/>

        {/* Player Routes */}
        <Route path='/game/:id/player/create' element={<PlayerCreateForm/>}/>
        <Route path='/game/:id/player/:playerId/update' element={<PlayerUpdateForm/>}/>

        {/* Location Routes */}
        <Route path='/game/:id/location/create' element={<LocationCreateForm/>}/>
        <Route path='/game/:id/location/:locationid' element={<LocationView/>}/>

        {/* Enemy and Boss Routes */}
        <Route path='/game/:id/location/:locationid/enemy/create' element={<EnemyCreateForm/>}/>
        <Route path='/game/:id/location/:locationid/boss/create' element={<BossCreateForm/>}/>

        {/* Other Routes */}

      </Routes>
    </>
  )
}

export default App
