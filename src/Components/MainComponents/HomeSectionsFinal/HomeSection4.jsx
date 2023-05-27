import React, { useEffect, useState } from "react";
import { Zbutton } from "@component/Components/CommonComponents";
import styles from "./HomeSection.module.css";
import {
  Project1_Image1,
  Project2_Image1,
  Project3_Image1,
} from "@component/assets/HomeIcons";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Image from "next/image";

function HomeSection4() {
  const router = useRouter();
  const animatedDivRefs = Array.from({ length: 2 }, () => React.useRef(null));
  const animatedCardRefs = Array.from({ length: 3 }, () => React.useRef(null));
  const [startIndex, setStartIndex] = useState(1);
  const [projectArray, setProjectArray] = useState([
    {
      index: 1,
      image: Project1_Image1,
      title: "Hooked Health",
      content:
        "Hooked Health is a mobile application which enables the users to enjoy a leaner, healthier body through a 15-minute no-equipment workouts ",
    },
    {
      index: 2,
      image: Project2_Image1,
      title: "AudioCardio",
      content:
        "AudioCardio is an evidence-based mobile app that delivers inaudible sound therapies designed to maintain and strengthen your hearing while providing relief from tinnitus by stimulating the cells inside your ear",
    },
    {
      index: 3,
      image: Project3_Image1,
      title: "Seated",
      content:
        "Seated is a platform which enables the users to Make Reservations at Local Restaurants so that they can earn back on every dollar that the users spend at the restaurant",
    },
  ]);

  const projectData = [
    {
      index: 1,
      image: Project1_Image1,
      title: "Hooked Health",
      content:
        "Hooked Health is a mobile application which enables the users to enjoy a leaner, healthier body through a 15-minute no-equipment workouts ",
    },
    {
      index: 2,
      image: Project2_Image1,
      title: "AudioCardio",
      content:
        "AudioCardio is an evidence-based mobile app that delivers inaudible sound therapies designed to maintain and strengthen your hearing while providing relief from tinnitus by stimulating the cells inside your ear",
    },
    {
      index: 3,
      image: Project3_Image1,
      title: "Seated",
      content:
        "Seated is a platform which enables the users to Make Reservations at Local Restaurants so that they can earn back on every dollar that the users spend at the restaurant",
    },
    {
      index: 4,
      image: Project1_Image1,
      title: "Seated",
      content:
        "Seated is a platform which enables the users to Make Reservations at Local Restaurants so that they can earn back on every dollar that the users spend at the restaurant",
    },
    {
      index: 5,
      image: Project2_Image1,
      title: "Packet Taxi",
      content:
        "Package Taxi provides logistics service for corporate shipments, by providing a fast and safe solution with motor courier and vehicle courier facilities, sending all shipments on the same day or at the time of reservation",
    },
    {
      index: 6,
      image: Project3_Image1,
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

    const observer1 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__zoomIn",
            "animate__delay-0s"
          );
        }
      });
    }, options);

    animatedDivRefs.forEach((ref) => {
      observer.observe(ref.current);
    });

    animatedCardRefs.forEach((ref) => {
      observer1.observe(ref.current);
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

        <div className={styles.HS4ContentSubHeadingContainer}>
          <h2 className={styles.HS4ContentSubHeading} ref={animatedDivRefs[1]}>
            We Have Delivered A Lot Of Projects
          </h2>
          <div>
            <Zbutton
              onClick={() => {
                router.push("/projects");
              }}
              text="Checkout More Projects"
              color="orange"
              backgroundColor="#F9F9F9"
              width="305px"
              greyShaddow={true}
              showIcon={false}
            />
          </div>
        </div>

        <div className={styles.HS4CardContainer}>
          {projectArray.map((item, index) => {
            return (
              <Card
                className={styles.HS4Card}
                key={index}
                ref={animatedCardRefs[index]}
              >
                <CardActionArea>
                  <Image
                    src={item.image}
                    alt={item.image}
                    className={styles.HS4CardImage}
                  />
                  <CardContent>
                    <h2 className={styles.HSCardTitle}>{item.title}</h2>
                    <p className={styles.HS4CardContent}>{item.content}</p>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </div>
        <div className={styles.HS4CardArrowsContainer}>
          <div className={styles.HS4CardArrowContainer}>
            <div className={styles.HS4CardArrow} onClick={onClickLeftArrow}>
              <NavigateBeforeIcon />
            </div>
            <div className={styles.HS4CardArrow} onClick={onClickRightArrow}>
              <NavigateNextIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeSection4;
