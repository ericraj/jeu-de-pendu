import React, { useState, useEffect } from "react";
import "./App.css";
import Keyboard from "./components/Keyboard";
import CurrentWord from "./components/CurrentWord";
import Life from "./components/Life";

function App() {
	const initialState = {
		wordCollection : ["wordpress", "gare", "train", "glace", "code", "licorne"],
		currentWord    : null,
		alphabet       : "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toUpperCase().split(""),
		usedLetters    : [],
		win            : 0, // 0: neutral | 1: win | -1: lost
		life           : null
	};

	const [{ wordCollection, currentWord, alphabet, usedLetters, win, life }, setState] = useState(initialState);

	const generateNewWord = () => {
		const randomIndex = Math.floor(Math.random() * wordCollection.length);
		return wordCollection[randomIndex];
	};

	const initGame = () => {
		console.log("Init Game");
		let word = generateNewWord().toUpperCase();
		setState(prevState => ({
			...prevState,
			currentWord   : word,
			usedLetters   : [],
			findedLetters : [],
			win           : 0,
			life          : word.length * 2
		}));
	};

	// Init Game
	useEffect(() => {
		// initGame();

		const eventListener = e => {
			if (e.key === "Enter") {
				initGame();
			}
		};
		window.addEventListener("keyup", eventListener);
		return () => {
			window.removeEventListener("keyup", eventListener);
		};
	});

	// Check Game Status
	useEffect(
		() => {
			console.log("Check Game Status");

			// Game win
			if (currentWord !== null && usedLetters.length !== 0) {
				let wordFinded = true;
				for (let i = 0; i < currentWord.length; i++) {
					const letter = currentWord[i];
					if (usedLetters.indexOf(letter) === -1) {
						wordFinded = false;
					}
				}
				if (wordFinded) {
					console.log("Game Win");
					setState(currentState => ({ ...currentState, win: 1 }));
				}
			}

			// Game lost
			// Si life est inferieur ou égal à 0 et win est égal à 0 (neutre),
			// Alors on a perdu
			if (life <= 0 && win === 0 && currentWord !== null) {
				console.log("Game Over");
				setState(currentState => ({ ...currentState, win: -1 }));
			}
		},
		[currentWord, usedLetters, win, life]
	);

	const clickLetter = letter => {
		letter = letter.toUpperCase();
		// Si la lettre tapé n'est pas encore dans le usedLetters
		// Alors, on l'ajoute (maj state - usedLetters)
		if (usedLetters.indexOf(letter) === -1) {
			setState(currentState => ({ ...currentState, usedLetters: [...usedLetters, letter] }));
			// Si la lettre tapé n'est pas dans le currentWorld
			// Alors on décrémente la vie (maj state - life)
			if (currentWord.indexOf(letter) === -1) {
				setState(currentState => ({ ...currentState, life: currentState.life - 1 }));
			}
		} else {
			console.log("La lettre déjà tapé");
		}
	};

	return (
		<div className="app">
			<div className="container">
				<h1 className="title">Jeu du Pendu</h1>
				{win === 1 && <h4>Vous avez gangé <span className="emoji__win">😎😎✌✌</span></h4>}
				{win === -1 && <h4>Vous avez perdu <span className="emoji__lost">😠😠👇👇</span></h4>}
				{currentWord !== null && <Life life={life} win={win} />}
				{currentWord !== null && <CurrentWord currentWord={currentWord} usedLetters={usedLetters} win={win} />}
				{win === 0 &&
				currentWord !== null && (
					<Keyboard
						alphabet={alphabet}
						clickLetter={clickLetter}
						usedLetters={usedLetters}
						currentWord={currentWord}
					/>
				)}
				{(currentWord === null || win !== 0) && (
					<button className="btn__new__game" onClick={() => initGame()}>
						Novelle partie
					</button>
				)}
			</div>

			<div className="score">
				<h3>Score</h3>
			</div>
		</div>
	);
}

export default App;
