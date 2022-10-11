import logo from './logo.svg';
import './App.css';
import { exportArray } from './utils/utils';
import React, { useState, useEffect, useRef } from 'react';
import { useInterval } from './utils/utils';

function App() {

  const movable = () => {
    if(direction === 'U' && !boardArray[snakeArray[0] - 10]){
      return false
    }else if(direction === 'D' && !boardArray[snakeArray[0] + 10]){
      return false
    }else if(direction === 'L' && snakeArray[0] % 10 === 0){
      return false
    }else if(direction === 'R' && (snakeArray[0] + 1) % 10 === 0){
      return false
    }else{
      return true
    }
  }

  const moveSnake = () => {

    if(direction === 'U'){
      
      if(!boardArray[snakeArray[0] - 10] || snakeArray.includes(boardArray[snakeArray[0] - 10])){
        endOfGame()
        setActive(false)
        console.log('done')
      }else if(snakeArray[0] - 10 === foodCoords){
        const blah = [foodCoords]

        for(let i = 0; i < snakeArray.length; i++){
          blah.push(snakeArray[i])
        }
        getNewFoodCord();
        setScore(score + 1);
        setSnakeArray(blah);
      }else{
        const blah = [snakeArray[0] - 10];

        for(let i = 0; i < snakeArray.length - 1; i++){
          blah.push(snakeArray[i])
        }

        setSnakeArray(blah);
      }
    }
    

    if(direction === 'D'){
      if(!boardArray[snakeArray[0] + 10] || snakeArray.includes(boardArray[snakeArray[0] + 10])){
        endOfGame()
        setActive(false)
        console.log('done');
      }else if(snakeArray[0] + 10 === foodCoords){
        const blah = [foodCoords]

        for(let i = 0; i < snakeArray.length; i++){
          blah.push(snakeArray[i])
        }
        getNewFoodCord();
        setScore(score + 1);
        setSnakeArray(blah);
      }else{
        const blah = [snakeArray[0] + 10];

        for(let i = 0; i < snakeArray.length - 1; i++){
          blah.push(snakeArray[i])
        }

        setSnakeArray(blah);
      }
    }

    if(direction === 'L'){
      if(snakeArray[0] % 10 === 0  || snakeArray.includes(boardArray[snakeArray[0] - 1])){
        endOfGame()
        setActive(false)
        console.log('done');
      }else if(snakeArray[0] - 1 === foodCoords){
        const blah = [foodCoords]

        for(let i = 0; i < snakeArray.length; i++){
          blah.push(snakeArray[i]);
        }
        getNewFoodCord()
        setScore(score + 1);
        setSnakeArray(blah);
      }else{
        const blah = [snakeArray[0] - 1];

        for(let i = 0; i < snakeArray.length - 1; i++){
          blah.push(snakeArray[i])
        }

        setSnakeArray(blah);
      }
    }

    if(direction === 'R'){

      if((snakeArray[0] + 1) % 10 === 0 || snakeArray.includes(snakeArray[0] + 1)){
        endOfGame()
        setActive(false)
        console.log('done');
      }else if(snakeArray[0] + 1 === foodCoords){
        const blah = [foodCoords];

        for(let i = 0; i < snakeArray.length; i++){
          blah.push(snakeArray[i]);
        }
        getNewFoodCord();
        setScore(score + 1);
        setSnakeArray(blah);
      }else{
        const blah = [snakeArray[0] + 1];

        for(let i = 0; i < snakeArray.length - 1; i++){
          blah.push(snakeArray[i])
        }

        setSnakeArray(blah);
      }
  }
  }

  const getNewFoodCord = () => {
    let check = Math.floor(Math.random() * 99);

    while(snakeArray.includes(check)){
      check = Math.floor(Math.random() * 99)
    }

    setFoodCoords(check);
  }

  useInterval(() => {
    if(active){
      moveSnake();
    }
  }, 200)

  const endOfGame = e => {
    const copy = [...snakeArray];
    let index = 0;
    const blah = setInterval(() => {
      if(index === 11){
        clearInterval(blah)
      }
      setSnakeArray(index % 2 === 0 ? [] : [...copy])
      index++
    }, 100)
  }

  const handleKeyDown = e => {
    // if(e.key === 'ArrowDown' && direction !== 'U'){
    //   setDirection(e.key[5])
    // }else if(e.key === 'ArrowUp' && direction !== 'D'){
    //   setDirection(e.key[5])
    // }else if(e.key === 'ArrowLeft' && direction !== 'R'){
    //   setDirection(e.key[5])
    // }else if(e.key === 'ArrowRight' && direction !== 'L'){
    //   setDirection(e.key[5])
    // }
    
    if(e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
      if(foodRef.current === -1){
        setActive(true)
        getNewFoodCord();
      }
      setDirection(e.key[5])
    }

  }

  useEffect(() => {
    document.addEventListener('keydown',(e) => {
      handleKeyDown(e);
    })
  }, [])

  const [boardArray, setBoardArray] = useState(exportArray);
  const [direction, setDirection] = useState('')
  const [active, setActive] = useState(false);
  const [snakeArray, setSnakeArray] = useState([45]);
  const [foodCoords, setFoodCoords] = useState(-1)
  const [score, setScore] = useState(0);

  const foodRef = useRef(foodCoords);
  const setDirectionState = data => {
    foodRef.current = data;
    setDirection(data)
  }
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center'>
        <h1>Score: {score}</h1>
      <div className='w-[600px] h-[600px] border border-black flex flex-wrap'>
        {boardArray.map((tile, i) => {
          let tt;
          if(snakeArray.includes(i)){
            tt = 'w-[10%] h-[10%] border bg-black'
          }else if(i === foodCoords){
            tt = 'w-[10%] h-[10%] border bg-red-500'
          } else{
            tt = 'w-[10%] h-[10%] border bg-white'
          }
          // if(tile.color === 'white'){
          //   tt = 'w-[10%] h-[10%] border bg-white'
          // }else if(tile.color === 'red'){
          //   tt = 'w-[10%] h-[10%] border bg-red-500'
          // }else if(tile.color === 'black'){
          //   tt = 'w-[10%] h-[10%] border bg-black'
          // }
          return (
            <div key={i} className={tt}>

            </div>
          )
        })}
      </div>
      <div>
        <button className='border border-red' onClick={() => {
          setActive(!active);
          setDirection('U')
          getNewFoodCord()
        }}>Start</button>

      </div>
    </div>
  );
}

export default App;
