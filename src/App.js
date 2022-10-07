import logo from './logo.svg';
import './App.css';
import { exportArray } from './utils/utils';
import React, { useState, useEffect } from 'react';
import { useInterval } from './utils/utils';

function App() {

  const getNewFoodCoords = e => {
    let x, y;

    x = Math.floor(Math.random() * 9);
    y = Math.floor(Math.random() * 9);

    return [x, y];
  }

  const moveSnake = () => {

    // switch(direction){
    //   case 'N': {
    //     setBoardArray(boardArray.map((tile, i) => {
    //       if(i === snakeCoords[0] - 10){
    //         console.log('in here')
    //         return <div className='w-[10%] h-[10%] border bg-black'>

    //         </div>
    //       }else{
    //         return <div className='w-[10%] h-[10%] border bg-white'></div>
    //       }
    //     }))
    //   }
    //   case 'S': {
        
    //   }
    //   case 'E': {
        
    //   }
    //   case 'W': {
        
    //   }
    // setBoardArray(boardArray.map((arrayObj, i) => {
    //   setBoardArray(boardArray.map(obj => {
    //     return { color: 'black'}
    //   }))
    // }))
    if(direction === 'U'){
      const blah = [...boardArray];

      
    }

    if(direction === 'R'){
    const blah = [...boardArray];

    blah[snakeArray[0]] = {color: 'white'}
    blah[snakeArray[0] + 1] = {color: 'black'}

    const newSnakeArray = [snakeArray[0] + 1]
    setSnakeArray(newSnakeArray);

    setBoardArray([...blah])
    }
  }

  useInterval(() => {
    if(active){
      moveSnake();
    }
  }, 1000)

  const handleKeyDown = e => {
    if(e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
      setDirection(e.key[5])
    }

  }

  useEffect(() => {
    window.addEventListener('keydown',(e) => {
      handleKeyDown(e);
    })

  }, [])

  const [boardArray, setBoardArray] = useState(exportArray);
  const [direction, setDirection] = useState('')
  const [active, setActive] = useState(false);
  const [snakeArray, setSnakeArray] = useState([44]);
  const [foodCoords, setFoodCoords] = useState([])
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='w-[500px] h-[500px] border border-black flex flex-wrap'>
        {boardArray.map((tile, i) => {
          console.log(i + ': ' + tile.color)
          return (
            <div key={i} className={`w-[10%] h-[10%] border bg-${tile.color}`}>

            </div>
          )
        })}
      </div>
        <button onClick={() => {
          setActive(!active);
          setDirection('N')
        }}>Start</button>
    </div>
  );
}

export default App;
