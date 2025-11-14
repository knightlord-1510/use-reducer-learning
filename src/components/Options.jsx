import clsx from 'clsx';

function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={index}
          className={clsx('btn btn-option', {
            correct: hasAnswered && index === question.correctOption,
            wrong: hasAnswered && index === answer && index !== question.correctOption,
          })}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;

