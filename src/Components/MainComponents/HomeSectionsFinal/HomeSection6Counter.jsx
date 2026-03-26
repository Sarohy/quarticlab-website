import { useEffect, useRef, useState } from "react";
import styles from "./HomeSection6Counter.module.css";

const HomeSection6Counter = props => {
  const ref = useRef(null);
  const hasRun = useRef(false);
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
    // Only run the counter animation once — when it first becomes visible
    if (!isIntersecting || hasRun.current) { return; }
    hasRun.current = true;

    let start = 0;
    const end = parseInt(number.substring(0, 3));

    if (start === end) { return; }

    const totalMilSecDur = parseInt(duration);
    const incrementTime = (totalMilSecDur / end) * 1000;

    const timer = setInterval(() => {
      start += 1;
      setCount(String(start) + number.substring(3));
      if (start === end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isIntersecting, number, duration]);

  return (
    <div className="Count" ref={ref}>
      <div>
        <span className={styles.sinceyear}>
          {count}
          {sign}
        </span>
        <br />
        <span className={styles.labelStyle}>{label} </span>
      </div>
    </div>
  );
};

export default HomeSection6Counter;
