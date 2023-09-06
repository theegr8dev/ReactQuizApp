function FinisedScreen({ points, maxPossiblePoints, highscore }) {
	const percentage = (points / maxPossiblePoints) * 100;

	return (
		<>
			<p className="result">
				You score <strong>{points}</strong> out of {maxPossiblePoints} (
				{Math.ceil(percentage)}%)
			</p>
			<p className="highscore">(Highscore: {highscore} points)</p>
		</>
	);
}

export default FinisedScreen;
