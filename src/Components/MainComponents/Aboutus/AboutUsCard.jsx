import React, { useEffect } from "react";
import Image from "next/image";
import { HS6Img } from "@component/assets/HomeIcons";
import styles from "./AboutUs3.module.css";

const AboutUsCard = () => {
  const animatedHeadingRef = React.useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__backInUp");
        }
      });
    }, options);
    if (animatedHeadingRef.current) {
      observer.observe(animatedHeadingRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className={styles.AUCd3Main}>
        <h2 className={styles.AUCd3Heading} ref={animatedHeadingRef}>
          Zweidevs Achievements Since 2010
        </h2>
        <div className={styles.AUCd3ProjectContainer}>
          <Image
            src={HS6Img}
            alt="statistics of zewidevs"
            className={styles.AUCd3ImgSize}
          />
        </div>
      </div>
    </>
  );
};

export default AboutUsCard;
