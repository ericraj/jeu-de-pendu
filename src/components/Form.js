import React from "react";

function Form({ currentWord, currentUser, handleChangeInput }) {
	return (
		<div className="form">
			{currentWord === null && (
				<input
					type="text"
					name="username"
					value={currentUser.usename}
					onChange={event => handleChangeInput(event)}
					placeholder="Pseudo"
				/>
			)}
		</div>
	);
}

export default Form;
