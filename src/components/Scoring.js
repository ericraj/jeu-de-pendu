import React from "react";

function Scoring({ currentUser, users }) {
	// const [score, setScore] = React.useState(0);

	/* React.useEffect(
		() => {
			console.log(users.sort((a, b) => a.score - b.score).reverse());
		},
		[users]
	); */

	function showScore() {
		// console.log("Show score");
		// console.log("Users", users);
		return (
			<div className="score__list">
				<table>
					<tbody>
						{users !== null ? (
							users.sort((a, b) => a.score - b.score).reverse().map((user, index) => {
								return (
									<tr key={"user__" + index}>
										<td>{user.username}</td>
										<td>
											<span className="score__value">{user.score}</span>
										</td>
									</tr>
								);
							})
						) : (
							<span className="score__value">Pas de top score</span>
						)}
					</tbody>
				</table>
			</div>
		);
	}

	return (
		<div className="score">
			<h3>Top Score</h3>
			<br />
			{showScore()}
		</div>
	);
}

export default Scoring;
