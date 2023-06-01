import ProjectCard from "@component/Components/CommonComponents/ProjectCard/ProjectCard";
import {
  addProject,
  getAllProjects,
} from "@component/firebase/firebaseRequests";
import PageBanner from "@component/Components/CommonComponents/PageBanner";

import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

function Work() {
  const [selected, setSelected] = useState("allProjects");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const handleAllProject = () => {
    setSelected("allProjects");
    setFilteredProjects(projects);
  };

  const handleWeb = () => {
    setSelected("webProjects");
    const filtered = projects.filter((project) =>
      project.projectType.includes("web")
    );
    setFilteredProjects(filtered);
  };

  const handleMobile = () => {
    setSelected("mobileProjects");
    const filtered = projects.filter((project) =>
      project.projectType.includes("mobile")
    );
    setFilteredProjects(filtered);
  };

  const handleEcommerce = () => {
    setSelected("ecommerceProjects");
    const filtered = projects.filter((project) =>
      project.projectType.includes("ecommerce")
    );
    setFilteredProjects(filtered);
  };

  const requestDemoOnClick = () => {
    window.open("https://calendly.com/request-demo-zweidevs/30min", "_blank");
  };

  useEffect(() => {
    getAllProjects()
      .then((response) => {
        setProjects(response);
        setFilteredProjects(response);
      })
      .catch((error) => console.log("Error ==> ", error));
  }, []);

  return (
    <div style={{marginTop:"15vh"}}>
      <PageBanner
        title={"Portfolio"}
        heading={"Everything Your Business Needs Under One Roof"}
        description={
          "We've worked cross multiple verticals and a range of services to create engaging and innovative digital experenices."
        }
      />
      <div
        style={{
          backgroundColor: "white",
          padding: 20,
          paddingLeft: "40px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div className="worksHeader">
          <h1 className="workHeaderTitle">Projects</h1>
          <div className="workHeaderBtnContainer">
            <button
              onClick={handleAllProject}
              className={`workHeaderBtn ${
                selected === "allProjects" ? "workHeaderBtnSelected" : ""
              }`}
            >
              All Projects
            </button>
            <button
              onClick={handleWeb}
              className={`workHeaderBtn ${
                selected === "webProjects" ? "workHeaderBtnSelected" : ""
              }`}
            >
              Web Applications
            </button>
            <button
              onClick={handleMobile}
              className={`workHeaderBtn ${
                selected === "mobileProjects" ? "workHeaderBtnSelected" : ""
              }`}
            >
              Mobile Applications
            </button>
            <button
              onClick={handleEcommerce}
              className={`workHeaderBtn ${
                selected === "ecommerceProjects" ? "workHeaderBtnSelected" : ""
              }`}
            >
              Ecommerce
            </button>
          </div>
        </div>
        <div className="projects-container">
          {filteredProjects.length == 0 ? (
            <div className="workProgress">
              <CircularProgress />
            </div>
          ) : (
            <>
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  projectTitle={project.projectTitle}
                  projectDescription={project.projectDescription}
                  projectImageUrl={project.projectImage}
                  reverse={index % 2 === 0}
                  key={index + project.projectTitle}
                  requestDemoOnClick={requestDemoOnClick}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Work;
