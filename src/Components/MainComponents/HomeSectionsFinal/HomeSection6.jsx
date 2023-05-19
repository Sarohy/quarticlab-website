import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./HomeSection.module.css";
import { HS6Img } from "@component/assets/HomeIcons";
function HomeSection6({ handleButtonClick }) {
  const animatedDivRefs = React.useRef(null);
  const animatedRefs = React.useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInUp",
            "animate__delay-0s"
          );
        }
      });
    }, options);

    const observer1 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__zoomIn",
            "animate__delay-0s"
          );
        }
      });
    }, options);

    if (animatedRefs.current) {
      observer1.observe(animatedRefs.current);
    }

    if (animatedDivRefs.current) {
      observer.observe(animatedDivRefs.current);
    }

    return () => {
      observer.disconnect();
      observer1.disconnect();
    };
  }, []);
  return (
    <>
      <div className={styles.HS6MainContainer}>
        <div className={styles.HS6Heading} ref={animatedDivRefs}>
          Why Zweidevs
        </div>
        <div className={styles.HS6ImageContainer} ref={animatedRefs}>
          <Image src={HS6Img} alt="zweidevs" className={styles.HS6ImgSize} />
        </div>
      </div>
    </>
  );
}

export default HomeSection6;
