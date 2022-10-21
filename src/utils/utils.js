import React, { useState, useEffect, useRef } from 'react';
export const exportArray = [];
// for(let i = 0; i < 10; i++){
//     exportArray.push([]);
//     for(let ii = 0; ii < 10; ii++){
//         exportArray[i].push({ color: 'white'})
//     }
// }

for(let i = 0; i < 100; i++){
    if(i === 44){
        exportArray.push({ color: 'black'})
    }else{
        exportArray.push({ color: 'white'});
    }
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const moveSnake = (boardArray, snakeArray, endOfGame, setGameActive, foodCoords, handleSpeedUp, setSnakeArray, handleShorten, getNewFoodCord, setScore, score, direction) => {
  console.log('direction: ', direction);
  if (direction === "U") {
    if (
      !boardArray[snakeArray[0] - 10] ||
      snakeArray.includes(snakeArray[0] - 10)
    ) {
      endOfGame();
      setGameActive(false);
    } else if (snakeArray[0] - 10 === foodCoords.index) {
      const blah = [foodCoords.index];

      for (let i = 0; i < snakeArray.length; i++) {
        blah.push(snakeArray[i]);
      }

      if (foodCoords.type === "speedUp") {
        handleSpeedUp();
      } else if (foodCoords.type === "shorten") {
        setSnakeArray(blah);
        handleShorten();
      } else {
        setSnakeArray(blah);
      }
      getNewFoodCord();
      setScore(score + 1);
    } else {
      const blah = [snakeArray[0] - 10];

      for (let i = 0; i < snakeArray.length - 1; i++) {
        blah.push(snakeArray[i]);
      }

      setSnakeArray(blah);
    }
  }

  if (direction === "D") {
    if (
      !boardArray[snakeArray[0] + 10] ||
      snakeArray.includes(snakeArray[0] + 10)
    ) {
      endOfGame();
      setGameActive(false);
    } else if (snakeArray[0] + 10 === foodCoords.index) {
      const blah = [foodCoords.index];

      for (let i = 0; i < snakeArray.length; i++) {
        blah.push(snakeArray[i]);
      }

      if (foodCoords.type === "speedUp") {
        setSnakeArray(blah);
        handleSpeedUp();
      } else if (foodCoords.type === "shorten") {
        handleShorten();
      } else {
        setSnakeArray(blah);
      }
      getNewFoodCord();
      setScore(score + 1);
    } else {
      const blah = [snakeArray[0] + 10];

      for (let i = 0; i < snakeArray.length - 1; i++) {
        blah.push(snakeArray[i]);
      }

      setSnakeArray(blah);
    }
  }

  if (direction === "L") {
    if (snakeArray[0] % 10 === 0 || snakeArray.includes(snakeArray[0] - 1)) {
      endOfGame();
      setGameActive(false);
    } else if (snakeArray[0] - 1 === foodCoords.index) {
      const blah = [foodCoords.index];

      for (let i = 0; i < snakeArray.length; i++) {
        blah.push(snakeArray[i]);
      }

      if (foodCoords.type === "speedUp") {
        setSnakeArray(blah);
        handleSpeedUp();
      } else if (foodCoords.type === "shorten") {
        handleShorten();
      } else {
        setSnakeArray(blah);
      }
      getNewFoodCord();
      setScore(score + 1);
    } else {
      const blah = [snakeArray[0] - 1];

      for (let i = 0; i < snakeArray.length - 1; i++) {
        blah.push(snakeArray[i]);
      }

      setSnakeArray(blah);
    }
  }

  if (direction === "R") {
    if (
      (snakeArray[0] + 1) % 10 === 0 ||
      snakeArray.includes(snakeArray[0] + 1)
    ) {
      endOfGame();
      setGameActive(false);
    } else if (snakeArray[0] + 1 === foodCoords.index) {
      const blah = [foodCoords.index];

      for (let i = 0; i < snakeArray.length; i++) {
        blah.push(snakeArray[i]);
      }

      if (foodCoords.type === "speedUp") {
        handleSpeedUp();
        setSnakeArray(blah);
      } else if (foodCoords.type === "shorten") {
        handleShorten();
      } else {
        setSnakeArray(blah);
      }
      getNewFoodCord();
      setScore(score + 1);
    } else {
      const blah = [snakeArray[0] + 1];

      for (let i = 0; i < snakeArray.length - 1; i++) {
        blah.push(snakeArray[i]);
      }

      setSnakeArray(blah);
    }
  }
};

export const handleKeyDown = (e, setGameActive, getNewFoodCord, setDirectionState, directionRef, recentlyEndedRef) => {
  if(recentlyEndedRef.current === true)
  if (recentlyEndedRef.current === false) {
  

  if (directionRef.current === "") {
    setGameActive(true);
    getNewFoodCord();
    setDirectionState(e.key[5]);
  } else {
    if (e.key === "ArrowDown" && directionRef.current !== "U") {
      setDirectionState(e.key[5]);
    } else if (e.key === "ArrowUp" && directionRef.current !== "D") {
      setDirectionState(e.key[5]);
    } else if (e.key === "ArrowLeft" && directionRef.current !== "R") {
      setDirectionState(e.key[5]);
    } else if (e.key === "ArrowRight" && directionRef.current !== "L") {
      setDirectionState(e.key[5]);
    }
  }
}
};