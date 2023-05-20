import React, { useEffect, useState } from "react";
import { Zbutton } from "@component/Components/CommonComponents";
import styles from "./HomeSection.module.css";
import {
  Project1_Image1,
  Project1_Image2,
  Project1_Image3,
  Project2_Image1,
  Project2_Image2,
  Project2_Image3,
  Project3_Image1,
  Project3_Image2,
  Project3_Image3,
  Project4_Image1,
  Project4_Image2,
  Project4_Image3,
  Project5_Image1,
  Project5_Image2,
  Project5_Image3,
  Project6_Image1,
  Project6_Image2,
  Project6_Image3,
} from "@component/assets/HomeIcons";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

function HomeSection4() {
  const animatedDivRefs = Array.from({ length: 2 }, () => React.useRef(null));
  const [startIndex, setStartIndex] = useState(1);
  const [projectArray, setProjectArray] = useState([
    {
      index: 1,
      img1: Project1_Image1,
      img2: Project1_Image2,
      img3: Project1_Image3,
      title: "Cryptolinx",
      content:
        "Cryptolinx is a web based portal where the users can place all of their social media links under one screen, and can share it with their friends",
    },
    {
      index: 2,
      img1: Project2_Image1,
      img2: Project2_Image2,
      img3: Project2_Image3,
      title: "Cyber Legends",
      content:
        "Cyber Legends is an EdTech platform on a mission to help parents and educators raise safe children in a digital world, with proper gamification learning and parental checks which encourages the children to learn more",
    },
    {
      index: 3,
      img1: Project3_Image1,
      img2: Project3_Image2,
      img3: Project3_Image3,
      title: "The Daily Stakes",
      content:
        "The Daily Stakes is a web application that is used for Sports Betting, by effectively helping the players to get an edge against the books with the help of Analytics",
    },
  ]);

  const projectData = [
    {
      index: 1,
      img1: Project1_Image1,
      img2: Project1_Image2,
      img3: Project1_Image3,
      title: "Cryptolinx",
      content:
        "Cryptolinx is a web based portal where the users can place all of their social media links under one screen, and can share it with their friends",
    },
    {
      index: 2,
      img1: Project2_Image1,
      img2: Project2_Image2,
      img3: Project2_Image3,
      title: "Cyber Legends",
      content:
        "Cyber Legends is an EdTech platform on a mission to help parents and educators raise safe children in a digital world, with proper gamification learning and parental checks which encourages the children to learn more",
    },
    {
      index: 3,
      img1: Project3_Image1,
      img2: Project3_Image2,
      img3: Project3_Image3,
      title: "The Daily Stakes",
      content:
        "The Daily Stakes is a web application that is used for Sports Betting, by effectively helping the players to get an edge against the books with the help of Analytics",
    },
    {
      index: 4,
      img1: Project4_Image1,
      img2: Project4_Image2,
      img3: Project4_Image3,
      title: "Seated",
      content:
        "Seated is a platform which enables the users to Make Reservations at Local Restaurants so that they can earn back on every dollar that the users spend at the restaurant",
    },
    {
      index: 5,
      img1: Project5_Image1,
      img2: Project5_Image2,
      img3: Project5_Image3,
      title: "Packet Taxi",
      content:
        "Package Taxi provides logistics service for corporate shipments, by providing a fast and safe solution with motor courier and vehicle courier facilities, sending all shipments on the same day or at the time of reservation",
    },
    {
      index: 6,
      img1: Project6_Image1,
      img2: Project6_Image2,
      img3: Project6_Image3,
      title: "Ovonhome",
      content:
        "Ovonhome is a web based platform for IoT based water heaters which provides Smart water heating solutions for homes and offices",
    },
  ];

  const onClickLeftArrow = () => {
    if (startIndex == 0) setStartIndex(3);
    else setStartIndex(startIndex - 1);
    let dataArr = [];
    for (let index = startIndex; index < startIndex + 3; index++) {
      dataArr.push(projectData[index]);
    }
    setProjectArray(dataArr);
  };

  const onClickRightArrow = () => {
    if (startIndex == 3) setStartIndex(0);
    else setStartIndex(startIndex + 1);
    let dataArr = [];
    for (let index = startIndex; index < startIndex + 3; index++) {
      dataArr.push(projectData[index]);
    }
    setProjectArray(dataArr);
  };

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

    animatedDivRefs.forEach((ref) => {
      observer.observe(ref.current);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className={styles.HS4MainContainer}>
        <div
          className={styles.HS4ContentHeadingContainer}
          ref={animatedDivRefs[0]}
        >
          <div className={styles.HS4Heading}>
            <p>Our Experiences</p> <hr className={styles.HS3ContentLine1} />
            <hr className={styles.HS3ContentLine2} />
          </div>
        </div>
        <h2 className={styles.HS4SubHeading} ref={animatedDivRefs[1]}>
          We`ve Done Lot`s Of Awesome Projects
        </h2>

        <div className={styles.HSCardContainer}>
          {projectArray.map((item, index) => {
            return (
              <>
                {index == 0 ? (
                  <div
                    style={{
                      backgroundImage: `url("${item.img1.src}")`,
                    }}
                    className={`${styles.HS4CardContainer} ${styles.HS4CardOdd}`}
                  >
                    <div className={styles.HS4CardDataContainer}>
                      <div className={styles.HS4ContentHeading}>
                        {item.title}
                      </div>
                      <div className={styles.HS4ContentSubHeading}>
                        {item.content}
                      </div>
                      <div className={styles.HS4ContentSubHeading}>
                        Django | React
                      </div>
                    </div>
                  </div>
                ) : index == 1 ? (
                  <div
                    style={{
                      backgroundImage: `url("${item.img2.src}")`,
                    }}
                    className={`${styles.HS4CardContainer} ${styles.HS4CardEven}`}
                  >
                    <div className={styles.HS4CardDataContainer}>
                      <div className={styles.HS4ContentHeading}>
                        {item.title}
                      </div>
                      <div className={styles.HS4ContentSubHeading}>
                        {item.content}
                      </div>
                      <div className={styles.HS4ContentSubHeading}>
                        Django | React
                      </div>
                      <div>
                        <Zbutton
                          onClick={() => {
                            window.open(
                              "https://calendly.com/request-demo-zweidevs/30min",
                              "_blank"
                            );
                          }}
                          text="Request Demo"
                          color="#ff9700"
                          backgroundColor="white"
                          width="198px"
                          height="48px"
                          orangeShaddow={true}
                          showIcon={false}
                          icon={
                            <ArrowCircleRightOutlinedIcon
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginLeft: "-20px",
                              }}
                            />
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      backgroundImage: `url("${item.img3.src}")`,
                    }}
                    className={`${styles.HS4CardContainer} ${styles.HS4CardOdd}`}
                  >
                    <div className={styles.HS4CardDataContainer}>
                      <div className={styles.HS4ContentHeading}>
                        {item.title}
                      </div>
                      <div className={styles.HS4ContentSubHeading}>
                        {item.content}
                      </div>
                      <div className={styles.HS4ContentSubHeading}>
                        Django | React
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>

        <div className={styles.HS4ArrowContainer}>
          <ArrowCircleLeftOutlinedIcon
            style={{
              width: "30px",
              height: "30px",
              color: "#FF9700",
              marginRight: "10px",
            }}
            onClick={onClickLeftArrow}
          />
          <ArrowCircleRightOutlinedIcon
            style={{ width: "30px", height: "30px", color: "#FF9700" }}
            onClick={onClickRightArrow}
          />
        </div>
      </div>
    </>
  );
}

export default HomeSection4;
