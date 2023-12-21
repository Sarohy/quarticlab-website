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
          entry.target.classList.add(
            "animate__animated",
            "animate__backInLeft",
            "animate__delay-0s",
          );
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
        <h2 className={styles.HS7Heading} ref={animatedDivRefs}>
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
