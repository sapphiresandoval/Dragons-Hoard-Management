import './App.css'
import {Route, Routes} from 'react-router-dom'
import Login from './components/Login'
import Registration from './components/Registration'
import Home from './views/Home'
import Nav from './components/Nav'
import GameForm from './components/GameForm'
import GameUpdateForm from './components/GameUpdateForm'
import GameDisplay from './components/GameDisplay'

function App() {

  return (
    <>
      <Nav/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/game/create' element={<GameForm/>} />
        <Route path='/game/update/:id' element={<GameUpdateForm/>}/>
        <Route path='/game/:id' element={<GameDisplay/>}/>
      </Routes>
    </>
  )
}

export default App
