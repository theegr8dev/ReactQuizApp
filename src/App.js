import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
const initialState = {
	questions: [],
	// 'loading','error','ready','active','finised'(type of status)
	status: 'loading',
};
function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return { ...state, questions: action.payload, status: 'ready' };
		case 'dataFailed':
			return { ...state, status: 'error' };
		default:
			throw new Error('Action unKnown');
	}
}
export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	useEffect(() => {
		fetch('http://localhost:8000/questions')
			.then(res => res.json())
			.then(data => dispatch({ type: 'dataReceived', payload: data }))
			.catch(err => dispatch({ type: 'dataFailed' }));
	}, []);
	return (
		<div className="app">
			<Header />
			<Main>
				<p>1/15</p>
				<p>Question?</p>
			</Main>
		</div>
	);
}
