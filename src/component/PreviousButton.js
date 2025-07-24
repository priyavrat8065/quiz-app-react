function PreviousButton({ dispatch, index, totalQuestions }) {
  if (index >= 1 && index <= totalQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "previousQuestion" })}
      >
        Previous
      </button>
    );
}

export default PreviousButton;
