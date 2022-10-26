import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const LandingScreen = () => {

  const [gameMode, setGameMode] = useState('');

  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
        <div className='w-2/5 h-96 border border-black rounded-md flex flex-col justify-evenly items-center'>
            <h1 className='text-6xl'>Snake</h1>
            <h2 className='text-3xl'>Select Game Mode</h2>

            <div className='flex w-2/3 justify-center space-x-5'>
              <button onClick={() => {
                setGameMode('SP')
              }} className='w-1/3 border border-black rounded-md hover:bg-gray-300 transition-all'>Single Player</button>
              <button onClick={() => {
                setGameMode('MP')
              }} className='w-1/3 border border-black rounded-md hover:bg-gray-300 transition-all'>Online Multiplayer</button>
            </div>

            <NavLink to={`/Game/${gameMode}`} className='w-1/3 h-28 border border-black rounded-md hover:bg-gray-300 transition-all'>
              Start Game
            </NavLink>

        </div>
    </div>
  )
}

export default LandingScreen