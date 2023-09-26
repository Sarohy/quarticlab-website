import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import AwsIcon from "../../../../public/assets/projectIcon/awsIcon.svg";
import NodeIcon from "../../../../public/assets/projectIcon/nodejsIcon.svg";
import ReactIcon from "../../../../public/assets/projectIcon/reactIcon.svg";
import RubyIcon from "../../../../public/assets/projectIcon/rorIcon.svg";
const CircularProgress = dynamic(() =>
  import("@mui/material/CircularProgress"),
);
import styles from "./ProjectCard.module.css";

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
            alt="FreshTracks React.js FreshTracks Ruby on Rails FreshTracks AWS Amazon Web Services"
            className="project-image"
            fill="true"
            onLoadingComplete={() => setImageLoading(true)}
            sizes="(max-width: 810px) 100%"
            src={projectImageUrl}
            title="FreshTracks React.js FreshTracks Ruby on Rails FreshTracks AWS Amazon Web Services"
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
            <Image
              alt={`${projectTitle} ReactJs`}
              src={ReactIcon}
              title={`${projectTitle} ReactJs`}
              width={70}
            />
            <Image
              alt={`${projectTitle} NodeJs`}
              src={NodeIcon}
              title={`${projectTitle} NodeJs`}
              width={70}
            />
            <Image
              alt={`${projectTitle} Ruby on Rails`}
              src={RubyIcon}
              title={`${projectTitle} Ruby on Rails`}
              width={70}
            />
            <Image
              alt={`${projectTitle} AWS Amazon Web Service`}
              className={styles.ImageStyle}
              src={AwsIcon}
              title={`${projectTitle} AWS Amazon Web Service`}
              width={40}
            />
          </div>
          <div className={styles.requestBtn} onClick={requestDemoOnClick}>
            <button>REQUEST DEMO</button>
            <svg
              class={styles.svgBtn}
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectCard;
