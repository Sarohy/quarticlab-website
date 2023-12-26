import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const CircularProgress = dynamic(
  () => import("@mui/material/CircularProgress"),
);
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

import aivst from "../../../public/assets/projectsPage/aivst.png";
import audioCardio from "../../../public/assets/projectsPage/audio-cardio.png";
import avail from "../../../public/assets/projectsPage/Avail.png";
import hookedhealth from "../../../public/assets/projectsPage/hookedhealth.png";
import cyberLegends from "../../../public/assets/projectsPage/cyberLegends.png";
import humanana from "../../../public/assets/projectsPage/humanana.png";
import freshTrack from "../../../public/assets/projectsPage/freshTrack.png";
import blockcircle from "../../../public/assets/projectsPage/blockcircle.png";
import edcite from "../../../public/assets/projectsPage/edcite.png";
import neverleft from "../../../public/assets/projectsPage/neverleft.png";
import officersurvay from "../../../public/assets/projectsPage/officersurvay.png";
import pridepals from "../../../public/assets/projectsPage/pridepals.png";
import RobobeeBot from "../../../public/assets/projectsPage/RobobeeBot.png";
import trademimic from "../../../public/assets/projectsPage/trademimic.png";
import twinciti from "../../../public/assets/projectsPage/twinciti.png";
import venueGenie from "../../../public/assets/projectsPage/venueGenie.png";
import yousolan from "../../../public/assets/projectsPage/you-solan.png";
// import travel from "../../../public/assets/projectsPage/travel.png";
// import oraamazinigoral from "../../../public/assets/projectsPage/ora-amazinig-oral.png";
// import warmfulvally from "../../../public/assets/projectsPage/warmfulvally.png";
// import domotics from "../../../public/assets/projectsPage/domotics.png";
// import estateBlock from "../../../public/assets/projectsPage/EstateBlock.png";
// import furnico from "../../../public/assets/projectsPage/furnico.png";
// import gnizzel from "../../../public/assets/projectsPage/gnizzel.png";
// import cryproFinance from "../../../public/assets/projectsPage/cryproFinance.png";
// import mino from "../../../public/assets/projectsPage/mino.png";

function Work() {
  const [selected, setSelected] = useState("allProjects");
  const projects = [
    {
      projectImage: aivst,
      projectTitle: "AI VST",
      projectType: ["ai"],
      projectDescription:
        "Enhance your audio recordings with advanced Plugins and Visual Studio tools, for professional-grade sound quality.",
    },

    {
      projectImage: twinciti,
      projectTitle: "TwinCiti",
      projectType: ["ai"],
      projectDescription:
        "TwinCiti provides a scalable infrastructure capable of supporting advanced applications ranging from 3D graphics to machine learning.",
    },
    {
      projectImage: RobobeeBot,
      projectTitle: "RoboBee Bot",
      projectType: ["ai"],
      projectDescription:
        "Communicate easily with Robobee Bot, your AI conversation partner who can converse via text, graphics, examples, and more. It makes every interaction simple and unique.",
    },

    //mobo
    {
      projectImage: neverleft,
      projectTitle: "Neverleft",
      projectType: ["mobile"],
      projectDescription:
        "A more efficient method for managing venue operations that incorporates data analytics, enhanced event ticketing, and digital cloakroom ticketing.",
    },

    {
      projectImage: yousolan,
      projectTitle: "You Salon",
      projectType: ["mobile"],
      projectDescription:
        "You Salon offers online booking based on ratings and popularity, with salon history.",
    },

    {
      projectImage: hookedhealth,
      projectTitle: "Hooked Health",
      projectType: ["mobile"],
      projectDescription:
        "Discover a fitness and mindset training program designed for women to achieve metabolic advantage. Target specific body parts for faster results.",
    },
    {
      projectImage: audioCardio,
      projectTitle: "AudioCardio",
      projectType: ["mobile"],
      projectDescription:
        "Improve your hearing with the mobile app AudioCardio, which provides inaudible sound therapy to improve hearing and reduce tinnitus.",
    },
    //web
    {
      projectImage: cyberLegends,
      projectTitle: "Cyber Legends",
      projectType: ["web"],
      projectDescription:
        "Online learning platform for cyber security awareness in children with interactive tools for kids, parents, and educators.",
    },
    {
      projectImage: edcite,
      projectTitle: "Edcite",
      projectType: ["web"],
      projectDescription:
        "Revolutionizing K–12 education with interactive lessons, addressing online test challenges, and promoting instant student feedback.",
    },
    {
      projectImage: officersurvay,
      projectTitle: "Officer Survey",
      projectType: ["web"],
      projectDescription:
        "Building safer communities through tech-driven communication and surveys between people and law enforcement.",
    },
    {
      projectImage: blockcircle,
      projectTitle: "Blockcircle",
      projectType: ["web"],
      projectDescription:
        "Blockcircle provides competitive data, tools, and dynamic investing analytics to make well-informed decisions in the cryptocurrency market.",
    },
    {
      projectImage: avail,
      projectTitle: "Avail Medical",
      projectType: ["web"],
      projectDescription:
        "A website to stream Canada's medical marijuana program, offering online shopping experiences for diverse services and product options.",
    },
    {
      projectImage: trademimic,
      projectTitle: "Isynced (Trademimic)",
      projectType: ["web"],
      projectDescription:
        "The market's most affordable copy trading solution, optimizing earnings, minimizing risk, and delivering an unparalleled user experience.",
    },
    {
      projectImage:
        "https://firebasestorage.googleapis.com/v0/b/zweidevs-website.appspot.com/o/Projects%2Fovonhome.jpg?alt=media&token=cba5ce7a-f2d3-4288-802d-9f0b82b4b4f9",
      projectTitle: "Public Trust",
      projectType: ["web"],
      projectDescription:
        "Real estate platform for residential and commercial transactions including short sales, foreclosures, and leases, with US, Canada, and Puerto Rico referral network.",
    },
    {
      projectImage: freshTrack,
      projectTitle: "Fresh Track Canada",
      projectType: ["web"],
      projectDescription:
        "Vancouver team since '96, personalized your vacations showcasing Canada's diverse experiences and passion for travel.",
    },

    {
      projectImage: humanana,
      projectTitle: "Humanava",
      projectType: ["web"],
      projectDescription:
        "Unleash your potential with personal development courses for a brighter future, and connect globally to discover hidden brilliance.",
    },

    {
      projectImage: pridepals,
      projectTitle: "LinkTree",
      projectType: ["web"],
      projectDescription:
        "Elevate manageability by consolidating your online presence seamlessly linking videos, music, podcasts, websites, social platforms, and more.",
    },
    {
      projectImage: venueGenie,
      projectTitle: "Venue Genie",
      projectType: ["web"],
      projectDescription:
        "Discover the future of event booking with over 360 locations, catering, and DJ packages, ensuring flawless experiences for gatherings.",
    },
  ];
  // const [projects, setProjects ] = useState([]);
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
    setSelected("aiProjects");
    const filtered = projects.filter(project =>
      project.projectType.includes("ai"),
    );
    setFilteredProjects(filtered);
  };

  const requestDemoOnClick = () => {
    window.open("https://calendly.com/request-demo-zweidevs/30min", "_blank");
  };

  useEffect(() => {
    setFilteredProjects(projects);
    // getAllProjects()
    //   .then(response => {
    //     setProjects(response);
    //     console.log("res ====== ", response);
    //   })
    //   .catch(() => {});
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
              AI & ML
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
