import React, { useEffect } from "react";
import styles from "./AboutUs.module.css";
import { CD2Img1 } from "@component/assets/AboutUs";
import Image from "next/image";

const AboutUsCard2 = () => {
  const animatedTextRef = Array.from({ length: 5 }, () => React.useRef(null));
  const animatedLeftDivRef = Array.from({ length: 3 }, () =>
    React.useRef(null)
  );
  const animatedRightDivRef = Array.from({ length: 2 }, () =>
    React.useRef(null)
  );
  const animatedHeadingDivRef = Array.from({ length: 4 }, () =>
    React.useRef(null)
  );

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
            "animate__backInLeft",
            "animate__delay-0s"
          );
        }
      });
    }, options);

    const observer1 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__bounceIn");
        }
      });
    }, options);

    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__backInUp");
        }
      });
    }, options);

    const observer3 = new IntersectionObserver((entries) => {
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

    animatedRightDivRef.forEach((ref) => {
      observer.observe(ref.current);
    });

    animatedHeadingDivRef.forEach((ref) => {
      observer1.observe(ref.current);
    });

    animatedTextRef.forEach((ref) => {
      observer2.observe(ref.current);
    });

    animatedLeftDivRef.forEach((ref) => {
      observer3.observe(ref.current);
    });

    return () => {
      observer.disconnect();
      observer1.disconnect();
      observer2.disconnect();
      observer3.disconnect();
    };
  }, []);

  return (
    <>
      <div className={styles.AUCard2MainContain}>
        <div className={styles.AUCard2ImgContent}>
          <div ref={animatedLeftDivRef[0]}>
            <Image
              className={styles.AUCard2Img}
              src={CD2Img1}
              alt="card 2 about us"
            />
          </div>
          <div className={styles.AUCard2ImgDetail}>
            <p
              className={styles.AUCard2ImgDHeading}
              ref={animatedHeadingDivRef[0]}
            >
              Who We Are
            </p>
            <p
              className={styles.AUCard2ImgDSubHeading}
              ref={animatedTextRef[0]}
            >
              The Leading Digital Agency For Business Solutions
            </p>
            <p className={styles.AUCard2ImgDText} ref={animatedTextRef[1]}>
              Zweidevs is a service-oriented company providing creative and
              innovative solutions for your business domain. We believe in
              exceeding your expectations by delivering thoughtfully innovated
              eye-catching products on your desk
            </p>
            <p className={styles.AUCard2ImgDText} ref={animatedTextRef[2]}>
              Zweidevs is a service-oriented company providing creative and
              innovative solutions for your business domain. We believe in
              exceeding your expectations by delivering thoughtfully innovated
              eye-catching products on your desk.We believe in exceeding your
              expectations by delivering thoughtfully innovated eye-catching
              products on your desk
            </p>
          </div>
        </div>

        <div>
          <div className={styles.AUCardHeading} ref={animatedTextRef[3]}>
            <span>Zweidevs</span> <hr className={styles.AUCardHeadingLine1} />
            <hr className={styles.AUCardHeadingLine2} />
          </div>

          <div className={styles.AUCardDataContainer}>
            <p className={styles.AUCardDataHeading} ref={animatedTextRef[4]}>
              Developers with strong interpersonal skills
            </p>
            <p ref={animatedLeftDivRef[1]}>
              We have manage to build a team of developers with strong
              interpersonal skills. Some qualities of our mobile app developers
              that you dont would love to learn about is:
            </p>
            <p
              className={styles.AUCardDataSubHeading}
              ref={animatedHeadingDivRef[1]}
            >
              Dedication & Focus
            </p>
            <p ref={animatedRightDivRef[0]}>
              Zweidevs has put together a team of mobile app developers who
              always do their best work. They put time and effort into your
              project to meet your needs. Hiring professional app developers
              with practical knowledge gives you an edge over your competitors
              so you can grow and reach potential customers in more innovative
              ways.
            </p>
            <p
              className={styles.AUCardDataSubHeading}
              ref={animatedHeadingDivRef[2]}
            >
              Budget Friendly
            </p>
            <p ref={animatedLeftDivRef[2]}>
              Zweidevs has put together a team of mobile app developers who
              always do their best work. They put time and effort into your
              project to meet your needs. Hiring professional app developers
              with practical knowledge gives you an edge over your competitors
              so you can grow and reach potential customers in more innovative
              ways.
            </p>
            <p
              className={styles.AUCardDataSubHeading}
              ref={animatedHeadingDivRef[3]}
            >
              24/7 Support Team
            </p>
            <p ref={animatedRightDivRef[1]}>
              Zweidevshas put together a team of mobile app developers who
              always do their best work. They put time and effort into your
              project to meet your needs. Hiring professional app developers
              with practical knowledge gives you an edge over your competitors
              so you can grow and reach potential customers in more innovative
              ways.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsCard2;
