import Image from "next/image";
import dynamic from "next/dynamic";
import DashGroupIcon from "../../../public/assets/dashGroup.svg";
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
import GoDaddyIcon from "../../../public/assets/serviceIcons/goDaddyIcon.svg";
import GoogleCloudIcon from "../../../public/assets/serviceIcons/googlecloudIcon.svg";
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
import PostgresIcon from "../../../public/assets/serviceIcons/postgres.svg";
// import IonicIcon from "../../../public/assets/serviceIcons/ionic.svg";
import Ionic2Icon from "../../../public/assets/serviceIcons/ionic2.svg";
// import FlutterIcon from "../../../public/assets/serviceIcons/flutter.svg";
// import FlutterIcon from "/assets/serviceIcons/flutter.svg";
import RorIcon from "../../../public/assets/serviceIcons/ror.svg";
import NustIcon from "../../../public/assets/serviceIcons/nest.svg";
import NextIcon from "../../../public/assets/serviceIcons/next.svg";
import NuxtIcon from "../../../public/assets/serviceIcons/tri2.svg";
import AngularIcon from "../../../public/assets/serviceIcons/angular.svg";
import DigitaloceanIcon from "../../../public/assets/serviceIcons/digitalocean.svg";
import HerokuIcon from "../../../public/assets/serviceIcons/heroku.svg";
import VercelIcon from "../../../public/assets/serviceIcons/vercel.svg";
import FigpeaIcon from "../../../public/assets/serviceIcons/figpea.svg";
import XdIcon from "../../../public/assets/serviceIcons/xd.svg";
import CanvaIcon from "../../../public/assets/serviceIcons/canva.svg";
import HyperledgerIcon from "../../../public/assets/serviceIcons/hyperledger.svg";
import PolygonIcon from "../../../public/assets/serviceIcons/polygon.svg";
import Flutter from "../../../public/assets/serviceIcons/Flutter.svg";

const ServicesCard = dynamic(() =>
  import("@component/Components/CommonComponents/ServicesCard"),
);

const PageBanner = dynamic(
  () => import("@component/Components/CommonComponents/PageBanner"),
  { preload: true },
);
import "animate.css";
import Head from "next/head";
import styles from "../../styles/services.module.css";
import { urls } from "@component/utils/urls";

