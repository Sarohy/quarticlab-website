import {
  InstantBookingBanner,
  ServicesCard,
} from "@component/Components/CommonComponents";
import { Review1Icon, Review2Icon } from "@component/assets/reviewIcons";
import {
  BlockchainIcon,
  MobileDevIcon,
  GameDevIcon,
  IOTDevIcon,
  AIDevIcon,
  DevopsIcon,
  UIUXIcon,
  WebDevIcon,
  NodeIcon,
  PythonIcon,
  ReactIcon,
  SQLiteIcon,
  JSIcon,
  SolanaIcon,
  AvalancheIcon,
  EthIcon,
  CardanoIcon,
  AndroidIcon,
  IOSIcon,
  SketchIcon,
  InfinityUXIcon,
  FigmaIcon,
  InVision,
  UnityIcon,
  GameBenchIcon,
  HoudinaIcon,
  BelenderIcon,
  RaspbarryPiIcon,
  ArduinoIcon,
  PyTorch,
  KerasIcon,
  OpenIcon,
  OpenAIIcon,
  AWSIcon,
  AzureIcon,
  googleCloudIcon,
  goDaddyIcon,
} from "@component/assets/serviceIcons";
import { addReview } from "@component/firebase/firebaseRequests";
import {
  addProject,
  addService,
  getAllProjects,
  getAllReviews,
  getAllServices,
} from "@component/firebase/firebaseRequests";
import React from "react";
import Image from "next/image";

const projectDetails = {
  projectCategory: "Salon App",
  projectImage: "https://i.ibb.co/FbGJDsg/Screenshot-at-Apr-07-02-16-25.png",
  projectId: 3,
  projectName: "You Media Pvt.",
};

const serviceDetail = {
  serviceDescription:
    "The UI/UX Design brings a design-centric approach to user interface and user experience.Our team is trained to solve problems and provide innovative solutions by following an entire process of UI/UX development.",
  serviceIcon: UIUXIcon,
  serviceId: 3,
  serviceTitle: "UI/UX Design",
};

const reviewDetail = {
  clientDescription:
    "I found Zweidevs Team very professional and hard working. They just didn't only develop my web app but actually guided me as well through different phases. Thank you will definitely use your services again",
  clientId: 9,
  clientImage: Review2Icon,
  clientName: "Client 9",
  clientRating: 5,
};

function Services() {
  const cardData = [
    {
      cardIcon: WebDevIcon,
      cardIconTitle: { firstLine: "Website", secondLine: "Development" },
      cardTitle: "Website Development",
      cardDetails: `We are your creative web development team, who aim to leverage the
      latest technological advances with thoughtful design and serious
      engineering to build tailored solutions for our clients.`,
      footerTitle: "Tools & Technologies",
      footerImages: [NodeIcon, PythonIcon, ReactIcon, SQLiteIcon, JSIcon],
    },
    {
      cardIcon: BlockchainIcon,
      cardIconTitle: { firstLine: "Blockchain", secondLine: "Development" },
      cardTitle: "Blockchain Development",
      cardDetails: `Blockchain is the backbone Technology of Digital CryptoCurrency BitCoin. A distributed database of records of all transactions. We have a team of Blockchain developers to make the deployment correct.`,
      footerTitle: "Tools & Technologies",
      footerImages: [SolanaIcon, AvalancheIcon, EthIcon, CardanoIcon],
    },
    {
      cardIcon: MobileDevIcon,
      cardIconTitle: { firstLine: "Mobile", secondLine: "Development" },
      cardTitle: "Mobile App Development",
      cardDetails: `We develop sleek looking native and hybrid mobile apps for iOS & Android to ensure the customer satisfaction and performance at the core.`,
      footerTitle: "Tools & Technologies",
      footerImages: [AndroidIcon, IOSIcon, ReactIcon, SQLiteIcon, JSIcon],
    },
    {
      cardIcon: UIUXIcon,
      cardIconTitle: { firstLine: "UI UX", secondLine: "Development" },
      cardTitle: "UI/UX Development",
      cardDetails: `The UI/UX Design brings a design-centric approach to user interface and user experience. Our team is trained to solve problems and provide innovative solutions by following an entire process of UI/UX development.`,
      footerTitle: "Tools & Technologies",
      footerImages: [SketchIcon, FigmaIcon, InVision, InfinityUXIcon],
    },
    {
      cardIcon: GameDevIcon,
      cardIconTitle: { firstLine: "Game", secondLine: "Development" },
      cardTitle: "Game Development",
      cardDetails: `With our team of expert game developers, we can transform your idea into a striking game that makes the audience want to play. We have the resources to develop games for multiple platforms using different advanced Technologies.`,
      footerTitle: "Tools & Technologies",
      footerImages: [UnityIcon, GameBenchIcon, HoudinaIcon, BelenderIcon],
    },
    {
      cardIcon: IOTDevIcon,
      cardIconTitle: { firstLine: "IOT", secondLine: "Devices" },
      cardTitle: "IOT Devices",
      cardDetails: `We are experts in building embedded systems with integrated sensors, and wired and wireless communication with mobile and web apps.`,
      footerTitle: "Tools & Technologies",
      footerImages: [RaspbarryPiIcon, ArduinoIcon],
    },
    {
      cardIcon: AIDevIcon,
      cardIconTitle: {
        firstLine: "Artificial Intelligence &",
        secondLine: "Machine Learning",
      },
      cardTitle: "Artificial Intelligence & Machine Learning",
      cardDetails: `We provide services to augment your existing platforms and solutions with the power of computer vision, data visualizations, predictive analysis and more.`,
      footerTitle: "Tools & Technologies",
      footerImages: [PyTorch, KerasIcon, OpenIcon, OpenAIIcon],
    },
    {
      cardIcon: DevopsIcon,
      cardIconTitle: { firstLine: "DevOps &", secondLine: "Cloud Services" },
      cardTitle: "DevOps & Cloud Services",
      cardDetails: `We possess deep knowledge and extensive experience with cloud services. Shorten time to develop and launch new solutions, modernize legacy technology or test and deploy prototypes with IaaS-based applications on Amazon Web Services, Digital Ocean, Heroku, Microsoft Azure or Google Cloud.`,
      footerTitle: "Tools & Technologies",
      footerImages: [AWSIcon, AzureIcon, googleCloudIcon, goDaddyIcon],
    },
  ];
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
    <div className="services-root">
      <span className="services-header">
        {" "}
        Our Services --
        {/* <span className="services-hr"></span>{" "} */}
      </span>
      <ServicesCard cardData={cardData} />
      <InstantBookingBanner />
    </div>
  );
}

export default Services;
