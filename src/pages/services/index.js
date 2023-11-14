import Image from "next/image";
import dynamic from "next/dynamic";
import DashGroupIcon from "../../../public/assets/dashGroup.svg";
const ServicesCard = dynamic(() =>
  import("@component/Components/CommonComponents/ServicesCard"),
);
import AIDevIcon from "../../../public/assets/serviceIcons/AIDevIcon.svg";
import AndroidIcon from "../../../public/assets/serviceIcons/androidIcon.svg";
import ArduinoIcon from "../../../public/assets/serviceIcons/arduinoIcon.svg";
import AvalancheIcon from "../../../public/assets/serviceIcons/avalancheIcon.svg";
import AWSIcon from "../../../public/assets/serviceIcons/AWS.svg";
import AzureIcon from "../../../public/assets/serviceIcons/AzureIcon.svg";
import BelenderIcon from "../../../public/assets/serviceIcons/blender.svg";
import BlockchainIcon from "../../../public/assets/serviceIcons/blockchainIcon.svg";
import CardanoIcon from "../../../public/assets/serviceIcons/cardanoIcon.svg";
import DevopsIcon from "../../../public/assets/serviceIcons/devopsIcon.svg";
import EthIcon from "../../../public/assets/serviceIcons/ethIcon.svg";
import FigmaIcon from "../../../public/assets/serviceIcons/figmaIcon.svg";
import GameBenchIcon from "../../../public/assets/serviceIcons/gameBenchIcon.svg";
import GameDevIcon from "../../../public/assets/serviceIcons/GameDevIcon.svg";
import goDaddyIcon from "../../../public/assets/serviceIcons/goDaddyIcon.svg";
import googleCloudIcon from "../../../public/assets/serviceIcons/googlecloudIcon.svg";
import HoudinaIcon from "../../../public/assets/serviceIcons/houdinaIcon.svg";
import InfinityUXIcon from "../../../public/assets/serviceIcons/infinityUXIcon.svg";
import InVision from "../../../public/assets/serviceIcons/inVision.svg";
import IOSIcon from "../../../public/assets/serviceIcons/iOSIcon.svg";
import IOTDevIcon from "../../../public/assets/serviceIcons/IOTIcon.svg";
import JSIcon from "../../../public/assets/serviceIcons/JS.svg";
import KerasIcon from "../../../public/assets/serviceIcons/kerasIcon.svg";
import MobileDevIcon from "../../../public/assets/serviceIcons/MobDevIcon.svg";
import NodeIcon from "../../../public/assets/serviceIcons/node.svg";
import OpenAIIcon from "../../../public/assets/serviceIcons/openAIIcon.svg";
import OpenIcon from "../../../public/assets/serviceIcons/openIcon.svg";
import PythonIcon from "../../../public/assets/serviceIcons/py.svg";
import PyTorch from "../../../public/assets/serviceIcons/pyTorch.svg";
import RaspbarryPiIcon from "../../../public/assets/serviceIcons/raspbarryPiIcon.svg";
import ReactIcon from "../../../public/assets/serviceIcons/react.svg";
import SketchIcon from "../../../public/assets/serviceIcons/sketch.svg";
import SolanaIcon from "../../../public/assets/serviceIcons/solanaIcon.svg";
import SQLiteIcon from "../../../public/assets/serviceIcons/SQLite.svg";
import WebDevIcon from "../../../public/assets/serviceIcons/webdevIcon.svg";
import UnityIcon from "../../../public/assets/serviceIcons/unityIcon.svg";
import UIUXIcon from "../../../public/assets/serviceIcons/uiuxIcon.svg";
const PageBanner = dynamic(
  () => import("@component/Components/CommonComponents/PageBanner"),
  { preload: true },
);
import "animate.css";
import styles from "../../styles/services.module.css";
import Head from "next/head";

function Services() {
  // Services card data
  const cardData = [
    {
      cardIcon: WebDevIcon,
      cardIconTitle: { firstLine: "Website", secondLine: "Development" },
      cardTitle: "Website Development",
      cardDetails: `We are a creative web development team, who aim to leverage the
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
      cardDetails: `With our team of expert game developers, we can transform your idea into a striking game that makes the audience want to play. We have the resources to develop games for multiple platforms using different advanced technologies.`,
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

  return (
    <div className={`services-root  ${styles.SMTop}`}>
      <Head>
        <title>
          IT Services - Web Development, Blockchain, AI, and More | Zweidevs
        </title>
        <meta
          content="Our Comprehensive IT Services - Unleash the potential of your business with our expertise in web and mobile app development, blockchain, AI, IoT, and more. Elevate your digital presence with Zweidevs"
          name="description"
        />
      </Head>
      <PageBanner
        description={
          "Zweidevs is a professional marketing agency that strives to enhance your marketing journey through creative ideas, innovation, and unwavering determination. We leverage cutting-edge technology and robust business strategies to cater to the specific needs of your company in this digital era."
        }
        heading={"Everything Your Business Needs Under One Roof"}
        title={"Services"}
      />
      <div className="servicesHeaderContainer">
        <p className="services-header">Our Services</p>

        <Image
          alt={"dash-icon"}
          className={styles.SPLeft}
          src={DashGroupIcon}
          title="Zweidevs | Custome Software Development Services Company"
        />
      </div>
      <ServicesCard cardData={cardData} />
    </div>
  );
}

export default Services;
