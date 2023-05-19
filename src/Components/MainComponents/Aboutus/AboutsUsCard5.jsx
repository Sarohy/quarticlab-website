import React, { useEffect } from "react";
import { Zbutton } from "@component/Components/CommonComponents";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import styles from "./AboutUs.module.css";

const AboutUsCard5 = () => {
  const animatedHeadingRef = React.useRef(null);
  const animatedButtonRef = React.useRef(null);

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
          Are you ready for meaningful results? We can help.
        </h2>
        <div className={styles.AUCd5Button} ref={animatedButtonRef}>
          <Zbutton
            onClick={""}
            text="Instant Booking"
            color="#ff9700"
            backgroundColor="white"
            width="227px"
            orangeShaddow={true}
            showIcon={false}
            margin="0px 0px 10px 0px"
            icon={
              <ArrowCircleRightOutlinedIcon
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "30%",
                  marginTop: "-2px",
                }}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default AboutUsCard5;
