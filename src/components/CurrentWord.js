import React from "react";

function CurrentWord({ currentWord, usedLetters, win }) {
	return (
		<div className="current__word">
			{currentWord.split("").map((letter, key) => {
				let status = "notfinded";
				if (usedLetters.indexOf(letter) !== -1) status = "finded";
				if (usedLetters.indexOf(letter) === -1 && win === -1) status = "lost";

				return (
					<span key={"letter_" + key} className={"letter " + status}>
						{status === "finded" ? letter : win === -1 ? letter : "?"}
					</span>
				);
			})}
		</div>
	);
}

export default CurrentWord;
