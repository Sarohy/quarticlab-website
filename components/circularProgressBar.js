import React, { useEffect, useRef, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import styles from "../styles/CircularProgressBar.module.css";

function CircularProgressBar({
  trailValue,
  value,
  backgroundColor,
  text,
  unit,
}) {
  const [counter, setCounter] = useState(0);
  const myRef = useRef();
  const [oberserver, setObserver] = useState(false);

  let variable = 0;

  const numberIncrement = () => {
    if (variable <= trailValue) {
      variable++;
      setCounter(variable);
    }
  };
  useEffect(() => {
    const observe = new IntersectionObserver((entries) => {
      setObserver(entries[0].isIntersecting);
    });
    observe.observe(myRef.current);
  }, []);
  useEffect(() => {
    if (oberserver == true) {
      setInterval(() => {
        numberIncrement();
      }, 10);
    }
  }, [oberserver]);
  return (
    <div className={`${styles.progressBarContainer}`} ref={myRef}>
      <div className={styles.progressBar}>
        <CircularProgressbar
          value={counter}
          text={`${value} ${unit}`}
          background
          backgroundPadding={6}
          styles={buildStyles({
            backgroundColor: backgroundColor,
            textColor: "#fff",
            textSize: 16,
            pathColor: "#fff",
            trailColor: "transparent",
          })}
        />
      </div>
      <p className={styles.progressBarCaption}>{text}</p>
    </div>
  );
}

export default CircularProgressBar;
