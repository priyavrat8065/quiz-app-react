function Progress({
  index,
  totalQuestions,
  points,
  maxPossiblePoints,
  answer,
}) {
  const progressBar = answer != null ? index + 1 : index;
  return (
    <header className="progress">
      <progress max={totalQuestions} value={progressBar} />
      <p>
        Questions <strong>{index + 1}</strong> / {totalQuestions}
      </p>
      <p>
        Total Points <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
