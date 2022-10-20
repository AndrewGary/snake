import { exportArray } from "./utils/utils";
import React, { useState, useEffect, useRef } from "react";
import { useInterval } from "./utils/utils";
import { moveSnake } from './utils/utils';
import { handleKeyDown } from './utils/utils';

function App() {
  //STATE SECTION
	const frameRate = useRef(200);

	const [boardArray, setBoardArray] = useState(exportArray);
	const [snakeArray, setSnakeArray] = useState([45]);
	const [foodCoords, setFoodCoords] = useState(-1);
	const [score, setScore] = useState(0);

	{
		/**
    These 3 states needed to also have a useRef that pointed to them so 
    they could be accessed by the global useInterval hook
*/
	}
	const [active, setActive] = useState(false);
	const activeRef = useRef(active);
	const setGameActive = (data) => {
		activeRef.current = data;
		setActive(data);
	};

	const [gameRecentlyEnded, setGameRecentlyEnded] = useState(false);
	const recentlyEndedRef = useRef(gameRecentlyEnded);
	const setRecentlyEnded = (data) => {
		recentlyEndedRef.current = data;
		setGameRecentlyEnded(data);
	};

	const [direction, setDirection] = useState("");
	const directionRef = useRef(direction);
	const setDirectionState = (data) => {
		directionRef.current = data;
		setDirection(data);
	};
  //END OF STATE SECTION

  
  //HELPER FUNCTION SECTION
	const handleSpeedUp = () => {
		frameRate.current = 100;
		setTimeout(() => {
			frameRate.current = 200;
		}, 3000);
	};

	const handleShorten = () => {
		setSnakeArray(
			snakeArray.filter((arg, i) => {
				if (i < snakeArray.length - 1) {
					return arg;
				}
			})
		);
	};

  const endOfGame = (e) => {
		setRecentlyEnded(true);
		const copy = [...snakeArray];
		let index = 0;
		const blah = setInterval(() => {
			if (index === 11) {
				setRecentlyEnded(false);
				setSnakeArray([45]);
				getNewFoodCord();
				// setGameActive(true);
				setScore(0);
				clearInterval(blah);
			}
			setSnakeArray(index % 2 === 0 ? [] : [...copy]);
			index++;
		}, 100);
	};

  const getNewFoodCord = () => {
		let check = Math.floor(Math.random() * 99);

		while (snakeArray.includes(check)) {
			check = Math.floor(Math.random() * 99);
		}

		const typeRoll = Math.random();

		if (typeRoll <= 0.15 && snakeArray.length > 1) {
			setFoodCoords({ type: "shorten", index: check });
		} else if (typeRoll > 0.15 && typeRoll <= 0.3 && snakeArray.length > 1 && foodCoords.type !== 'speedUp') {
			setFoodCoords({ type: "speedUp", index: check });
		} else {
			setFoodCoords({ type: "normal", index: check });
		}
	};
  //END OF HELPER FUNCTION SECTION

  /**
   * This Section handles the global key listener that listens
   * for arrow keystrokes and sets the direction State/Ref to the correct
   * direction.
   */
  useEffect(() => {
		document.addEventListener("keydown", (e) => {
      if(e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight')
			handleKeyDown(e, setGameActive, getNewFoodCord, setDirectionState, directionRef, recentlyEndedRef);
		});
	}, []);
//END OF KEYLISTENER SECTION

  //GAMELOOP SECTION
  //This section sets up the global game loop that calls moveSnake at the current frameRate Interval
  //that is set in the state section of the code
  useInterval(() => {
		if (active) {
			moveSnake(boardArray, snakeArray, endOfGame, setGameActive, foodCoords, handleSpeedUp, setSnakeArray, handleShorten, getNewFoodCord, setScore, score, directionRef.current);
		}
	}, frameRate.current);
  //END OF GAME LOOP SECTION

	return (
		<div className="bg-slate-500  w-full min-h-screen flex flex-col justify-center items-center">
			<h1 className="text-2xl mb-5">Score: {score}</h1>
			<div className="w-[600px] h-[600px] border border-black flex flex-wrap">
				{boardArray.map((tile, i) => {
					let tt;
					if (snakeArray.includes(i)) {
						tt = "w-[10%] h-[10%] border bg-black";
					} else if (i === foodCoords.index) {
						if (foodCoords.type === "speedUp") {
							tt = "w-[10%] h-[10%] border bg-green-500";
						} else if (foodCoords.type === "shorten") {
							tt = "w-[10%] h-[10%] border bg-blue-500";
						} else {
							tt = "w-[10%] h-[10%] border bg-red-500";
						}
					} else {
						tt = "w-[10%] h-[10%] border bg-slate-100 ";
					}
					return <div key={i} className={tt} />;
				})}
			</div>
			<div className="h-4 flex flex-col w-1/2 items-center">
				<h2 className={active ? "hidden" : "text-2xl mt-4"}>
					Press an Arrow Key to Start Game
				</h2>

				<div className=" w-full flex justify-center space-x-4 mt-3">
					<div className="h-full flex items-center">
						<div className="w-[40px] h-[40px] bg-red-500 inline-flex" />
						<span className="text-xl pl-2">- Normal</span>
					</div>

					<div className="h-full flex items-center">
						<div className="w-[40px] h-[40px] bg-green-500 inline-flex" />
						<span className="text-xl pl-2">- 2x Speed</span>
					</div>

					<div className="h-full flex items-center">
						<div className="w-[40px] h-[40px] bg-blue-500 inline-flex" />
						<span className="text-xl pl-2">- Shorten Snake</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;