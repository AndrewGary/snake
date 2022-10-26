import React from 'react'
import Game from './Game'
import { Routes, Route } from 'react-router-dom'
import LandingScreen from './components/LandingScreen'

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<LandingScreen />}/>
        <Route path='/Game' element={<Game />} />
    </Routes>
  )
}

export default App