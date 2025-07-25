function SkipButton({ dispatch, index, totalQuestions, answer }) {
  if (index <= totalQuestions - 1 && answer === null)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "skipQuestion" })}
      >
        Skip
      </button>
    );
}

export default SkipButton;
