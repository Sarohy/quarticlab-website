import React, { useEffect } from "react";
import dynamic from "next/dynamic";
const InstantBookingButton = dynamic(() =>
  import("@component/Components/CommonComponents/InstantBookingButton"),
);
import styles from "./AboutUs5.module.css";

const AboutUsCard5 = () => {
  const animatedHeadingRef = React.useRef(null);
  const animatedButtonRef = React.useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__backInUp");
        }
      });
    }, options);

    const observer1 = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__bounceIn");
        }
      });
    }, options);

    if (animatedButtonRef.current) {
      observer1.observe(animatedButtonRef.current);
    }

    if (animatedHeadingRef.current) {
      observer.observe(animatedHeadingRef.current);
    }

    return () => {
      observer.disconnect();
      observer1.disconnect();
    };
  }, []);
  return (
    <>
      <div className={styles.AUCd5Main}>
        <h2 className={styles.AUCd5Heading} ref={animatedHeadingRef}>
          Are You Ready For Meaningful Results? We Can Help.
        </h2>
        <div className={styles.AUCd5Button} ref={animatedButtonRef}>
          <InstantBookingButton
            onClick={() => {
              window.open(
                "https://calendly.com/request-demo-zweidevs/30min",
                "_blank",
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AboutUsCard5;
