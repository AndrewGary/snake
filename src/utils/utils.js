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