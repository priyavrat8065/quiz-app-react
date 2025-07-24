import Options from "./Options";
function Question({ question, dispatch, answer, curIndex }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        curIndex={curIndex}
      />
      {/* {answer && (
        <button className="btn" onClick={() => dispatch({ type: "answered" })}>
          Next
        </button>
      )} */}
    </div>
  );
}

export default Question;
