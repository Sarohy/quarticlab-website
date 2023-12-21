import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const CircularProgress = dynamic(
  () => import("@mui/material/CircularProgress"),
);
import { getAllProjects } from "@component/firebase/firebaseRequests";
const PageBanner = dynamic(
  () => import("@component/Components/CommonComponents/PageBanner"),
  { preload: true },
);
const ProjectCard = dynamic(
  () =>
    import("@component/Components/CommonComponents/ProjectCard/ProjectCard"),
);
import styles from "../../styles/project.module.css";
import Head from "next/head";

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
    const filtered = projects.filter(project =>
      project.projectType.includes("web"),
    );
    setFilteredProjects(filtered);
  };

  const handleMobile = () => {
    setSelected("mobileProjects");
    const filtered = projects.filter(project =>
      project.projectType.includes("mobile"),
    );
    setFilteredProjects(filtered);
  };

  const handleEcommerce = () => {
    setSelected("ecommerceProjects");
    const filtered = projects.filter(project =>
      project.projectType.includes("ecommerce"),
    );
    setFilteredProjects(filtered);
  };

  const requestDemoOnClick = () => {
    window.open("https://calendly.com/request-demo-zweidevs/30min", "_blank");
  };

  useEffect(() => {
    getAllProjects()
      .then(response => {
        setProjects(response);
        setFilteredProjects(response);
      })
      .catch(() => {});
  }, []);

  return (
    <div className={styles.PMTop}>
      <Head>
        <title>Portfolio - Zweidevs IT Projects Showcase</title>
        <meta
          content="Explore Our Portfolio - Witness our successful projects in web development, mobile app creation, blockchain solutions, and more. See how we turn visions into reality through innovative IT service"
          name="description"
        />
      </Head>
      <PageBanner
        description={
          "We've worked cross multiple verticals and a range of services to create engaging and innovative digital experenices."
        }
        heading={"Everything Your Business Needs Under One Roof"}
        title={"Portfolio"}
      />
      <div className={styles.PHeaderWrapper}>
        <div className="worksHeader">
          <h1 className="workHeaderTitle">Projects</h1>
          <div className="workHeaderBtnContainer">
            <button
              className={`workHeaderBtn ${
                selected === "allProjects" ? "workHeaderBtnSelected" : ""
              }`}
              onClick={handleAllProject}
            >
              All Projects
            </button>
            <button
              className={`workHeaderBtn ${
                selected === "webProjects" ? "workHeaderBtnSelected" : ""
              }`}
              onClick={handleWeb}
            >
              Web Applications
            </button>
            <button
              className={`workHeaderBtn ${
                selected === "mobileProjects" ? "workHeaderBtnSelected" : ""
              }`}
              onClick={handleMobile}
            >
              Mobile Applications
            </button>
            <button
              className={`workHeaderBtn ${
                selected === "ecommerceProjects" ? "workHeaderBtnSelected" : ""
              }`}
              onClick={handleEcommerce}
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
                  key={index + project.projectTitle}
                  projectDescription={project.projectDescription}
                  projectImageUrl={project.projectImage}
                  projectTitle={project.projectTitle}
                  requestDemoOnClick={requestDemoOnClick}
                  reverse={index % 2 === 0}
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
