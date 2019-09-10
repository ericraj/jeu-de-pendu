import React, { useEffect } from "react";

function Keyboard({ alphabet, clickLetter, usedLetters, currentWord }) {
	const eventListener = e => {
		if (alphabet.indexOf(e.key) !== -1) {
			clickLetter(e.key);
		}
	};

	useEffect(() => {
		window.addEventListener("keyup", eventListener);
		return () => {
			window.removeEventListener("keyup", eventListener);
		};
	});

	const setClassNameToBtn = letter => {
		return usedLetters.indexOf(letter) !== -1 && currentWord.indexOf(letter) !== -1
			? "keyboard__used__finded"
			: usedLetters.indexOf(letter) !== -1 ? "keyboard__used" : "keyboard__notused";
	};

	return (
		<div className="keyboard">
			{alphabet.map((letter, key) => (
				<button
					className={setClassNameToBtn(letter)}
					key={"keyboard__" + key}
					onClick={() => clickLetter(letter)}
				>
					{letter}
				</button>
			))}
		</div>
	);
}

export default Keyboard;
