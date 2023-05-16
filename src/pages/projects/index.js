import ProjectCard from "@component/Components/CommonComponents/ProjectCard/ProjectCard";
import {
  addProject,
  getAllProjects
} from "@component/firebase/firebaseRequests";
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
    const filtered = projects.filter(project =>
      project.projectType.includes("web")
    );
    setFilteredProjects(filtered);
  };
  const handleMobile = () => {
    setSelected("mobileProjects");
    const filtered = projects.filter(project =>
      project.projectType.includes("mobile")
    );
    setFilteredProjects(filtered);
  };
  const handleEcommerce = () => {
    setSelected("ecommerceProjects");
    const filtered = projects.filter(project =>
      project.projectType.includes("ecommerce")
    );
    setFilteredProjects(filtered);
  };

  useEffect(() => {
    getAllProjects()
      .then(response => {
        setProjects(response);
        setFilteredProjects(response);
      })
      .catch(error => console.log("Error ==> ", error));
  }, []);
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 20
      }}
    >
      <div className="worksHeader">
        <h1 className="workHeaderTitle">Projects</h1>
        <div className="workHeaderBtnContainer">
          <button
            onClick={handleAllProject}
            className={`workHeaderBtn ${selected === "allProjects"
              ? "workHeaderBtnSelected"
              : ""}`}
          >
            All Projects
          </button>
          <button
            onClick={handleWeb}
            className={`workHeaderBtn ${selected === "webProjects"
              ? "workHeaderBtnSelected"
              : ""}`}
          >
            Web Applications
          </button>
          <button
            onClick={handleMobile}
            className={`workHeaderBtn ${selected === "mobileProjects"
              ? "workHeaderBtnSelected"
              : ""}`}
          >
            Mobile Applications
          </button>
          <button
            onClick={handleEcommerce}
            className={`workHeaderBtn ${selected === "ecommerceProjects"
              ? "workHeaderBtnSelected"
              : ""}`}
          >
            Ecommerce
          </button>
        </div>
      </div>
      <div className="projects-container">
        {filteredProjects.map((project, index) =>
          <ProjectCard
            projectTitle={project.projectTitle}
            projectDescription={project.projectDescription}
            projectImageUrl={project.projectImage}
            reverse={index % 2 === 0}
            key={index + project.projectTitle}
          />
        )}
      </div>
    </div>
  );
}
export default Work;

