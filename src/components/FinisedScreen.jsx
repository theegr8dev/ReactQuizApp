function FinisedScreen({ points, maxPossiblePoints, highscore, dispatch }) {
	const percentage = (points / maxPossiblePoints) * 100;

	return (
		<>
			<p className="result">
				You score <strong>{points}</strong> out of {maxPossiblePoints} (
				{Math.ceil(percentage)}%)
			</p>
			<p className="highscore">(Highscore: {highscore} points)</p>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: 'restart' })}
			>
				Restart Quiz
			</button>
		</>
	);
}

export default FinisedScreen;
