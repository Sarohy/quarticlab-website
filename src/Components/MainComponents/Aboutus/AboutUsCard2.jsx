import React, { useEffect } from "react";
import styles from "./AboutUs.module.css";
import { CD2Img1 } from "@component/assets/AboutUs";
import Image from "next/image";

const AboutUsCard2 = () => {
  const animatedTextRef = Array.from({ length: 7 }, () => React.useRef(null));
  const animatedLeftDivRef = Array.from({ length: 2 }, () =>
    React.useRef(null)
  );
  const animatedRightDivRef = Array.from({ length: 3 }, () =>
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
          <div ref={animatedRightDivRef[0]}>
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
              Who We Are?
            </p>
            <h2
              className={styles.AUCard2ImgDSubHeading}
              ref={animatedTextRef[0]}
            >
              The Leading Digital Agency For Business Solutions
            </h2>
            <p className={styles.AUCard2ImgDText} ref={animatedTextRef[1]}>
              Zweidevs is a tech studio that provides remote talented, skilled,
              dedicated, and professionals teams led by experienced computer
              scientists.
            </p>
            <p className={styles.AUCard2ImgDText} ref={animatedTextRef[2]}>
              It all started in 2020 when the founders met in a restaurant and
              decided to work together on a software development house that
              addresses contemporary client issues and requirements.
            </p>
            <p className={styles.AUCard2ImgDText} ref={animatedTextRef[3]}>
              Since then, we have continuously and progressively been working on
              our mission to serve thousands of clients and customers with a
              win-win for both of us, where we constantly evolve into an ongoing
              working relationship.{" "}
            </p>
            <p className={styles.AUCard2ImgDText} ref={animatedTextRef[4]}>
              Our team loves working on challenging products that have a lasting
              impact, since we hire skilled and talented people from top-ranked
              institutes, by welcoming them into an amiable culture that boosts
              their learning potential and outcome.
            </p>
          </div>
        </div>

        <div>
          <div className={styles.AUCardHeading} ref={animatedTextRef[5]}>
            <p>Zweidevs</p> <hr className={styles.AUCardHeadingLine1} />
            <hr className={styles.AUCardHeadingLine2} />
          </div>

          <div className={styles.AUCardDataContainer}>
            <h2 className={styles.AUCardDataHeading} ref={animatedTextRef[6]}>
              Team with strong interpersonal skills
            </h2>
            <p ref={animatedLeftDivRef[0]}>
              We have managed to build a team of individuals with strong
              interpersonal skills. Some qualities of our teammates that you
              would love to learn about are:
            </p>
            <h3
              className={styles.AUCardDataSubHeading}
              ref={animatedHeadingDivRef[1]}
            >
              Dedication & Focus
            </h3>
            <p ref={animatedRightDivRef[1]}>
              Zweidevs has put together a team of individuals who always do
              their best work. We put time and effort into your project to meet
              your needs. Hiring professional experts with practical knowledge
              gives our clients an edge over their competitors enabling them to
              grow by reaching their potential customers in more innovative
              ways.
            </p>
            <h3
              className={styles.AUCardDataSubHeading}
              ref={animatedHeadingDivRef[2]}
            >
              Budget Friendly
            </h3>
            <p ref={animatedLeftDivRef[1]}>
              Our main focus is to deliver everything the client wants and
              requires in the application within a minimal budget. We have a
              very thorough and an extremely detailed estimation model where we
              prepare the cost and the timeline estimates in a modular manner,
              making it easier for the client to understand, by ensuring to keep
              the cost low and the quality high.
            </p>
            <h3
              className={styles.AUCardDataSubHeading}
              ref={animatedHeadingDivRef[3]}
            >
              24/7 Support Team
            </h3>
            <p ref={animatedRightDivRef[2]}>
              We have an active support team available 24/7, which addresses all
              of the client needs, issues and concerns and fixes them right
              away, by ensuring to keep the application up and running with no
              issues whatsoever.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsCard2;
