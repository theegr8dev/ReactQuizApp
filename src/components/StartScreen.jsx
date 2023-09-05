function StartScreen({ numQuestions, dispatch }) {
	function handleClick() {
		dispatch({ type: 'start' });
	}
	return (
		<div className="start">
			<h2>Welcome To The React Quiz!</h2>
			<h3>{numQuestions} questions to test your mastery</h3>
			<button className="btn btn-ui" onClick={handleClick}>
				Let's Start
			</button>
		</div>
	);
}

export default StartScreen;
