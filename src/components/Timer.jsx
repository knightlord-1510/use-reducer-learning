function Timer({ secondsRemaining }) {
  const safeSeconds = Math.max(0, Number.isFinite(secondsRemaining) ? secondsRemaining : 0);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return (
    <div className="timer" aria-label="quiz countdown timer">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}

export default Timer;
