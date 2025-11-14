function Question({ question, dispatch }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="btn btn-option"
            onClick={() => dispatch({ type: 'nextQuestion' })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;

