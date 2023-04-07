import { InstantBookingBanner } from "@component/Components/CommonComponents";
import { BlockchainIcon, DevopsIcon, UIUXIcon } from "@component/assets/serviceIcons";
import {
  addProject,
  addService,
  getAllProjects,
  getAllServices
} from "@component/firebase/firebaseRequests";
import React from "react";

const projectDetails = {
  projectCategory: "Salon App",
  projectImage: "https://i.ibb.co/FbGJDsg/Screenshot-at-Apr-07-02-16-25.png",
  projectId: 3,
  projectName: "You Media Pvt."
};

const serviceDetail = {
  serviceDescription:
    "The UI/UX Design brings a design-centric approach to user interface and user experience.Our team is trained to solve problems and provide innovative solutions by following an entire process of UI/UX development.",
  serviceIcon: UIUXIcon,
  serviceId: 3,
  serviceTitle: "UI/UX Design"
};

function Services() {
  const handleGetDb = async () => {
    // const projects = await getAllProjects();

    const services = await getAllServices();
    console.log("services ==> ", services);
  };

  const handleSetDb = async () => {
    // const response = await addProject(projectDetails);
    const response = await addService(serviceDetail)
  };
  return (
    <div>
      <button onClick={() => handleGetDb()}> Get DB</button>
      <button onClick={() => handleSetDb()}> Set DB</button>
      <InstantBookingBanner />
    </div>
  );
}

export default Services;
