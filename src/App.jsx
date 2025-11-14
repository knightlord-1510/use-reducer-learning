import './App.css'
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import StartScreen from './components/StartScreen.jsx';
import Question from './components/Question.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import FinishScreen from './components/FinishScreen.jsx';

const initialState = {
  questions: [],
  status: 'loading', // 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
  answer: null, // to track the user's answer for the current question
  points: 0, // to track the user's total points
  correctAnswers: 0, // to track the number of correct answers
  secondsRemaining: null, // timer in seconds (null when not active)
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
        secondsRemaining: 300, // 5 minutes timer
      };
    case 'tick': {
      const next = (state.secondsRemaining ?? 0) - 1;
      return {
        ...state,
        secondsRemaining: Math.max(0, next),
        status: next <= 0 ? 'finished' : state.status,
      };
    }
    case 'newAnswer': {
      const question = state.questions[state.index];
      const isCorrect = action.payload === question.correctOption;
      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
        correctAnswers: isCorrect ? state.correctAnswers + 1 : state.correctAnswers,
      };
    }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null, // reset answer for next question
        status: state.index + 1 >= state.questions.length ? 'finished' : 'active',
      };
    case 'finish':
      return {
        ...state,
        status: 'finished',
      };
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      };
    default:
      throw new Error('Unknown action type')
  }
}


function App() {
  const [{ questions, status, index, answer, points, correctAnswers, secondsRemaining }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, question) => acc + question.points, 0);

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

  useEffect(() => {
    if (status !== 'active') return;
    if (secondsRemaining === null || secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, secondsRemaining]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'error' && <p>Error loading questions</p>}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <ProgressBar
              currentIndex={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              currentIndex={index}
              secondsRemaining={secondsRemaining}
            />
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            numQuestions={numQuestions}
            correctAnswers={correctAnswers}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  )
}

export default App;