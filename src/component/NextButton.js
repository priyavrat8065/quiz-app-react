function NextButton({ answer, dispatch, index, totalQuestions }) {
  if (answer === null) return null;
  if (index < totalQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "answered" })}
      >
        Next
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

export default NextButton;
