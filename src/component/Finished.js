function Finished({ points, maxPossiblePoints, highestScore }) {
  return (
    <div>
      <p className="result">
        You scored {points} out of {maxPossiblePoints}
      </p>
      {highestScore !== 0 && (
        <p className="highscore">
          Highest Score: <strong>{highestScore}</strong>
        </p>
      )}
    </div>
  );
}

export default Finished;
