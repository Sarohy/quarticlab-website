import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import BottomBorderButton from "@component/Components/CommonComponents/BottomBorderButton";
import Project1_Image1 from "../../../../public/assets/HomeIcons/Project/Project1_image1.svg";
import Project2_Image1 from "../../../../public/assets/HomeIcons/Project/Project2_image1.svg";
import Project3_Image1 from "../../../../public/assets/HomeIcons/Project/Project3_image1.svg";
import Project4_Image1 from "../../../../public/assets/HomeIcons/Project/Project4_image1.svg";
import Project5_Image1 from "../../../../public/assets/HomeIcons/Project/Project5_image1.svg";
import Project6_Image1 from "../../../../public/assets/HomeIcons/Project/Project6_image1.svg";
import styles from "./HomeSection4.module.css";

function HomeSection4() {
  const router = useRouter();
  const animatedDivRefs = Array.from({ length: 1 }, () => React.useRef(null));
  const animatedCardRefs = Array.from({ length: 3 }, () => React.useRef(null));

  const projectData = [
    {
      index: 1,
      image: Project1_Image1,
      title: "Hooked Health",
      content:
        "Hooked Health is a mobile application which enables the users to enjoy a leaner, healthier body through a 15-minute no-equipment workouts ",
      button: (
        <BottomBorderButton
          onClick={() => {
            router.push("/projects");
          }}
          text="Request Demo"
        />
      ),
    },
    {
      index: 2,
      image: Project2_Image1,
      title: "AudioCardio",
      content:
        "AudioCardio is an evidence-based mobile app that delivers inaudible sound therapies designed to maintain and strengthen your hearing while providing relief from tinnitus by stimulating the cells inside your ear",
      button: (
        <BottomBorderButton
          onClick={() => {
            router.push("/projects");
          }}
          text="Request Demo"
        />
      ),
    },
    {
      index: 3,
      image: Project3_Image1,
      title: "Seated",
      content:
        "Seated is a platform which enables the users to Make Reservations at Local Restaurants so that they can earn back on every dollar that the users spend at the restaurant",
      button: (
        <BottomBorderButton
          onClick={() => {
            router.push("/projects");
          }}
          text="Request Demo"
        />
      ),
    },
    {
      index: 4,
      image: Project4_Image1,
      title: "Public Trust",
      content:
        "Public Trust Realty Group is a web-based platform that enables the users to search for a property and buy/rent a property",
      button: (
        <BottomBorderButton
          onClick={() => {
            router.push("/projects");
          }}
          text="Request Demo"
        />
      ),
    },
    {
      index: 5,
      image: Project6_Image1,
      title: "Fresh Tracks",
      content:
        "FreshTracks is a web based portal for the travelers planning to travel across Canada where they can view personalized travel plans.",
      button: (
        <BottomBorderButton
          onClick={() => {
            router.push("/projects");
          }}
          text="Request Demo"
        />
      ),
    },
    {
      index: 6,
      image: Project5_Image1,
      title: "Humanava",
      content:
        "Humanava is a web based Edtech platform, which provides Interactive, highly engaging courses for everyone in an organization.",
      button: (
        <BottomBorderButton
          onClick={() => {
            router.push("/projects");
          }}
          text="Request Demo"
        />
      ),
    },
  ];

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
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
            "animate__zoomIn",
            "animate__delay-0s",
          );
        }
      });
    }, options);

    animatedDivRefs.forEach(ref => {
      observer.observe(ref.current);
    });

    animatedCardRefs.forEach(ref => {
      observer1.observe(ref.current);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className={styles.HS4MainContainer}>
        <div className={styles.HS4ContentSubHeadingContainer}>
          <h2 className={styles.HS4ContentSubHeading} ref={animatedDivRefs[0]}>
            We Have Delivered A Lot Of Projects
          </h2>
          <div>
            <BottomBorderButton
              onClick={() => {
                router.push("/projects");
              }}
              text="Checkout More Projects"
            />
          </div>
        </div>

        <div className={styles.HS4CardContainer}>
          {projectData.map((item, index) => {
            return (
              <Card
                className={styles.HS4Card}
                key={index}
                ref={animatedCardRefs[index]}
              >
                <CardActionArea>
                  <Image
                    alt={item?.title}
                    className={styles.HS4CardImage}
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={item?.image}
                  />
                  <CardContent className={styles.HS4BelowContainer}>
                    <h2 className={styles.HSCardTitle}>{item?.title}</h2>
                    <p className={styles.HS4CardContent}>{item?.content}</p>
                  </CardContent>
                  <div className={styles.cardBtn}>{item?.button}</div>
                </CardActionArea>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomeSection4;
