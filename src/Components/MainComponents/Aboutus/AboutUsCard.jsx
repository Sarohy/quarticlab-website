import React, { useEffect } from "react";
import Image from "next/image";
import {
  CD3Img1,
  CD3Img2,
  CD3Img3,
  CD3Img4,
  CD3Img5,
} from "@component/assets/AboutUs";
import styles from "./AboutUs.module.css";

const AboutUsCard = () => {
  const animatedHeadingRef = React.useRef(null);
  const animatedImageRef = Array.from({ length: 5 }, () => React.useRef());
  const animatedTextRef = Array.from({ length: 5 }, () => React.useRef());

  const project = [
    {
      img: CD3Img1,
      count: "35 +",
      detail: "No. of Employees",
    },
    { img: CD3Img2, count: `150+`, detail: "Projects Completed" },
    {
      img: CD3Img3,
      count: `3.5M+`,
      detail: "Funding Raised",
    },
    { img: CD3Img4, count: `300+`, detail: "Hours Worked" },
    { img: CD3Img5, count: `70+`, detail: "Clients Served" },
  ];

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

    const observer1 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__heartBeat",
            "animate_delay-1s"
          );
        }
      });
    }, options);

    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__jello",
            "animate_delay-2s"
          );
        }
      });
    }, options);

    if (animatedHeadingRef.current) {
      observer.observe(animatedHeadingRef.current);
    }

    animatedImageRef.forEach((ref) => {
      observer1.observe(ref.current);
    });

    animatedTextRef.forEach((ref) => {
      observer2.observe(ref.current);
    });

    return () => {
      observer.disconnect();
      observer1.disconnect();
      observer2.disconnect();
    };
  }, []);

  return (
    <>
      <div className={styles.AUCd3Main}>
        <div className={styles.AUCd3Heading} ref={animatedHeadingRef}>
          Zweidevs Achievements since 2010
        </div>
        <div className={styles.AUCd3ProjectContainer}>
          {project.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  className={styles.AUCd3ProjectItem}
                  style={{
                    marginTop: index == 1 ? "-3px" : index != 0 ? "1px" : "",
                  }}
                >
                  <div ref={animatedImageRef[index]}>
                    <Image src={item.img} alt="zweidevs" />
                  </div>
                  <div ref={animatedTextRef[index]}>
                    <div className={styles.AUCd3ProjectCount}>
                      {" "}
                      {item.count}
                    </div>
                    <div className={styles.AUCd3ProjectDetail}>
                      {item.detail}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AboutUsCard;