function Services() {
  // Services card data
  const cardData = [
    {
      cardIcon: WebDevIcon,
      cardIconTitle: { firstLine: "Web", secondLine: "Development" },
      cardTitle: "Web Development",
      href: urls.services.WebApp.url,
      cardDetails: `We are a creative web development team, who aim to leverage the
      latest technological advances with thoughtful design and serious
      engineering to build tailored solutions for our clients.`,
      footerTitle: "Tools & Technologies",
      footerImages: [
        { image: NodeIcon, title: "Node.js" },
        { image: PythonIcon, title: "Python" },
        { image: ReactIcon, title: "React" },
        { image: SQLiteIcon, title: "SQLite" },
        { image: JSIcon, title: "JavaScript" },
        { image: PostgresIcon, title: "PostgreSQL" },
        { image: Ionic2Icon, title: "Ionic 2" },
        { image: RorIcon, title: "Ruby on Rails" },
        { image: AngularIcon, title: "Angular" },
        { image: NextIcon, title: "Next.js" },
        { image: NustIcon, title: "Nust" },
        { image: NuxtIcon, title: "Nuxt.js" },
      ],
    },
    {
      cardIcon: BlockchainIcon,
      cardIconTitle: { firstLine: "Blockchain", secondLine: "Development" },
      cardTitle: "Blockchain Development",
      href: urls.services.BC.url,
      cardDetails: `Blockchain is the backbone Technology of Digital CryptoCurrency BitCoin. A distributed database of records of all transactions. We have a team of Blockchain developers to make the deployment correct.`,
      footerTitle: "Tools & Technologies",
      footerImages: [
        { image: SolanaIcon, title: "Solana" },
        { image: AvalancheIcon, title: "Avalanche" },
        { image: EthIcon, title: "Ethereum" },
        { image: CardanoIcon, title: "Cardano" },
        { image: HyperledgerIcon, title: "Hyperledger" },
        { image: PolygonIcon, title: "Polygon" },
      ],
    },
    {
      cardIcon: MobileDevIcon,
      cardIconTitle: { firstLine: "Mobile", secondLine: "Development" },
      cardTitle: "Mobile App Development",
      href: urls.services.MobileApp.url,
      cardDetails: `We develop sleek looking native and hybrid mobile apps for iOS & Android to ensure the customer satisfaction and performance at the core.`,
      footerTitle: "Tools & Technologies",
      footerImages: [
        { image: AndroidIcon, title: "Android" },
        { image: IOSIcon, title: "iOS" },
        { image: ReactIcon, title: "React" },
        { image: SQLiteIcon, title: "SQLite" },
        { image: JSIcon, title: "JavaScript" },
        { image: Ionic2Icon, title: "Ionic 2" },
        { image: Flutter, title: "Flutter" },
      ],
    },
    {
      cardIcon: UIUXIcon,
      cardIconTitle: { firstLine: "UI UX", secondLine: "Development" },
      cardTitle: "UI/UX Development",
      href: urls.services.UIUX.url,
      cardDetails: `The UI/UX Design brings a design-centric approach to user interface and user experience. Our team is trained to solve problems and provide innovative solutions by following an entire process of UI/UX development.`,
      footerTitle: "Tools & Technologies",
      footerImages: [
        { image: SketchIcon, title: "Sketch" },
        { image: FigmaIcon, title: "Figma" },
        { image: InVision, title: "InVision" },
        { image: InfinityUXIcon, title: "Infinity UX" },
        { image: FigpeaIcon, title: "Figpea" },
        { image: XdIcon, title: "Adobe XD" },
        { image: CanvaIcon, title: "Canva" },
      ],
    },
    {
      cardIcon: GameDevIcon,
      cardIconTitle: { firstLine: "Game", secondLine: "Development" },
      cardTitle: "Game Development",
      href: urls.services.GD.url,
      cardDetails: `With our team of expert game developers, we can transform your idea into a striking game that makes the audience want to play. We have the resources to develop games for multiple platforms using different advanced technologies.`,
      footerTitle: "Tools & Technologies",
      footerImages: [
        { image: UnityIcon, title: "Unity" },
        { image: GameBenchIcon, title: "GameBench" },
        { image: HoudinaIcon, title: "Houdini" },
        { image: BelenderIcon, title: "Blender" },
      ],
    },
    {
      cardIcon: IOTDevIcon,
      cardIconTitle: { firstLine: "IOT", secondLine: "Devices" },
      cardTitle: "IOT Devices",
      href: urls.services.IoT.url,
      cardDetails: `We are experts in building embedded systems with integrated sensors, and wired and wireless communication with mobile and web apps.`,
      footerTitle: "Tools & Technologies",
      footerImages: [
        { image: RaspbarryPiIcon, title: "Raspberry Pi" },
        { image: ArduinoIcon, title: "Arduino" },
      ],
    },
    {
      cardIcon: AIDevIcon,
      cardIconTitle: {
        firstLine: "Artificial Intelligence &",
        secondLine: "Machine Learning",
      },
      cardTitle: "Artificial Intelligence & Machine Learning",
      href: urls.services.AI.url,
      cardDetails: `We provide services to augment your existing platforms and solutions with the power of computer vision, data visualizations, predictive analysis and more.`,
      footerTitle: "Tools & Technologies",
      footerImages: [
        { image: PyTorch, title: "PyTorch" },
        { image: KerasIcon, title: "Keras" },
        { image: OpenIcon, title: "OpenCV" },
        { image: OpenAIIcon, title: "OpenAI" },
      ],
    },
    {
      cardIcon: DevopsIcon,
      cardIconTitle: { firstLine: "DevOps &", secondLine: "Cloud Services" },
      cardTitle: "DevOps & Cloud Services",
      href: urls.services.DevOPS.url,
      cardDetails: `We possess deep knowledge and extensive experience with cloud services. Shorten time to develop and launch new solutions, modernize legacy technology or test and deploy prototypes with IaaS-based applications on Amazon Web Services, Digital Ocean, Heroku, Microsoft Azure or Google Cloud.`,
      footerTitle: "Tools & Technologies",
      footerImages: [
        { image: AWSIcon, title: "AWS" },
        { image: AzureIcon, title: "Azure" },
        { image: GoogleCloudIcon, title: "Google Cloud" },
        { image: GoDaddyIcon, title: "GoDaddy" },
        { image: DigitaloceanIcon, title: "DigitalOcean" },
        { image: VercelIcon, title: "Vercel" },
        { image: HerokuIcon, title: "Heroku" },
      ],
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