// const data = [
//     {
//       projectTitle: "BroadHead",
//       projectDescription:
//         "Broadhead is a web based platform that enables users to track Stocks, Options, Forex and Crypto. Users can also communicate by chatting with one another in order to discuss Market related news and updates",
//       projectUrl: "https://google.com",
//       projectImage:
//         "https://firebasestorage.googleapis.com/v0/b/zweidevs-website.appspot.com/o/Projects%2Fbroadhead.jpg?alt=media&token=43c1140a-70a4-44c5-86d2-6974eafe307f",
//       projectType: ["web"]
//     },
//     {
//       projectTitle: "Ander",
//       projectDescription:
//         "Ander is a platform that reimagines the way you deliver experiences to the people",
//       projectUrl: "https://google.com",
//       projectImage:
//         "https://firebasestorage.googleapis.com/v0/b/zweidevs-website.appspot.com/o/Projects%2Fander.jpg?alt=media&token=b2e27845-2289-4319-a88f-f2e8d6110f2f",
//       projectType: ["web"]
//     },
//     {
//       projectTitle: "Hooked Health",
//       projectDescription:
//         "Hooked Health is a mobile application which enables the users to enjoy a leaner, healthier body through a 15-minute no-equipment workouts",
//       projectUrl: "https://google.com",
//       projectImage:
//         "https://firebasestorage.googleapis.com/v0/b/zweidevs-website.appspot.com/o/Projects%2Fhookedhealth.jpg?alt=media&token=e5143cd3-fa2b-4938-8221-862f689b72c6",
//       projectType: ["mobile"]
//     },
//     {
//       projectTitle: "Packet Taxi",
//       projectDescription:
//         "Package Taxi provides logistics service for corporate shipments, by providing a fast and safe solution with motor courier and vehicle courier facilities, sending all shipments on the same day or at the time of reservation",
//       projectUrl: "https://google.com",
//       projectImage:
//         "https://firebasestorage.googleapis.com/v0/b/zweidevs-website.appspot.com/o/Projects%2Fpackettaxi.jpg?alt=media&token=14f9e631-9ca5-4ae9-8a2a-75a1b027b4ca",
//       projectType: ["ecommerce"]
//     },
//     {
//       projectTitle: "Seated",
//       projectDescription:
//         "Seated is a platform which enables the users to Make Reservations at Local Restaurants so that they can earn back on every dollar that the users spend at the restaurant",
//       projectUrl: "https://google.com",
//       projectImage:
//         "https://firebasestorage.googleapis.com/v0/b/zweidevs-website.appspot.com/o/Projects%2Fseated.jpg?alt=media&token=7791f45b-39f4-4868-8556-235e8473a7de",
//       projectType: ["ecommerce"]
//     },
//     {
//       projectTitle: "Public Trust Realty Group",
//       projectDescription:
//         "Public Trust Realty Group is a web-based platform that enables the users to search for a property and buy/rent a property",
//       projectUrl: "https://google.com",
//       projectImage:
//         "https://firebasestorage.googleapis.com/v0/b/zweidevs-website.appspot.com/o/Projects%2Fpublictrustreality.jpg?alt=media&token=7a9b949f-4589-4989-b81e-4bdfc1c61250",
//       projectType: ["web"]
//     },
//     {
//       projectTitle: "Audio Cardio",
//       projectDescription:
//         "AudioCardio is an evidence-based mobile app that delivers inaudible sound therapies designed to maintain and strengthen your hearing while providing relief from tinnitus by stimulating the cells inside your ear",
//       projectUrl: "https://google.com",
//       projectImage:
//         "https://firebasestorage.googleapis.com/v0/b/zweidevs-website.appspot.com/o/Projects%2Faudiocardio.jpg?alt=media&token=3a6c0a0b-1567-405d-9cae-10efab0eec6e",
//       projectType: ["mobile"]
//     },
//     {
//       projectTitle: "Ovonhome",
//       projectDescription:
//         "Ovonhome is a web based platform for IoT based water heaters which provides Smart water heating solutions for homes and offices",
//       projectUrl: "https://google.com",
//       projectImage:
//         "https://firebasestorage.googleapis.com/v0/b/zweidevs-website.appspot.com/o/Projects%2Fovonhome.jpg?alt=media&token=cba5ce7a-f2d3-4288-802d-9f0b82b4b4f9",
//       projectType: ["web"]
//     },
//     {
//       projectTitle: "Humanava",
//       projectDescription:
//         "Humanava is a web based Edtech platform, which provides Interactive, highly engaging courses for everyone in an organization.",
//       projectUrl: "https://google.com",
//       projectImage:
//         "https://firebasestorage.googleapis.com/v0/b/zweidevs-website.appspot.com/o/Projects%2Fhumanava.jpg?alt=media&token=dbccd5d8-7aa6-4925-b919-2e4f2c00059d",
//       projectType: ["web"]
//     },
//     {
//       projectTitle: "Cryptolinx",
//       projectDescription:
//         "Cryptolinx is a web based portal where the users can place all of their social media links under one screen, and can share it with their friends",
//       projectUrl: "https://google.com",
//       projectImage:
//         "https://firebasestorage.googleapis.com/v0/b/zweidevs-website.appspot.com/o/Projects%2Fcryptolinx.jpg?alt=media&token=c8c900d8-e797-4314-9d6f-eb535c7374ae",
//       projectType: ["web"]
//     },
//     {
//       projectTitle: "FreshTracks",
//       projectDescription:
//         "FreshTracks is a web based portal for the travelers planning to travel across Canada where they can view personalized travel plans.",
//       projectUrl: "https://google.com",
//       projectImage:
//         "https://firebasestorage.googleapis.com/v0/b/zweidevs-website.appspot.com/o/Projects%2Fcryptolinx.jpg?alt=media&token=c8c900d8-e797-4314-9d6f-eb535c7374ae",
//       projectType: ["web"]
//     },
//     {
//       projectTitle: "The Daily Stakes",
//       projectDescription:
//         "The Daily Stakes is a web application that is used for Sports Betting, by effectively helping the players to get an edge against the books with the help of Analytics",
//       projectUrl: "https://google.com",
//       projectImage:
//         "https://firebasestorage.googleapis.com/v0/b/zweidevs-website.appspot.com/o/Projects%2Fdailystakes.jpg?alt=media&token=ce4bb68a-7818-411a-83a9-eade2a5172d8",
//       projectType: ["web"]
//     },
//     {
//       projectTitle: "Cyber Legends",
//       projectDescription:
//         "Cyber Legends is an EdTech platform on a mission to help parents and educators raise safe children in a digital world, with proper gamification learning and parental checks  which encourages the children to learn more",
//       projectUrl: "https://google.com",
//       projectImage:
//         "https://firebasestorage.googleapis.com/v0/b/zweidevs-website.appspot.com/o/Projects%2Fcyberlegends.jpg?alt=media&token=004f3e3e-1c72-4390-a660-e1a7f0a276f2",
//       projectType: ["web"]
//     }
//   ];
