import React from "react";

function showLife (life, win) {

	if (win === 0) {
		return <h4>Vous avez <span className={ life > 3 ? "life" : "life critic" }>{life}</span> essais</h4>
	} else if (win === 1) {
		return <h4>Vous avez gagné <span className={ life > 3 ? "life" : "life critic" }>{life}</span> point(s)</h4>
	} else {
		return null;
	}
}

function Life({ life, win }) {
	return (
		<React.Fragment>
			{showLife(life, win)}
		</React.Fragment>
	);
}

export default Life;
