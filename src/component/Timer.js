import { useEffect } from "react";

function Timer({ dispatch, remainingSeconds }) {
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch] // dispatch remains the same function across multiple renders referentially. that's why this useEffect only runs once on mount. that's why setInterval is created only once and due to closure it remembers the same only value of remainingSeconds
  );
  function getTime(secs) {
    const s = String(secs % 60).padStart(2, 0);
    const m = String(Math.trunc(secs / 60)).padStart(2, 0);
    return `${m}:${s}`;
  }
  return <div className="timer">{getTime(remainingSeconds)}</div>;
}

export default Timer;
