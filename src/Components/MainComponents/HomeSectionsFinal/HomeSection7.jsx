import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./HomeSection.module.css";
import {
  HS7Img1,
  HS7Img2,
  HS7Img3,
  HS7Img4,
  HS7Img5,
  HS7Img6,
  HS7Img7,
  HS7Img8,
  HS7Img9,
} from "@component/assets/HomeIcons";
function HomeSection7({ handleButtonClick }) {
  const animatedDivRefs = React.useRef(null);

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
        <div className={`${styles.slidertechcont} ${styles.slidertechcontimg}`}>
          {/* <div className={styles.HS7ImgContainer}>
            <Image
              className={styles.HS7Image}
              src={HS7Img1}
              alt="shopify-icon"
            />
            <Image className={styles.HS7Image} src={HS7Img2} alt="php-icon" />
            <Image className={styles.HS7Image} src={HS7Img3} alt="rails-icon" />
            <Image className={styles.HS7Image} src={HS7Img4} alt="react-icon" />
            <Image className={styles.HS7Image} src={HS7Img5} alt="node-icon" />
            <Image className={styles.HS7Image} src={HS7Img6} alt="openI-icon" />
            <Image
              className={styles.HS7Image}
              src={HS7Img7}
              alt="python-icon"
            />
            <Image
              className={styles.HS7Image}
              src={HS7Img8}
              alt="sqLite-icon"
            />
            <Image className={styles.HS7Image} src={HS7Img9} alt="unity-icon" />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default HomeSection7;
