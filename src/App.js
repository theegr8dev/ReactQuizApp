import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinisedScreen from './components/FinisedScreen';
import Timer from './components/Timer';
import Footer from './components/Footer';
const initialState = {
	questions: [],
	// 'loading','error','ready','active','finised'(type of status)
	status: 'loading',
	questionIndex: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
};
const SECS_PER_QUESTION = 30;
function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return { ...state, questions: action.payload, status: 'ready' };
		case 'dataFailed':
			return { ...state, status: 'error' };
		case 'start':
			return {
				...state,
				status: 'active',
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		case 'newAnswer':
			const currentQuestion = state.questions.at(state.questionIndex);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === currentQuestion.correctOption
						? state.points + currentQuestion.points
						: state.points,
			};
		case 'nextQuestion':
			return {
				...state,
				questionIndex: state.questionIndex + 1,
				answer: null,
			};
		case 'finish':
			return {
				...state,
				status: 'finised',
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			};
		case 'restart':
			return {
				...initialState,
				questions: state.questions,
				status: 'ready',
			};
		// return {
		// 	...state,
		// 	questions: state.questions,
		// 	status: 'ready',
		// 	questionIndex: 0,
		// 	answer: null,
		// 	points: 0,
		// 	highscore: 0,
		// };
		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? 'finised' : state.status,
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			};

		default:
			throw new Error('Action unKnown');
	}
}
export default function App() {
	const [
		{
			questions,
			status,
			questionIndex,
			answer,
			points,
			highscore,
			secondsRemaining,
		},
		dispatch,
	] = useReducer(reducer, initialState);
	let numQuestions = questions.length;
	let maxPossiblePoints = questions.reduce(
		(accum, ques) => accum + ques.points,
		0
	);
	useEffect(() => {
		fetch('https://reactquizdata.onrender.com/questions')
			.then(res => res.json())
			.then(data => dispatch({ type: 'dataReceived', payload: data }))
			.catch(() => dispatch({ type: 'dataFailed' }));
	}, []);
	return (
		<div className="app">
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen numQuestions={numQuestions} dispatch={dispatch} />
				)}
				{status === 'active' && (
					<>
						<Progress
							index={questionIndex}
							numQuestions={numQuestions}
							points={points}
							maxPossiblePoints={maxPossiblePoints}
							answer={answer}
						/>
						<Question
							question={questions[questionIndex]}
							dispatch={dispatch}
							answer={answer}
						/>
						<Footer>
							<Timer
								dispatch={dispatch}
								secondsRemaining={secondsRemaining}
							/>
							<NextButton
								dispatch={dispatch}
								answer={answer}
								numQuestion={numQuestions}
								questionIndex={questionIndex}
								status={status}
							/>
						</Footer>
					</>
				)}
				{status === 'finised' && (
					<FinisedScreen
						points={points}
						maxPossiblePoints={maxPossiblePoints}
						highscore={highscore}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	);
}
