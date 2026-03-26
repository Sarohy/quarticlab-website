import React, { useEffect } from "react";
import Image from "next/image";
import longSvg from "../../../../public/assets/HomeIcons/slider-technologies.svg";
import styles from "./HomeSection7.module.css";

function HomeSection7() {
  const animatedDivRefs = React.useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.HS7Visible);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (animatedDivRefs.current) {
      observer.observe(animatedDivRefs.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className={styles.HS7MainContainer}>
        <h2
          className={`${styles.HS7Heading} ${styles.HS7FadeEl}`}
          ref={animatedDivRefs}
        >
          Technologies We Work With
        </h2>
        <div className={`${styles.circularSvgContainer}`}>
          <Image
            alt="technologies"
            className={styles.circularSvg}
            src={longSvg}
          />
          <Image
            alt="technologies"
            className={styles.circularSvg}
            src={longSvg}
          />
        </div>
      </div>
    </>
  );
}

export default HomeSection7;
