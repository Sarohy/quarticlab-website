import React, { useEffect, useState } from "react";
import Image from "next/image";
import CD4Img1 from "../../../../public/assets/AboutUs/instagram.svg";
import CD4Img1Hover from "../../../../public/assets/AboutUs/instagramHover.svg";
import CD4Img2 from "../../../../public/assets/AboutUs/facebook.svg";
import CD4Img2Hover from "../../../../public/assets/AboutUs/facebookHover.svg";
import CD4Img3 from "../../../../public/assets/AboutUs/linkedin.svg";
import CD4Img3Hover from "../../../../public/assets/AboutUs/linkedInHover.svg";
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

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
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
      id: 1,
      img: "https://zweidevs-internal-prod.s3.ap-south-1.amazonaws.com/assets/Sarohy.svg",
      heading: "Abdul Rehman Sarohy",
      subHeading: "Co Founder",
      socialM1: CD4Img1,
      socialM2: CD4Img2,
      socialM3: CD4Img3,
      linkedIN: "https://linkedin.com/in/abdul-rehman-sarohy-0b40b0128",
    },
    {
      id: 2,
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
    <div className={styles.AUCd4Main}>
      <div ref={animatedHeadingRef}>
        <div className={styles.AUCard4Heading}>
          <p>Our Team Members</p> <hr className={styles.AUCard4HeadingLine1} />
          <hr className={styles.AUCard4HeadingLine2} />
        </div>

        <h2 className={styles.AUCard4SubHeading}>
          Our Expertise Will Help You
        </h2>
        <p className={styles.AUCard4Text}>
          Collectively, we possess a greater intellect than any one of us
          individually. We engage in passionate debates, embrace ongoing
          learning, and exhibit unwavering dedication as we guide our team
          towards establishing ourselves as the foremost technology partner for
          our expanding roster of clients.
        </p>
      </div>

      <div className={styles.AUCd4CardsContainer}>
        {elements.map((item, index) => {
          return (
            <div
              className={`${styles.AUCd4Cards} ${
                index != 0 ? styles.AUM : styles.AUM0
              }`}
              key={item.id}
            >
              <div>
                <Image
                  alt="zweidevs"
                  className={styles.AUCd4Img}
                  height={125}
                  src={item.img}
                  width={125}
                />
              </div>
              <h3 className={styles.AUCdCardHeading}>{item.heading}</h3>
              <h4 className={styles.AUCdCardSubHeading}>{item.subHeading}</h4>
              <div className={styles.AUCd4SocialContainer}>
                <a
                  className={styles.AUCd4Social}
                  href="https://www.instagram.com/zweidevs.official"
                  key={"insta"}
                  onMouseEnter={() => {
                    setHoverState(true);
                    setSelectImage("insta");
                    setSelectKey(item.heading);
                  }}
                  onMouseLeave={() => setHoverState(false)}
                  target="_blank"
                >
                  <Image
                    alt={"social-icon"}
                    height={42}
                    src={
                      hoverState &&
                      selectImage === "insta" &&
                      selectKey === item.heading
                        ? CD4Img1Hover
                        : item.socialM1
                    }
                    width={42}
                  />
                </a>
                <a
                  className={styles.AUCd4Social}
                  href="https://www.facebook.com/zweidevs"
                  key={"fb"}
                  onMouseEnter={() => {
                    setSelectImage("fb");
                    setHoverState(true);
                    setSelectKey(item.heading);
                  }}
                  onMouseLeave={() => setHoverState(false)}
                  target="_blank"
                >
                  <Image
                    alt={"social-icon-two"}
                    height={42}
                    src={
                      hoverState &&
                      selectImage === "fb" &&
                      selectKey === item.heading
                        ? CD4Img2Hover
                        : item.socialM2
                    }
                    width={42}
                  />
                </a>
                <a
                  className={styles.AUCd4Social}
                  href={item.linkedIN}
                  key={"linkedIn"}
                  onMouseEnter={() => {
                    setSelectImage("linkedIn");
                    setHoverState(true);
                    setSelectKey(item.heading);
                  }}
                  onMouseLeave={() => setHoverState(false)}
                  target="_blank"
                >
                  <Image
                    alt={"social-icon-three"}
                    height={42}
                    src={
                      hoverState &&
                      selectImage === "linkedIn" &&
                      selectKey === item.heading
                        ? CD4Img3Hover
                        : item.socialM3
                    }
                    width={42}
                  />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutUsCard4;
