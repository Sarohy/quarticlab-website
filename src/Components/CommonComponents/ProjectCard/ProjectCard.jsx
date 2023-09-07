/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  RubyIcon,
  AwsIcon,
  NodeIcon,
  ReactIcon,
} from "@component/assets/projectIcon";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { CircularProgress, Divider } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Zbutton from "../ZButton";

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

    const observer = new IntersectionObserver((entries) => {
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

    const observer1 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__zoomInDown",
            "animate__delay-0s"
          );
        }
      });
    }, options);

    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInLeft",
            "animate__delay-0s"
          );
        }
      });
    }, options);

    const observer3 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInRight",
            "animate__delay-0s"
          );
        }
      });
    }, options);

    animatedLabelRef.forEach((ref) => {
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
        style={{ flexDirection: !mobileView && reverse && "row-reverse" }}
        className="project-card-container"
      >
        <div
          className="project-card-left"
          ref={reverse ? animatedImageRightRef : animatedImageRef}
        >
          {!imageLoading && (
            <CircularProgress style={{ position: "absolute" }} />
          )}
          <Image
            sizes="(max-width: 810px) 100%"
            fill="true"
            className="project-image"
            src={projectImageUrl}
            alt={"project-image"}
            onLoadingComplete={() => setImageLoading(true)}
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
            <Image width={70} src={ReactIcon} alt={`${projectTitle} ReactJs`} />
            <Image width={70} src={NodeIcon} alt={`${projectTitle} NodeJs`} />
            <Image
              width={70}
              src={RubyIcon}
              alt={`${projectTitle} Ruby on Rails`}
            />
            <Image
              width={40}
              src={AwsIcon}
              alt={`${projectTitle} AWS Amazon Web Service`}
              style={{ marginTop: "10px" }}
            />
          </div>
          <Zbutton
            onClick={requestDemoOnClick}
            text="Request Demo"
            color="white"
            hoverColor="#ff9700"
            width={170}
            showIcon={false}
            icon={<ArrowCircleRightOutlinedIcon
              style={{
                display: "flex",
                alignItems: "center",
              }}
            />}
          />
        </div>
      </div>
    </>
  );
}

export default ProjectCard;
