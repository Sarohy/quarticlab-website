import {
  AwsIcon,
  NodeIcon,
  ReactIcon,
  RubyIcon,
} from "@component/assets/projectIcon";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Zbutton from "../ZButton";
import styles from "./ProjectCard.css";

function ProjectCard({
  reverse,
  projectImageUrl,
  projectTitle,
  projectDescription,
  requestDemoOnClick,
}) {
  const animatedLabelRef = Array.from({ length: 2 }, () => React.useRef(null));
  const animatedIconRef = React.useRef(null);
  const animatedImageRef = React.useRef(null);
  const animatedImageRightRef = React.useRef(null);
  const [mobileView, setMobileView] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth <= 820
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

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
      <div
        className={`project-card-container ${
          styles.ProjectCardWrapper
            ? !mobileView && reverse && styles.ProjectCardWrapper
            : null
        }`}
      >
        <div
          className="project-card-left"
          ref={reverse ? animatedImageRightRef : animatedImageRef}
        >
          {!imageLoading && (
            <CircularProgress className={styles.CircularProgress} />
          )}
          <Image
            alt={"project-image"}
            className="project-image"
            fill="true"
            onLoadingComplete={() => setImageLoading(true)}
            sizes="(max-width: 810px) 100%"
            src={projectImageUrl}
          />
        </div>
        <div className="project-card-right">
          <h2 className="project-title" ref={animatedLabelRef[0]}>
            {projectTitle}
          </h2>
          <p className="project-description" ref={animatedLabelRef[1]}>
            {projectDescription}
          </p>
          <div className="poject-framework-icons" ref={animatedIconRef}>
            <Image alt={`${projectTitle} ReactJs`} src={ReactIcon} width={70} />
            <Image alt={`${projectTitle} NodeJs`} src={NodeIcon} width={70} />
            <Image
              alt={`${projectTitle} Ruby on Rails`}
              src={RubyIcon}
              width={70}
            />
            <Image
              alt={`${projectTitle} AWS Amazon Web Service`}
              className={styles.ImageStyle}
              src={AwsIcon}
              width={40}
            />
          </div>
          <Zbutton
            className={styles.ZButtonStyle}
            color="white"
            hoverColor="#ff9700"
            icon={<ArrowCircleRightOutlinedIcon />}
            onClick={requestDemoOnClick}
            showIcon={false}
            text="Request Demo"
            width={170}
          />
        </div>
      </div>
    </>
  );
}

export default ProjectCard;
