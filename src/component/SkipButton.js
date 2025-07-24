function SkipButton({ dispatch, index, totalQuestions, answer }) {
  if (index < totalQuestions - 1 && answer === null)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "skipQuestion" })}
      >
        Skip
      </button>
    );
  if (index === totalQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default SkipButton;
