function FinishScreen({ points, maxPossiblePoints, numQuestions, correctAnswers, dispatch }) {
  const percentage = Math.round((points / maxPossiblePoints) * 100);

  let emoji;
  if (percentage === 100) emoji = "🏆";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 50) emoji = "😊";
  else if (percentage > 0) emoji = "🤔";
  else emoji = "🤦‍♂️";

  return (
    <div className="finish-screen">
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPossiblePoints} points ({percentage}%)
      </p>
      <p className="result-details">
        You answered <strong>{correctAnswers}</strong> out of <strong>{numQuestions}</strong> questions correctly
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default FinishScreen;

