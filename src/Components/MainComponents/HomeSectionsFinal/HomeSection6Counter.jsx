import React, { useEffect, useState, useRef } from "react";
import styles from "./HomeSection6Counter.module.css";

const HomeSection6Counter = (props) => {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { label, number, duration, sign } = props;
  const [count, setCount] = useState("0");

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let start = 0;
    const end = parseInt(number.substring(0, 3));

    if (start === end) return;
    const totalMilSecDur = parseInt(duration);
    const incrementTime = (totalMilSecDur / end) * 1000;

    const timer = setInterval(() => {
      start += 1;
      setCount(String(start) + number.substring(3));
      if (start === end) clearInterval(timer);
    }, incrementTime);
  }, [number, duration, isIntersecting]);

  return (
    <div className="Count" ref={ref}>
      <div>
        <span className={styles.sinceyear}>
          {count}
          {sign}
        </span>
        <br />
        <span
          className={styles.labelStyle}>{label} </span>
      </div>
    </div>
  );
};

export default HomeSection6Counter;
