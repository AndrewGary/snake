import logo from './logo.svg';
import './App.css';
import { exportArray } from './utils/utils';
import React, { useState, useEffect } from 'react';
import { useInterval } from './utils/utils';

function App() {

  const moveSnake = () => {

    if(direction === 'U'){
      
      if(!boardArray[snakeArray[0] - 10]){
        setActive(false)
        console.log('done')
      }else if(boardArray[snakeArray[0] - 10].color === 'red'){
        const blah = [...boardArray];

        blah[snakeArray[0] - 10] = { color: 'black'}
        // setSnakeArray([...snakeArray, ])
        const newSnake = [snakeArray[0] - 10, snakeArray[0]]

        setSnakeArray(newSnake);

        setBoardArray(blah);
      }else{
        
        const blah = [...boardArray];

        blah[snakeArray[0]] = { color: 'white'}
        blah[snakeArray[0] - 10] = { color: 'black'}

        // const newSnakeArray = [snakeArray[0] - 10]
        const newSnakeArray = snakeArray.map(tile => tile - 10)
        setSnakeArray(newSnakeArray);

        setBoardArray([...blah])
      }
    }
    

    if(direction === 'D'){
      if(!boardArray[snakeArray[0] + 10]){
        setActive(false)
        console.log('done');
      }else{
        const blah = [...boardArray];

        blah[snakeArray[0]] = { color: 'white'}
        blah[snakeArray[0] + 10] = { color: 'black'}

        const newSnakeArray = [snakeArray[0] + 10]
        setSnakeArray(newSnakeArray);

        setBoardArray([...blah])
      }
    }

    if(direction === 'L'){
      if(snakeArray[0] % 10 === 0){
        setActive(false)
        console.log('done');
      }else{
        const blah = [...boardArray];

        blah[snakeArray[0]] = { color: 'white'}
        blah[snakeArray[0] - 1] = { color: 'black'}

        const newSnakeArray = [snakeArray[0] - 1]
        setSnakeArray(newSnakeArray);

        setBoardArray([...blah])
      }
    }

    if(direction === 'R'){

      if((snakeArray[0] + 1) % 10 === 0){
        setActive(false)
        console.log('done');
      }else{
        const blah = [...boardArray];

        blah[snakeArray[0]] = {color: 'white'}
        blah[snakeArray[0] + 1] = {color: 'black'}

        const newSnakeArray = [snakeArray[0] + 1]
        setSnakeArray(newSnakeArray);

        setBoardArray([...blah])
    }
  }
  }

  const getNewFoodCord = () => {
    let check = Math.floor(Math.random() * 99);

    while(boardArray[check].color !== 'white'){
      check = Math.floor(Math.random() * 99)
    }

    setFoodCoords(check);

    const blah = [...boardArray];

    blah[check] = { color: 'red'}

    setBoardArray([...blah])
  }

  useInterval(() => {
    if(active){
      moveSnake();
    }
  }, 250)

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
  const [foodCoords, setFoodCoords] = useState()
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='w-[500px] h-[500px] border border-black flex flex-wrap'>
        {boardArray.map((tile, i) => {
          let tt;
          if(tile.color === 'white'){
            tt = 'w-[10%] h-[10%] border bg-white'
          }else if(tile.color === 'red'){
            tt = 'w-[10%] h-[10%] border bg-red-500'
          }else if(tile.color === 'black'){
            tt = 'w-[10%] h-[10%] border bg-black'
          }
          return (
            <div key={i} className={tt}>
            
            {/* // <div key={i} className={`w-[10%] h-[10%] border bg-${tile.color}${tile.color === 'red' ? '-500' : ''}`}> */}

            </div>
          )
        })}
      </div>
        <button className='border border-red' onClick={() => {
          setActive(!active);
          setDirection('U')
          getNewFoodCord()
        }}>Start</button>
    </div>
  );
}

export default App;
