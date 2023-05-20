import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./HomeSection.module.css";
import { HS3Img, HS3Img1 } from "@component/assets/HomeIcons";

function HomeSection3({ handleButtonClick }) {
  const animatedDivRefs = Array.from({ length: 4 }, () => React.useRef(null));
  const animatedPhoneRef = React.useRef(null);
  const animatedImgRef = React.useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
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
            "animate__shakeX",
            "animate__delay-0s"
          );
        }
      });
    }, options);

    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInRight",
            "animate__delay-0s"
          );
        }
      });
    }, options);

    animatedDivRefs.forEach((ref) => {
      observer.observe(ref.current);
    });

    if (animatedPhoneRef.current) {
      observer1.observe(animatedPhoneRef.current);
    }

    if (animatedImgRef.current) {
      observer2.observe(animatedImgRef.current);
    }

    return () => {
      observer.disconnect();
      observer1.disconnect();
      observer2.disconnect();
    };
  }, []);

  return (
    <>
      <div className={styles.HS3MainContainer}>
        <div className={styles.HS3ContentContainer}>
          <div className={styles.HS3TabContainer}>
            <div className={styles.HS3ContentHeading} ref={animatedDivRefs[0]}>
              <p>About us</p> <hr className={styles.HS3ContentLine1} />
              <hr className={styles.HS3ContentLine2} />
            </div>
            <h2 className={styles.HS3ContentText} ref={animatedDivRefs[1]}>
              Work with top notch designers and developers to get amazing
              products.
            </h2>
            <p className={styles.HS3ContentSubText} ref={animatedDivRefs[2]}>
              Zweidevs is a service-oriented company providing creative and
              innovative solutions for your business domain. We believe in
              exceeding your expectations by delivering thoughtfully innovated
              eye-catching products on your desk. We take a pride in engineering
              your requirements into robust software using our mobile, web,
              cloud and e-commerce capabilities.
            </p>
            <div className={styles.HS3ContactContainer}>
              <Image src={HS3Img1} alt={HS3Img1} ref={animatedPhoneRef} />
              <hr className={styles.HS3ContactLine1} />
              <div
                style={{ display: "flex", flexDirection: "column" }}
                ref={animatedDivRefs[3]}
              >
                <div className={styles.HSContactBook}>Instant Booking</div>
                <div className={styles.HS3ContactNum}>+92 333 1158255</div>
              </div>
            </div>
            <hr className={styles.HS3ContactLine2} />
          </div>
          <div className={styles.HS3ImgContainer} ref={animatedImgRef}>
            <Image className={styles.HS3ImgWidth} src={HS3Img} alt={HS3Img} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeSection3;
