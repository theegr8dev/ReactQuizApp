function NextButton({ dispatch, answer, questionIndex, numQuestion }) {
	if (answer === null) return null;

	if (questionIndex < numQuestion - 1)
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: 'nextQuestion' })}
			>
				Next
			</button>
		);
	if (questionIndex === numQuestion - 1)
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: 'finish' })}
			>
				Finish
			</button>
		);
}

export default NextButton;
