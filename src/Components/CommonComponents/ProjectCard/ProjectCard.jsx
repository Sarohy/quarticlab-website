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

function ProjectCard({
  reverse,
  projectImageUrl,
  projectTitle,
  projectDescription,
  requestDemoOnClick,
}) {
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
  return (
    <>
      <div
        style={{ flexDirection: !mobileView && reverse && "row-reverse" }}
        className="project-card-container"
      >
        <div className="project-card-left">
          {!imageLoading && (
            <CircularProgress style={{ position: "absolute" }} />
          )}
          <Image
            sizes="(max-width: 810px) 100%"
            fill="true"
            className="project-image"
            src={projectImageUrl}
            alt={projectTitle}
            onLoadingComplete={() => setImageLoading(true)}
          />
        </div>
        <div className="project-card-right">
          <h1 className="project-title">{projectTitle}</h1>
          <p className="project-description">{projectDescription}</p>
          <div className="poject-framework-icons">
            <Image width={70} src={ReactIcon} alt="ReactJs" />
            <Image width={70} src={NodeIcon} alt="NodeJs" />
            <Image width={70} src={RubyIcon} alt="Ruby on Rails" />
            <Image
              width={40}
              src={AwsIcon}
              alt="AWS Amazon Web Service"
              style={{ marginTop: "10px" }}
            />
          </div>
          <button onClick={requestDemoOnClick} className="request-demo-btn">
            <span>Request Demo</span>
            <ArrowCircleRightOutlinedIcon />
          </button>
        </div>
      </div>
      <Divider />
    </>
  );
}

export default ProjectCard;
