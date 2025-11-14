function ProgressBar({ currentIndex, numQuestions, points, maxPossiblePoints, answer }) {
  const progress = ((currentIndex + (answer !== null ? 1 : 0)) / numQuestions) * 100;

  return (
    <header className="progress">
      <progress
        className="progress-bar"
        max={numQuestions}
        value={currentIndex + (answer !== null ? 1 : 0)}
      />

      <div className="progress-info">
        <p className="progress-question">
          Question <strong>{currentIndex + 1}</strong> / {numQuestions}
        </p>
        <p className="progress-points">
          Points: <strong>{points}</strong> / {maxPossiblePoints}
        </p>
      </div>
    </header>
  );
}

export default ProgressBar;

