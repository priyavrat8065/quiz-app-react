// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finished from "./Finished";
import RestartButton from "./RestartButton";
import Footer from "./Footer";
import Timer from "./Timer";
import PreviousButton from "./PreviousButton";
import SkipButton from "./SkipButton";
const SECS_PER_QUESTION = 100;
const initialState = {
  questions: [],
  // loading, error, ready, finished
  status: "loading",
  index: 0,
  answers: [],
  curAnswer: null,
  points: 0,
  highestScore: localStorage.getItem("highestScore") || 0,
  remainingSeconds: null,
  isNewHighestScore: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      const currentAnswer = state.answers.at(state.index);
      if (state.index < state.answers.length) {
        return {
          ...state,
          curAnswer: action.payload,
          answers: state.answers.map((ans, i) =>
            i === state.index ? action.payload : ans
          ),
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      }
      return {
        ...state,
        answers: [...state.answers, action.payload],
        curAnswer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "answered":
      const nextAnswer = state.answers.at(state.index + 1);
      return {
        ...state,
        index: state.index + 1,
        curAnswer: nextAnswer !== undefined ? nextAnswer : null,
      };
    case "previousQuestion":
      const prevAnswer = state.answers.at(state.index - 1);
      return {
        ...state,
        index: state.index - 1,
        curAnswer: prevAnswer !== undefined ? prevAnswer : null,
      };
    case "finish":
      if (state.points > state.highestScore) {
        localStorage.setItem("highestScore", state.points);
        return { ...state, status: "finish", highestScore: state.points };
      }
      return { ...state, status: "finish" };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highestScore: localStorage.getItem("highestScore") || 0, // retains the highest score when restart quiz button is pressed
      };
    case "skipQuestion":
      if (state.index < state.answers.length) {
        return {
          ...state,
          index: state.index + 1,
          curAnswer: state.answers.at(state.index + 1),
        };
      } else {
        return {
          ...state,
          index: state.index + 1,
          answers: [...state.answers, null],
        };
      }

    case "tick":
      const nextSeconds = state.remainingSeconds - 1;
      if (nextSeconds === 0) {
        let isNewHighestScore = false;
        if (state.points > state.highestScore) {
          isNewHighestScore = true;
          localStorage.setItem("highestScore", state.points);
        }
        return {
          ...state,
          remainingSeconds: nextSeconds,
          status: "finish",
          highestScore: isNewHighestScore ? state.points : state.highestScore,
        };
      }
      return {
        ...state,
        remainingSeconds: nextSeconds,
      };

    default:
      throw new Error("Unknown Action");
  }
}
export default function App() {
  const [
    {
      questions,
      status,
      index,
      answers,
      points,
      highestScore,
      remainingSeconds,
      curAnswer,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const totalQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
        console.log(data);
      } catch (err) {
        console.error("Error");
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen totalQuestions={totalQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              totalQuestions={totalQuestions}
              maxPossiblePoints={maxPossiblePoints}
              points={points}
              answer={curAnswer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={curAnswer}
              curIndex={index}
            />
            <Footer>
              <Timer dispatch={dispatch} remainingSeconds={remainingSeconds} />
              <SkipButton
                dispatch={dispatch}
                totalQuestions={totalQuestions}
                index={index}
                answer={curAnswer}
              />

              <PreviousButton
                dispatch={dispatch}
                index={index}
                totalQuestions={totalQuestions}
              />

              <NextButton
                dispatch={dispatch}
                answer={curAnswer}
                index={index}
                totalQuestions={totalQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <>
            <Finished
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highestScore={highestScore}
            />
            <RestartButton dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}
