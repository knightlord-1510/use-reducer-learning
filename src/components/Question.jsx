import Options from './Options';
import Timer from './Timer';

function Question({ question, dispatch, answer, numQuestions, currentIndex, secondsRemaining }) {
  const isLastQuestion = currentIndex === numQuestions - 1;
  const hasAnswered = answer !== null;

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />

      <div className="btn-container">
        <Timer secondsRemaining={secondsRemaining} />
        {hasAnswered && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: isLastQuestion ? 'finish' : 'nextQuestion' })}
          >
            {isLastQuestion ? 'Finish' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Question;

