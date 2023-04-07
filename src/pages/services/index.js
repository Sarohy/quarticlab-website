import { InstantBookingBanner } from "@component/Components/CommonComponents";
import { BlockchainIcon, DevopsIcon } from "@component/assets/serviceIcons";
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
    "Blockchain is the backbone Technology of Digital CryptoCurrency BitCoin. A distributed database of records of all transactions.We have a team of Blockchain developers to make the deployment correct.",
  serviceIcon: BlockchainIcon,
  serviceId: 2,
  serviceTitle: "Block Chain"
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
