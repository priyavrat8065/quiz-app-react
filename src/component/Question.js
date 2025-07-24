import Options from "./Options";
function Question({ question, dispatch, answer = { answer } }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
      {/* {answer && (
        <button className="btn" onClick={() => dispatch({ type: "answered" })}>
          Next
        </button>
      )} */}
    </div>
  );
}

export default Question;
