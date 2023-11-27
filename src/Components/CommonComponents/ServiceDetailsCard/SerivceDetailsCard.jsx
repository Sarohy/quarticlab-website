import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import RightOrangeSVG from "../../../../public/assets/serviceIcons/rightOrangeSVG.svg";
import TopOrangeSVG from "../../../../public/assets/serviceIcons/topOrangeSVG.svg";
import TopOrangeSVGMobile from "../../../../public/assets/serviceIcons/topOrangeSVGMobile.svg";
const CircularProgress = dynamic(() =>
  import("@mui/material/CircularProgress"),
);
import { useMediaQuery } from "@mui/material";
import styles from "./serviceDetailsCard.module.css";

function ServiceDetailsCard({
  reverse,
  projectImageUrl,
  projectTitle,
  projectDescription,
  requestDemoOnClick,
}) {
  const isMobile = useMediaQuery("(max-width: 576px)");
  const animatedLabelRef = Array.from({ length: 2 }, () => React.useRef(null));
  const animatedIconRef = React.useRef(null);
  const animatedImageRef = React.useRef(null);
  const animatedImageRightRef = React.useRef(null);
  // const [mobileView, setMobileView] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  // useEffect(() => {
  //   const setResponsiveness = () => {
  //     return window.innerWidth <= 820
  //       ? setMobileView(true)
  //       : setMobileView(false);
  //   };
  //   setResponsiveness();
  //   window.addEventListener("resize", () => setResponsiveness());
  //   return () => {
  //     window.removeEventListener("resize", () => setResponsiveness());
  //   };
  // }, []);

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
            "animate__zoomIn",
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
            "animate__zoomInDown",
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
            "animate__backInLeft",
            "animate__delay-0s",
          );
        }
      });
    }, options);

    const observer3 = new IntersectionObserver(entries => {
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

    animatedLabelRef.forEach(ref => {
      observer.observe(ref.current);
    });

    if (animatedIconRef.current) {
      observer1.observe(animatedIconRef.current);
    }

    if (animatedImageRef.current) {
      observer2.observe(animatedImageRef.current);
    }

    if (animatedImageRightRef.current) {
      observer3.observe(animatedImageRightRef.current);
    }

    return () => {
      observer.disconnect();
      observer1.disconnect();
      observer2.disconnect();
      observer3.disconnect();
    };
  }, []);

  return (
    <>
      <div className={`project-card-container ${styles.ProjectCardWrapper}`}>
        <div
          className={`${styles.projectCardLeft} ${styles.imgContainer}`}
          ref={reverse ? animatedImageRightRef : animatedImageRef}
        >
          {!imageLoading && (
            <CircularProgress className={styles.CircularProgress} />
          )}
          <div className={styles.bgImgContainer}>
            <Image
              alt="orange svg"
              className={styles.bgImg}
              fill
              src={RightOrangeSVG}
            />
          </div>
          <div className={styles.bgTopImgContainer}>
            <Image
              alt="orange top svg"
              className={styles.bgTopImg}
              fill
              src={isMobile ? TopOrangeSVGMobile : TopOrangeSVG}
            />
          </div>
          <div className={styles.infoCardImgContainer}>
            <Image
              alt="FreshTracks React.js FreshTracks Ruby on Rails FreshTracks AWS Amazon Web Services"
              className={styles.infoCardImg}
              fill
              onLoadingComplete={() => setImageLoading(true)}
              src={projectImageUrl}
              title="FreshTracks React.js FreshTracks Ruby on Rails FreshTracks AWS Amazon Web Services"
            />
          </div>
        </div>
        <div className={` ${styles.projectCardContainer} ${styles.infoCard}`}>
          <div>
            <h2 className={styles.projectTitle} ref={animatedLabelRef[0]}>
              {projectTitle}
            </h2>
            <p className={styles.projectDesc} ref={animatedLabelRef[1]}>
              {projectDescription}
            </p>
            <button className={styles.requestBtn} onClick={requestDemoOnClick}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceDetailsCard;
