import { InstantBookingBanner } from "@component/Components/CommonComponents";
import { Review1Icon, Review2Icon } from "@component/assets/reviewIcons";
import {
  BlockchainIcon,
  DevopsIcon,
  UIUXIcon
} from "@component/assets/serviceIcons";
import { addReview } from "@component/firebase/firebaseRequests";
import {
  addProject,
  addService,
  getAllProjects,
  getAllReviews,
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

const reviewDetail = {
  clientDescription:
    "I found Zweidevs Team very professional and hard working. They just didn't only develop my web app but actually guided me as well through different phases. Thank you will definitely use your services again",
  clientId: 9,
  clientImage: Review2Icon,
  clientName: "Client 9",
  clientRating: 5
};

function Services() {
  const handleGetDb = async () => {
    // const projects = await getAllProjects();
    // const services = await getAllServices();

    const reviews = await getAllReviews();
    console.log("reviews ==> ", reviews);
  };

  const handleSetDb = async () => {
    // const response = await addProject(projectDetails);
    // const response = await addService(serviceDetail);
    const response = addReview(reviewDetail);
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
