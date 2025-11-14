import './App.css'
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import StartScreen from './components/StartScreen.jsx';
import Question from './components/Question.jsx';

const initialState = {
  questions: [],
  status: 'loading', // 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'start':
      return {
        ...state,
        status: 'active',
      };
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        status: state.index + 1 >= state.questions.length ? 'finished' : 'active',
      };
    case 'finish':
      return {
        ...state,
        status: 'finished',
      };
    default:
      throw new Error('Unknown action type')
  }
}


function App() {
  const [{ questions, status, index }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;

  useEffect(() => {
    axios
      .get('http://localhost:9000/questions')
      .then((response) => {
        dispatch({ type: 'dataReceived', payload: response.data });
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
        dispatch({ type: 'dataFailed' });
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'error' && <p>Error loading questions</p>}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && <Question question={questions[index]} dispatch={dispatch} />}
        {status === 'finished' && <p>Quiz finished!</p>}
      </Main>
    </div>
  )
}

export default App;