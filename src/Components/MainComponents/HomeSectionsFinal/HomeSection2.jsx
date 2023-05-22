import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./HomeSection.module.css";
import {
  HS2Img1,
  HS2Img2,
  HS2Img3,
  HS2Img4,
  HS2Img5,
} from "@component/assets/HomeIcons";
import { Zbutton } from "@component/Components/CommonComponents";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

function HomeSection2({ handleButtonClick }) {
  const animatedDivRefs = Array.from({ length: 2 }, () => React.useRef(null));
  const animatedCardRefs = Array.from({ length: 5 }, () => React.useRef(null));
  const animatedImgRefs = Array.from({ length: 5 }, () => React.useRef(null));
  const animatedHeadingRefs = Array.from({ length: 5 }, () =>
    React.useRef(null)
  );

  const cardData = [
    {
      key: "hs2Img1",
      image: HS2Img1,
      heading: "Block Chain Development",
      details: `Blockchain is the backbone Technology of Digital CryptoCurrency BitCoin. A distributed database of records of all transactions. We have a team of Blockchain developers to make the deployment correct.`,
    },
    {
      key: "hs2Img2",
      image: HS2Img2,
      heading: "DevOps Development",
      details: `We possess deep knowledge and extensive experience with cloud services. Shorten time to develop and launch new solutions, modernize legacy technology or test and deploy prototypes with IaaS-based applications on Amazon Web Services, Digital Ocean, Heroku, Microsoft Azure or Google Cloud.`,
    },
    {
      key: "hs2Img3",
      image: HS2Img3,
      heading: "Web Application Development",
      details:
        "We are a creative web development team, who aim to leverage the latest technological advances with thoughtful design and serious engineering to build tailored solutions for our clients.engineering to build tailored solutions for any industry.",
    },
    {
      key: "hs2Img4",
      image: HS2Img4,
      heading: "Ecommerce Development",
      details:
        "We develop sleek looking native and hybrid mobile apps for iOS & Android to ensure the customer satisfaction and performance at the core.",
    },
    {
      key: "hs2Img5",
      image: HS2Img5,
      heading: "Mobile Development",
      details:
        "We develop sleek looking native and hybrid mobile apps for iOS & Android to ensure the customer satisfaction and performance at the core.",
    },
  ];

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

    const observer1 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInUp",
            "animate__delay-1s"
          );
        }
      });
    }, options);

    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__zoomIn",
            "animate__delay-1s"
          );
        }
      });
    }, options);

    const observer3 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInUp",
            "animate__delay-2s"
          );
        }
      });
    }, options);

    animatedHeadingRefs.forEach((ref) => {
      observer3.observe(ref.current);
    });

    animatedImgRefs.forEach((ref) => {
      observer2.observe(ref.current);
    });

    animatedCardRefs.forEach((ref) => {
      observer1.observe(ref.current);
    });

    animatedDivRefs.forEach((ref) => {
      observer.observe(ref.current);
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
      <div className={styles.HS2MainContainer}>
        <div className={styles.HS2ContentContainer}>
          <div className={styles.HS2Heading} ref={animatedDivRefs[0]}>
            <p>Our Services</p> <hr className={styles.HS3ContentLine1} />
            <hr className={styles.HS3ContentLine2} />
          </div>
        </div>
        <div className={styles.HS2SubHeadContainer}>
          <h2 className={`${styles.HS2SubHeading}`} ref={animatedDivRefs[1]}>
            Everything your business needs under one roof
          </h2>
          <div className={styles.HS2Button}>
            <Zbutton
              onClick={handleButtonClick}
              text="See All"
              color="white"
              backgroundColor="#FF9700"
              width="172px"
              height="55px"
              whiteShaddow={true}
              showIcon={false}
              // margin="0px 0px 10px 0px"
              icon={
                <ArrowCircleRightOutlinedIcon
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "-32px",
                    marginTop: "1px",
                  }}
                />
              }
            />
          </div>
        </div>
        <div className={styles.HS2CardsContainer}>
          {cardData.map((item, index) => {
            return (
              <>
                <div className={styles.HS2CardMob} key={`${index}${item.key}`}>
                  <div
                    className={`${styles.HS2Card} ${styles.HS2CardUnSelected}`}
                    key={item.key}
                    ref={animatedCardRefs[index]}
                  >
                    <div>
                      <Image
                        src={item.image}
                        alt="zweidevs"
                        className={styles.HS2SelectedImgWhite}
                        ref={animatedImgRefs[index]}
                        width={80}
                        height={80}
                      />
                    </div>
                    <h3
                      className={styles.HS2CardHeading}
                      ref={animatedHeadingRefs[index]}
                    >
                      {item.heading}
                    </h3>
                    <p className={styles.HS2CardDetails}>{item.details}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomeSection2;
