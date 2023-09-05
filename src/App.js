import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
const initialState = {
	questions: [],
	// 'loading','error','ready','active','finised'(type of status)
	status: 'loading',
	questionIndex: 0,
	answer: null,
	points: 0,
};
function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return { ...state, questions: action.payload, status: 'ready' };
		case 'dataFailed':
			return { ...state, status: 'error' };
		case 'start':
			return { ...state, status: 'active' };
		case 'newAnswer':
			const currentQuestion = state.questions.at(state.index);
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
		default:
			throw new Error('Action unKnown');
	}
}
export default function App() {
	const [{ questions, status, questionIndex, answer }, dispatch] = useReducer(
		reducer,
		initialState
	);
	let numQuestions = questions.length;
	useEffect(() => {
		fetch('http://localhost:8000/questions')
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
						<Question
							question={questions[questionIndex]}
							dispatch={dispatch}
							answer={answer}
						/>
						<NextButton dispatch={dispatch} answer={answer} />
					</>
				)}
			</Main>
		</div>
	);
}
