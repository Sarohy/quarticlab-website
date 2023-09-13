import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { HS3Img } from "@component/assets/HomeIcons";
import BottomBorderButton from "@component/Components/CommonComponents/BottomBorderButton";
import styles from "./HomeSection3.module.css";

function HomeSection3() {
  const animatedDivRefs = Array.from({ length: 3 }, () => React.useRef(null));
  const animatedPhoneRef = React.useRef(null);
  const animatedImgRef = React.useRef(null);
  const router = useRouter();
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
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

    const observer1 = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__shakeX",
            "animate__delay-0s",
          );
        }
      });
    }, options);

    const observer2 = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInRight",
            "animate__delay-0s",
          );
        }
      });
    }, options);

    animatedDivRefs.forEach(ref => {
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
            <div
              className={styles.HS3ContentHeading}
              ref={animatedDivRefs[0]}
            ></div>
            <h2 className={styles.HS3ContentText} ref={animatedDivRefs[1]}>
              Work With Top Notch Designers And Developers To Get Amazing
              Products.
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
              <BottomBorderButton
                onClick={() => {
                  router.push("/aboutus");
                }}
                text="Explore More"
              />
            </div>
          </div>
          <div className={styles.HS3ImgContainer} ref={animatedImgRef}>
            <Image
              alt={"zweidevs-icon"}
              className={styles.HS3ImgWidth}
              src={HS3Img}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeSection3;
