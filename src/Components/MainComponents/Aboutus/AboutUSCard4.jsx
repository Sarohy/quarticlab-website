import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  CD4Img1,
  CD4Img2,
  CD4Img3,
  CD4Img1Hover,
  CD4Img2Hover,
  CD4Img3Hover,
} from "@component/assets/AboutUs";
import styles from "./AboutUs4.module.css";

const AboutUsCard4 = () => {
  const animatedHeadingRef = React.useRef(null);
  const [hoverState, setHoverState] = useState(false);
  const [selectImage, setSelectImage] = useState("fb");
  const [selectKey, setSelectKey] = useState("Abdul Rehman Sarohy");

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

  const elements = [
    {
      img: "https://zweidevs-internal-prod.s3.ap-south-1.amazonaws.com/assets/Sarohy.svg",
      heading: "Abdul Rehman Sarohy",
      subHeading: "Co Founder",
      socialM1: CD4Img1,
      socialM2: CD4Img2,
      socialM3: CD4Img3,
      linkedIN: "https://linkedin.com/in/abdul-rehman-sarohy-0b40b0128",
    },
    {
      img: "https://zweidevs-internal-prod.s3.ap-south-1.amazonaws.com/assets/Ali.svg",
      heading: "Ali Zain",
      subHeading: "Co Founder",
      socialM1: CD4Img1,
      socialM2: CD4Img2,
      socialM3: CD4Img3,
      linkedIN: "https:linkedin.com/in/ali-zain-803416116",
    },
  ];

  return (
    <>
      <div className={styles.AUCd4Main}>
        <div ref={animatedHeadingRef}>
          <div className={styles.AUCard4Heading}>
            <p>Our Team Members</p>{" "}
            <hr className={styles.AUCard4HeadingLine1} />
            <hr className={styles.AUCard4HeadingLine2} />
          </div>

          <h2 className={styles.AUCard4SubHeading}>
            Our Expertise Will Help You
          </h2>
          <p className={styles.AUCard4Text}>
            Collectively, we possess a greater intellect than any one of us
            individually. We engage in passionate debates, embrace ongoing
            learning, and exhibit unwavering dedication as we guide our team
            towards establishing ourselves as the foremost technology partner
            for our expanding roster of clients.
          </p>
        </div>

        <div className={styles.AUCd4CardsContainer}>
          {elements.map((item, index) => {
            return (
              <>
                <div
                  className={styles.AUCd4Cards}
                  style={{ marginLeft: index != 0 ? "30px" : "" }}
                  key={item.heading}
                >
                  <div>
                    <Image
                      src={item.img}
                      alt="zweidevs"
                      className={styles.AUCd4Img}
                      width={125}
                      height={125}
                    />
                  </div>
                  <h3 className={styles.AUCdCardHeading}>{item.heading}</h3>
                  <h4 className={styles.AUCdCardSubHeading}>
                    {item.subHeading}
                  </h4>
                  <div className={styles.AUCd4SocialContainer}>
                    <a
                      key={"insta"}
                      className={styles.AUCd4Social}
                      href="https://www.instagram.com/zweidevs.official"
                      target="_blank"
                      onMouseEnter={() => {
                        setHoverState(true);
                        setSelectImage("insta");
                        setSelectKey(item.heading);
                      }}
                      onMouseLeave={() => setHoverState(false)}
                    >
                      <Image
                        width={42}
                        height={42}
                        src={
                          hoverState &&
                            selectImage === "insta" &&
                            selectKey === item.heading
                            ? CD4Img1Hover
                            : item.socialM1
                        }
                        alt={"social-icon"}
                      />
                    </a>
                    <a
                      className={styles.AUCd4Social}
                      href="https://www.facebook.com/zweidevs"
                      target="_blank"
                      key={"fb"}
                      onMouseEnter={() => {
                        setSelectImage("fb");
                        setHoverState(true);
                        setSelectKey(item.heading);
                      }}
                      onMouseLeave={() => setHoverState(false)}
                    >
                      <Image
                        width={42}
                        height={42}
                        src={
                          hoverState &&
                            selectImage === "fb" &&
                            selectKey === item.heading
                            ? CD4Img2Hover
                            : item.socialM2
                        }
                        alt={"social-icon-two"}
                      />
                    </a>
                    <a
                      className={styles.AUCd4Social}
                      href={item.linkedIN}
                      target="_blank"
                      key={"linkedIn"}
                      onMouseEnter={() => {
                        setSelectImage("linkedIn");
                        setHoverState(true);
                        setSelectKey(item.heading);
                      }}
                      onMouseLeave={() => setHoverState(false)}
                    >
                      <Image
                        width={42}
                        height={42}
                        src={
                          hoverState &&
                            selectImage === "linkedIn" &&
                            selectKey === item.heading
                            ? CD4Img3Hover
                            : item.socialM3
                        }
                        alt={"social-icon-three"}
                      />
                    </a>
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

export default AboutUsCard4;
