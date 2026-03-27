import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

/* ── service hero images ────────────────────── */
import WebDevImg from "../../../public/assets/serviceIcons/webdev.jpg";
import BlockchainImg from "../../../public/assets/serviceIcons/bcdev.jpg";
import MobileImg from "../../../public/assets/serviceIcons/mobodev.jpg";
import UIUXImg from "../../../public/assets/serviceIcons/UIUX.jpg";
import GameDevImg from "../../../public/assets/serviceIcons/GD.jpg";
import IoTImg from "../../../public/assets/serviceIcons/iot.png";
import AIImg from "../../../public/assets/serviceIcons/AI.jpg";
import DevOpsImg from "../../../public/assets/serviceIcons/devops.webp";

/* ── offering icons — web ───────────────────── */
import designIcon from "../../../public/assets/serviceIcons/webServicesIcons/design.svg";
import backendIcon from "../../../public/assets/serviceIcons/webServicesIcons/backend.svg";
import ecommerceIcon from "../../../public/assets/serviceIcons/webServicesIcons/ecommerce.svg";
import frontendIcon from "../../../public/assets/serviceIcons/webServicesIcons/frontend.svg";
import fullstackIcon from "../../../public/assets/serviceIcons/webServicesIcons/fullstack.svg";

/* ── offering icons — mobile ────────────────── */
import hybirdMoboIcon from "../../../public/assets/serviceIcons/moboIcons/hybirdMobileIcon.svg";
import mobo2Icon from "../../../public/assets/serviceIcons/moboIcons/mobo2.svg";
import mobo3Icon from "../../../public/assets/serviceIcons/moboIcons/mobo3.svg";

/* ── offering icons — uiux ──────────────────── */
import uiux1Icon from "../../../public/assets/serviceIcons/uiuxIcons/uiux1.svg";
import uiux2Icon from "../../../public/assets/serviceIcons/uiuxIcons/uiux2.svg";
import uiux3Icon from "../../../public/assets/serviceIcons/uiuxIcons/uiux3.svg";
import uiux4Icon from "../../../public/assets/serviceIcons/uiuxIcons/uiux4.svg";
import uiux5Icon from "../../../public/assets/serviceIcons/uiuxIcons/uiux5.svg";

/* ── offering icons — gd ────────────────────── */
import gd1Icon from "../../../public/assets/serviceIcons/gdIcons/gd1.svg";
import gd2Icon from "../../../public/assets/serviceIcons/gdIcons/gd2.svg";
import gd3Icon from "../../../public/assets/serviceIcons/gdIcons/gd3.svg";
import gd4Icon from "../../../public/assets/serviceIcons/gdIcons/gd4.svg";

/* ── offering icons — iot ───────────────────── */
import iot1Icon from "../../../public/assets/serviceIcons/iotIcons/iot1.svg";
import iot2Icon from "../../../public/assets/serviceIcons/iotIcons/iot2.svg";
import iot3Icon from "../../../public/assets/serviceIcons/iotIcons/iot3.svg";
import iot4Icon from "../../../public/assets/serviceIcons/iotIcons/iot4.svg";
import iot5Icon from "../../../public/assets/serviceIcons/iotIcons/iot5.svg";
import iot6Icon from "../../../public/assets/serviceIcons/iotIcons/iot6.svg";
import iot7Icon from "../../../public/assets/serviceIcons/iotIcons/iot7.svg";
import iot8Icon from "../../../public/assets/serviceIcons/iotIcons/iot8.svg";

/* ── offering icons — ai ────────────────────── */
import ai1Icon from "../../../public/assets/serviceIcons/aiIcons/ai1.svg";
import ai2Icon from "../../../public/assets/serviceIcons/aiIcons/ai2.svg";
import ai3Icon from "../../../public/assets/serviceIcons/aiIcons/ai3.svg";
import ai4Icon from "../../../public/assets/serviceIcons/aiIcons/ai4.svg";
import ai5Icon from "../../../public/assets/serviceIcons/aiIcons/ai5.svg";
import ai6Icon from "../../../public/assets/serviceIcons/aiIcons/ai6.svg";

/* ── offering icons — devops ────────────────── */
import dev1Icon from "../../../public/assets/serviceIcons/devOPSIcon/dev1.svg";
import dev2Icon from "../../../public/assets/serviceIcons/devOPSIcon/dev2.svg";
import dev3Icon from "../../../public/assets/serviceIcons/devOPSIcon/dev3.svg";
import dev4Icon from "../../../public/assets/serviceIcons/devOPSIcon/dev4.svg";
import dev5Icon from "../../../public/assets/serviceIcons/devOPSIcon/dev5.svg";
import dev6Icon from "../../../public/assets/serviceIcons/devOPSIcon/dev6.svg";

/* ── offering icons — blockchain ────────────── */
import bc1Icon from "../../../public/assets/serviceIcons/BCIcons/bc1.svg";
import bc2Icon from "../../../public/assets/serviceIcons/BCIcons/bc2.svg";
import bc3Icon from "../../../public/assets/serviceIcons/BCIcons/bc3.svg";
import bc4Icon from "../../../public/assets/serviceIcons/BCIcons/bc4.svg";
import bc5Icon from "../../../public/assets/serviceIcons/BCIcons/bc5.svg";

/* ── project images ─────────────────────────── */
import Web1 from "../../../public/assets/HomeIcons/Project/Web1.png";
import Web2 from "../../../public/assets/HomeIcons/Project/Web2.png";
import Web3 from "../../../public/assets/HomeIcons/Project/Web3.png";
import Web4 from "../../../public/assets/HomeIcons/Project/Web4.png";
import Web5 from "../../../public/assets/HomeIcons/Project/Web5.png";
import Web6 from "../../../public/assets/HomeIcons/Project/Web6.png";
import Web7 from "../../../public/assets/HomeIcons/Project/Project4_image1.svg";
import Web8 from "../../../public/assets/HomeIcons/Project/Project6_image1.svg";
import Web9 from "../../../public/assets/HomeIcons/Project/Project5_image1.svg";
import Web10 from "../../../public/assets/HomeIcons/Project/Web10.png";
import Web11 from "../../../public/assets/HomeIcons/Project/Web11.png";
import Mobo1 from "../../../public/assets/serviceDetailsIcons/moboIcons/mobo1.png";
import Mobo2 from "../../../public/assets/serviceDetailsIcons/moboIcons/mobo2.png";
import Mobo3 from "../../../public/assets/serviceDetailsIcons/moboIcons/mobo3.png";
import Mobo4 from "../../../public/assets/serviceDetailsIcons/moboIcons/mobo4.png";
import GameDev1 from "../../../public/assets/serviceDetailsIcons/gdIcons/g1.png";
import GameDev2 from "../../../public/assets/serviceDetailsIcons/gdIcons/g2.png";
import iotP1 from "../../../public/assets/serviceDetailsIcons/iotIcons/iot1.png";
import iotP2 from "../../../public/assets/serviceDetailsIcons/iotIcons/iot2.png";
import iotP3 from "../../../public/assets/serviceDetailsIcons/iotIcons/iot3.png";
import ai1 from "../../../public/assets/serviceDetailsIcons/aiIcons/ai1.png";
import ai2 from "../../../public/assets/serviceDetailsIcons/aiIcons/ai2.png";
import ai3 from "../../../public/assets/serviceDetailsIcons/aiIcons/ai3.png";
import UiUX1 from "../../../public/assets/serviceDetailsIcons/uiuxIcons/uiux1.png";
import UiUX2 from "../../../public/assets/serviceDetailsIcons/uiuxIcons/uiux2.png";
import UiUX4 from "../../../public/assets/serviceDetailsIcons/uiuxIcons/uiux4.png";
import DevOps1 from "../../../public/assets/serviceDetailsIcons/devOpsIcons/devOps1.png";
import bc1Proj from "../../../public/assets/serviceDetailsIcons/bcIcons/bc1.png";
import bc2Proj from "../../../public/assets/serviceDetailsIcons/bcIcons/bc2.png";

/* ── nav icons for "Other services" ─────────── */
import WebDevIcon from "../../../public/assets/serviceIcons/webdevIcon.svg";
import BlockchainIcon from "../../../public/assets/serviceIcons/blockchainIcon.svg";
import MobileDevIcon from "../../../public/assets/serviceIcons/MobDevIcon.svg";
import UIUXIcon from "../../../public/assets/serviceIcons/uiuxIcon.svg";
import GameDevIcon from "../../../public/assets/serviceIcons/GameDevIcon.svg";
import IOTDevIcon from "../../../public/assets/serviceIcons/IOTIcon.svg";
import AIDevIcon from "../../../public/assets/serviceIcons/AIDevIcon.svg";
import DevopsIcon from "../../../public/assets/serviceIcons/devopsIcon.svg";

import styles from "./servicesNew.module.css";

/* ════════════════════════════════════════════
   ALL SERVICE CONTENT (same data as original)
   ════════════════════════════════════════════ */
const allServices = [
  { slug: "web-development", icon: WebDevIcon, label: "Web Development" },
  { slug: "blockchain-development", icon: BlockchainIcon, label: "Blockchain" },
  { slug: "mobile-app-development", icon: MobileDevIcon, label: "Mobile Apps" },
  { slug: "uiux-development", icon: UIUXIcon, label: "UI/UX Design" },
  { slug: "game-development", icon: GameDevIcon, label: "Game Dev" },
  { slug: "iot-devices", icon: IOTDevIcon, label: "IoT Devices" },
  {
    slug: "artificial-intelligence-machine-learning",
    icon: AIDevIcon,
    label: "AI & ML",
  },
  { slug: "devops-cloud", icon: DevopsIcon, label: "DevOps & Cloud" },
  { slug: "genai-automation", icon: AIDevIcon, label: "GenAI & Automation" },
];

const content = {
  "web-development": {
    category: "Web Development",
    image: WebDevImg,
    heroTitle: "Elevate Your Online Presence",
    heroSub:
      "Transform your ideas into reality with our exceptional web app development services. Our seasoned team crafts tailored solutions that seamlessly blend innovation and functionality.",
    heading: "Custom Web Applications and Dedicated Support for Your Success!",
    description:
      "Our mission is to empower your business with the latest technologies and the best user experience. We create custom web applications that digitize your internal processes and ensure seamless operations. With free maintenance, support services, and automated deployments, we are committed to helping you achieve your goals.\n\nAt Zweidevs, your success is our mission. We're not just developers; we're your partners in the digital realm.",
    offerings: [
      {
        icon: designIcon,
        title: "Experience Design",
        desc: "Zweidevs' careful attention to experience design will improve user interactions. We map user journeys delicately, making sure every touchpoint is enjoyable in addition to being practical.",
      },
      {
        icon: frontendIcon,
        title: "Frontend Development",
        desc: "Zweidevs' full-stack front-end expertise can help you discover innovation. Our developers combine creativity and technological proficiency to create user-friendly interfaces and responsive solutions.",
      },
      {
        icon: backendIcon,
        title: "Backend Development",
        desc: "Our back-end solutions can help you build a strong digital foundation. Our development team creates adaptable and scalable structures, maximizing performance and guaranteeing a smooth front-end integration.",
      },
      {
        icon: fullstackIcon,
        title: "Full Stack Development",
        desc: "Take advantage of Zweidevs' full-stack development services for end-to-end excellence. Our team links front-end and back-end technologies smoothly, from conception to deployment.",
      },
      {
        icon: ecommerceIcon,
        title: "Maintenance and Update",
        desc: "Beyond bug patches, our maintenance and update services include exciting new features and performance improvements. With our continued assistance, you can keep your app at the forefront of innovation.",
      },
    ],
    projects: [
      {
        image: Web1,
        title: "Cyber Legends",
        desc: "Ed-Tech and Gaming platform offering online cyber security learning services.",
      },
      {
        image: Web2,
        title: "Edcite",
        desc: "Revolutionizing K-12 education with an intuitive platform for interactive lessons.",
      },
      {
        image: Web3,
        title: "Officer Survey",
        desc: "Fostering safer societies through a technology-driven community forum.",
      },
      {
        image: Web4,
        title: "Blockcircle",
        desc: "Competitive data and dynamic investing analytics for the cryptocurrency market.",
      },
      {
        image: Web5,
        title: "Avail Medical",
        desc: "Accessible website for traditional and marijuana-based prescriptions in Canada.",
      },
      {
        image: Web6,
        title: "Isynced",
        desc: "The market's most affordable copy trading solution, optimizing earnings.",
      },
      {
        image: Web7,
        title: "Public Trust",
        desc: "Full-service real estate, handling residential and commercial transactions nationwide.",
      },
      {
        image: Web8,
        title: "Fresh Track",
        desc: "Personalized travel itineraries showcasing Canada's breathtaking scenery.",
      },
      {
        image: Web9,
        title: "Humanava",
        desc: "Personal development courses embracing leadership, diversity, and mindfulness.",
      },
      {
        image: Web10,
        title: "LinkTree",
        desc: "Consolidate all aspects of your online presence into a conversion-focused page.",
      },
      {
        image: Web11,
        title: "Venue Genie",
        desc: "Event booking with over 360 locations, catering, and DJ packages.",
      },
    ],
    process: {
      title: "How We Develop Web Applications",
      desc: "Zweidevs manages every stage of the project lifecycle while providing full services for developing web applications.",
      steps: [
        {
          title: "Discovery",
          desc: "We explore the project's concept and define core requirements through in-depth discussions about intended functionality.",
        },
        {
          title: "Design",
          desc: "Our design team creates interactive prototypes and wireframes, prioritizing elegant and sophisticated web design.",
        },
        {
          title: "Development",
          desc: "We adopt Agile methodology, breaking development into manageable sprints — plan, develop, test, document, and release.",
        },
        {
          title: "Release",
          desc: "Quality assurance engineers thoroughly test every feature both manually and automatically before deploying to production.",
        },
        {
          title: "Support",
          desc: "We build software solutions that continuously deliver expected results with post-launch maintenance and support.",
        },
      ],
    },
    audience: {
      title: "We Build Custom Web Applications For",
      desc: "At Zweidevs, we specialize in creating custom online apps carefully designed to match the distinct requirements of companies of all sizes.",
      cards: [
        {
          title: "Startups",
          desc: "Cost-effective, scalable solutions that enable startups to build a strong online presence.",
        },
        {
          title: "Medium Businesses",
          desc: "Solutions that work in unison with mid-sized businesses' complex issues and expansion goals.",
        },
        {
          title: "Large Businesses",
          desc: "Custom web apps that smoothly interface with the complex operations of large companies.",
        },
      ],
    },
    techStack: [
      { group: "Front-end", chips: ["Javascript", "React", "Angular", "Vue"] },
      {
        group: "Back-end",
        chips: [
          "Ruby on Rails",
          "Node.js",
          "Python",
          "PHP",
          "Next JS",
          "Nest JS",
        ],
      },
    ],
    faq: [
      {
        q: "How much does web app development cost?",
        a: "The cost is influenced by complexity, features, technology stack, team experience, and other factors. Connect with our web developers for an exact estimate.",
      },
      {
        q: "What is web app development, and how can it benefit my business?",
        a: "Developing software applications that run on web browsers, offering adaptable and affordable options with cross-platform compatibility.",
      },
      {
        q: "How long does it take to develop a web application?",
        a: "A simple web app might take a few weeks to a couple of months, while more complex applications could take several months or even a year.",
      },
      {
        q: "Why choose Zweidevs for web application development?",
        a: "We craft reliable, approachable solutions that add value and demonstrate our commitment to quality and client happiness.",
      },
      {
        q: "How do you ensure the security of web applications?",
        a: "Through frequent audits, comprehensive code reviews, encryption, least privilege principle, and strong authentication.",
      },
      {
        q: "Do you provide ongoing maintenance after launch?",
        a: "Yes, we provide thorough maintenance services including bug repairs, updates, and optimizations.",
      },
    ],
  },

  "blockchain-development": {
    category: "Blockchain Development",
    image: BlockchainImg,
    heroTitle: "Revolutionize Your Future with Blockchain",
    heroSub:
      "With a focus on innovative uses, we use blockchain technology to reshape markets and establish new benchmarks for openness and trust.",
    heading:
      "Transparent and Decentralized Solutions with Blockchain Development",
    description:
      "Our blockchain application development team specializes in developing unique solutions that smoothly incorporate blockchain technology into your company while maintaining efficiency, security, and transparency.\n\nWhether you're managing the intricacies of healthcare, banking, logistics, or other fields, our blockchain knowledge gives your company the edge it needs to succeed.",
    offerings: [
      {
        icon: bc1Icon,
        title: "Enhanced Security",
        desc: "Our experience will strengthen your operations, guaranteeing data integrity and resistance to changing threats.",
      },
      {
        icon: bc2Icon,
        title: "Greater Transparency",
        desc: "Our blockchain solutions guarantee confidence and accountability in every transaction by offering a decentralized, secure ledger.",
      },
      {
        icon: bc3Icon,
        title: "Automation",
        desc: "Experience workflows that are more efficient because our solutions optimize and automate tasks, requiring less manual intervention.",
      },
      {
        icon: bc4Icon,
        title: "Instant Traceability",
        desc: "Real-time traceability enabling you to monitor each stage of your workflow with an unchangeable record.",
      },
      {
        icon: bc5Icon,
        title: "Increased Efficiency",
        desc: "Gain more productivity as blockchain technology automates tedious chores and streamlines procedures.",
      },
    ],
    projects: [
      {
        image: bc1Proj,
        title: "FinancePro",
        desc: "Blockchain applications for cryptocurrency finance simplifying financial transactions.",
      },
      {
        image: bc2Proj,
        title: "MimoBlock",
        desc: "Decentralized exchange platform doing away with middlemen for peer-to-peer transactions.",
      },
      {
        image: Web4,
        title: "Blockcircle",
        desc: "Competitive data, proprietary tools, and dynamic investing analytics for crypto markets.",
      },
    ],
    process: {
      title: "Blockchain Solutions Lifecycle",
      steps: [
        {
          title: "Experience and Design",
          desc: "We create cutting-edge blockchain solutions specific to your requirements with our wealth of experience.",
        },
        {
          title: "Enterprise Blockchain",
          desc: "We streamline your business processes with enterprise blockchain solutions that improve security and transparency.",
        },
        {
          title: "Blockchain Deployment",
          desc: "Effective deployment of blockchain solutions customized to your specific needs, prioritizing security and scalability.",
        },
        {
          title: "Blockchain Maintenance",
          desc: "Ongoing maintenance including frequent upgrades, security improvements, and bug fixes.",
        },
        {
          title: "Migration and Upgrades",
          desc: "Seamless migrations guaranteeing data integrity and zero interruptions when upgrading systems.",
        },
        {
          title: "Custom Blockchain Development",
          desc: "Custom blockchain app development matched to your business needs exactly.",
        },
      ],
    },
    audience: {
      title: "We Develop Blockchains For",
      desc: "Professional development services for businesses of all sizes to harness the power of blockchain technology.",
      cards: [
        {
          title: "Startups",
          desc: "Custom blockchain solutions that empower your startup's growth with security and effectiveness.",
        },
        {
          title: "Medium Businesses",
          desc: "Blockchain solutions customized for your mid-size business, whether in manufacturing, healthcare, or finance.",
        },
        {
          title: "Large Businesses",
          desc: "Scalable, secure, and innovative blockchain apps essential to the growth of large companies.",
        },
      ],
    },
    techStack: [
      {
        group: "Blockchain",
        chips: ["Solana", "Ethereum", "Cardano", "Avalanche"],
      },
    ],
    faq: [
      {
        q: "How much does Blockchain development cost?",
        a: "The cost varies by several thousand dollars among various industries, influenced by complexity and pricing methods.",
      },
      {
        q: "What is Blockchain development?",
        a: "Technology using a network of computers to create a distributed, decentralized ledger to record transactional data transparently and securely.",
      },
      {
        q: "How long does it take to develop a Solana Blockchain application?",
        a: "Simple applications may take a few weeks, while complex projects with smart contracts may take many months.",
      },
      {
        q: "Why choose Zweidevs for Blockchain development?",
        a: "We specialize in tailored blockchain solutions with a wealth of experience and a track record of successful projects.",
      },
    ],
  },

  "mobile-app-development": {
    category: "Mobile App Development",
    image: MobileImg,
    heroTitle: "Crafted for Excellence",
    heroSub:
      "Zweidevs is your go-to mobile app developer agency, providing tailored mobile app development services to precisely match your company's needs.",
    heading: "Experience The Best Intuitive UI and Responsive Design",
    description:
      "Enter a world of first-rate digital experiences by visiting our Mobile App Development Hub.\n\nDiscover the best user-friendly interface and responsive design, meticulously crafted for seamless interaction. We guarantee not just cost-effective solutions but a commitment to quality that reflects in every pixel.",
    offerings: [
      {
        icon: hybirdMoboIcon,
        title: "Hybrid Mobile App Development",
        desc: "Zweidevs excels in hybrid app development, ensuring a seamless user experience across diverse devices.",
      },
      {
        icon: mobo2Icon,
        title: "Native Mobile App Development",
        desc: "Optimal performance tailored for both iOS and Android platforms, ensuring a superior user interface.",
      },
      {
        icon: mobo3Icon,
        title: "Wearables and Embedded Software",
        desc: "Cutting-edge software for smartwatches, fitness trackers, and other wearable devices.",
      },
    ],
    projects: [
      {
        image: Mobo1,
        title: "Neverleft",
        desc: "Efficient venue operations management with data analytics and digital cloakroom ticketing.",
      },
      {
        image: Mobo2,
        title: "You Salon",
        desc: "Online salon booking with ratings, popularity data, and track record history.",
      },
      {
        image: Mobo3,
        title: "Hooked Health",
        desc: "Fitness and mindset training created just for women to achieve metabolic advantage.",
      },
      {
        image: Mobo4,
        title: "AudioCardio",
        desc: "Evidence-based mobile app providing inaudible sound therapy for hearing improvement.",
      },
    ],
    process: {
      title: "How We Develop Mobile Applications",
      desc: "Zweidevs takes you through every step of your mobile app development journey with a full suite of custom-tailored services.",
      steps: [
        {
          title: "Discovery",
          desc: "We explore your app's concept, define core requirements, and evaluate the viability of your investment.",
        },
        {
          title: "Design",
          desc: "Interactive prototypes, Figma designs and wireframes prioritizing user flow and visual appeal.",
        },
        {
          title: "Development",
          desc: "Agile methodology with iterative sprints — plan, develop, test, and document with user-friendliness as main focus.",
        },
        {
          title: "Release",
          desc: "Thorough manual and automated testing to guarantee flawless operation before deployment.",
        },
        {
          title: "Support & Maintenance",
          desc: "3 months free post-launch maintenance designed to keep your app performing at its best.",
        },
      ],
    },
    audience: {
      title: "We Build Custom Mobile Applications For",
      desc: "Custom mobile applications suited to the distinct requirements of companies of all sizes.",
      cards: [
        {
          title: "Startups",
          desc: "Scalable, cost-effective mobile solutions enabling startups to thrive in the digital environment.",
        },
        {
          title: "Medium Businesses",
          desc: "Solutions addressing complex difficulties and expansion goals of medium-sized companies.",
        },
        {
          title: "Large Businesses",
          desc: "Custom mobile apps working in unison with complex processes of big businesses.",
        },
      ],
    },
    techStack: [
      {
        group: "Mobile",
        chips: ["iOS", "Kotlin", "Dart", "React Native", "Ionic"],
      },
    ],
    faq: [
      {
        q: "How much does mobile app development cost?",
        a: "Influenced by complexity, features, technology stack, and team experience. Connect with our developers for exact estimation.",
      },
      {
        q: "How long does it take to develop a mobile application?",
        a: "A simple app takes weeks to months; complex enterprise-level applications could take several months or a year.",
      },
      {
        q: "What are the differences between native and hybrid development?",
        a: "Native provides high performance with platform-specific features; hybrid uses a single codebase for multiple platforms with faster development.",
      },
      {
        q: "Do you provide maintenance after launch?",
        a: "Yes, we offer 3 months of free maintenance services including bug repairs, updates, and optimizations.",
      },
    ],
  },

  "uiux-development": {
    category: "UI/UX Development",
    image: UIUXImg,
    heroTitle: "Top UI/UX Design Services",
    heroSub:
      "Transform your brand's impact with our UI/UX development services, creating the ultimate interface experience for your customers.",
    heading: "Elevate Your Digital Journey with Zweidevs UI/UX Design",
    description:
      "Start your digital adventure hand-in-hand with Zweidevs, the leading UI/UX Design and Development Services agency.\n\nWe're dedicated to crafting experiences that resonate with you. At Zweidevs, your satisfaction isn't just a checkbox; it's the heartbeat of our design philosophy.",
    offerings: [
      {
        icon: uiux1Icon,
        title: "Complimentary UI/UX for Websites",
        desc: "Free UI/UX design services including Figma, wireframes, and userflows for website development projects.",
      },
      {
        icon: uiux2Icon,
        title: "Personalized Design Solutions",
        desc: "Aesthetic designs tailored to your unique brand identity and goals.",
      },
      {
        icon: uiux3Icon,
        title: "Comprehensive Userflows",
        desc: "Meticulously crafted userflows ensuring an intuitive and engaging user experience.",
      },
      {
        icon: uiux4Icon,
        title: "Dynamic Figma Designs",
        desc: "Visually stunning Figma designs that bring your ideas to life.",
      },
      {
        icon: uiux5Icon,
        title: "Expert Consulting",
        desc: "UX/UI expertise for insightful consulting, guiding strategic decisions to optimize user experiences.",
      },
    ],
    projects: [
      {
        image: UiUX1,
        title: "Paket Taxi",
        desc: "Distribution and transportation services for various products, from restaurant orders to e-commerce deliveries.",
      },
      {
        image: UiUX2,
        title: "Seatedapp",
        desc: "Revolutionizes dining out, offering users a fulfilling experience with points across diverse restaurants.",
      },
      {
        image: Web9,
        title: "Humanava",
        desc: "Personal development courses embracing leadership, diversity, and mindfulness.",
      },
      {
        image: UiUX4,
        title: "CryptoLinx",
        desc: "Simplifies cryptocurrency marketing by integrating announcements into a URL for streamlined communication.",
      },
    ],
    process: {
      title: "How We Craft Memorable UI/UX Designs",
      desc: "Embark on a personalized UI/UX journey with Zweidevs, where every step is tailored to your vision.",
      steps: [
        {
          title: "Discovery",
          desc: "Collaborative conversation understanding your goals and gathering insights.",
        },
        {
          title: "Data-Driven Insights",
          desc: "Leveraging data-driven design thinking to align with your audience's expectations.",
        },
        {
          title: "User-Centric Mapping",
          desc: "Charting the course for intuitive user journeys, mapping entry points, steps, and interactions.",
        },
        {
          title: "Wireframing Magic",
          desc: "Figma wireframes ensuring clarity and simplicity, guiding users effortlessly through each screen.",
        },
        {
          title: "Unified Design System",
          desc: "Meticulous design system of colors, patterns, and fonts maintaining consistency and scalability.",
        },
        {
          title: "UI Testing",
          desc: "Rigorous testing of visual and structural aspects using manual and automated tests for a flawless UI.",
        },
      ],
    },
    audience: {
      title: "UI/UX Design Services For Every Business",
      cards: [
        {
          title: "Small Business Solutions",
          desc: "Agile, cost-effective, and growth-oriented UI/UX design services for small businesses.",
        },
        {
          title: "Medium-Sized Excellence",
          desc: "Tailored solutions striking the balance between scalability and efficiency.",
        },
        {
          title: "Enterprise-Grade Innovation",
          desc: "Solutions engineered to align seamlessly with the complex needs of large businesses.",
        },
      ],
    },
    techStack: [
      {
        group: "UI/UX Design",
        chips: ["Figma", "Canva", "Adobe XD", "InVision"],
      },
    ],
    faq: [
      {
        q: "What if I skip the UI/UX designing step?",
        a: "You risk creating a product that may not resonate with your target audience, resulting in lower user satisfaction and increased bounce rates.",
      },
      {
        q: "Does a UI/UX designer cost a lot?",
        a: "For website projects, we provide complimentary UI/UX design services including Figma, wireframes, and user flows.",
      },
      {
        q: "How do UI/UX design services help businesses?",
        a: "They enhance user satisfaction, engagement, and overall business success by optimizing user experiences.",
      },
      {
        q: "How to choose the right UX/UI design company?",
        a: "Look for relevant experience, check client reviews, explore case studies, and assess their approach to delivering user experience design.",
      },
    ],
  },

  "game-development": {
    category: "Game Development",
    image: GameDevImg,
    heroTitle: "Level Up with Expert Game Development",
    heroSub:
      "Dive into captivating gaming experiences with Zweidevs. We ensure your game not only competes but excels in the dynamic gaming landscape.",
    heading: "Shaping the Gaming Realm",
    description:
      "Zweidevs breathes vitality into your gaming vision through a meticulous game development process. This journey seamlessly integrates creativity with innovation, transforming your ideas into a vibrant reality.",
    offerings: [
      {
        icon: gd1Icon,
        title: "Mobile Games Applications",
        desc: "Captivating mobile gaming experiences with seamless functionality and intuitive user interface.",
      },
      {
        icon: gd2Icon,
        title: "Web Game Applications",
        desc: "Online gaming presence with web applications that exceed industry standards.",
      },
      {
        icon: gd3Icon,
        title: "Blockchain-Based Games",
        desc: "Explore the future of gaming with our expertise in blockchain technology.",
      },
      {
        icon: gd4Icon,
        title: "Game Designing Services",
        desc: "Comprehensive game designing services shaping compelling storylines, characters, and gameplay elements.",
      },
    ],
    projects: [
      {
        image: GameDev1,
        title: "Spin Up",
        desc: "Dynamic word game combining fun and learning for an engaging experience.",
      },
      {
        image: GameDev2,
        title: "Word Lane",
        desc: "Engaging word game crafted to enrich vocabulary and keep your brain active.",
      },
      {
        image: Web1,
        title: "Cyber Legends",
        desc: "Ed-Tech and Gaming platform offering online education services.",
      },
    ],
    process: {
      title: "How We Develop Game Applications",
      desc: "A dynamic, collaborative journey where your vision is at the center.",
      steps: [
        {
          title: "Requirements Gathering",
          desc: "Extensive consultations to understand gaming aspirations with a user-centric approach.",
        },
        {
          title: "Detailed R&D",
          desc: "Market analysis, player persona development, and competitive landscape research.",
        },
        {
          title: "Innovative Development",
          desc: "Iterative prototyping with collaborative design and constant feedback loops.",
        },
        {
          title: "Quality Assurance",
          desc: "Comprehensive testing from unit to user experience testing with post-launch support.",
        },
      ],
    },
    audience: {
      title: "We Build Custom Games For",
      desc: "Creating immersive and tailored game experiences that captivate audiences across various scales.",
      cards: [
        {
          title: "Startups",
          desc: "Tailored solutions that realize your vision, from pixel-perfect graphics to captivating gameplay mechanics.",
        },
        {
          title: "Medium Businesses",
          desc: "Custom-made solutions combining innovation and technology for your growing player population.",
        },
        {
          title: "Large Businesses",
          desc: "Large-scale game worlds with performance optimization and integration of state-of-the-art technologies.",
        },
      ],
    },
    techStack: [
      {
        group: "Mobile & Desktop",
        chips: ["Unity", "Blender", "GameBench", "Houdini"],
      },
    ],
    faq: [
      {
        q: "How much would game development cost?",
        a: "The cost varies based on unique requirements. We provide transparent pricing with flexible packages.",
      },
      {
        q: "Should I go for a mobile game, web app, or website for games?",
        a: "Our experts provide strategic guidance based on your target audience and goals.",
      },
      {
        q: "How much time would game development take?",
        a: "From weeks for simple games to several months for intricate ones with advanced graphics.",
      },
      {
        q: "What if I have a minor idea for a game?",
        a: "Your idea, no matter how minor, holds potential. We specialize in nurturing concepts into world-class games.",
      },
    ],
  },

  "iot-devices": {
    category: "IoT Devices",
    image: IoTImg,
    heroTitle: "Your Gateway to IoT Innovation",
    heroSub:
      "Discover intelligent solutions that transform everyday spaces into smart, responsive environments across various domains.",
    heading: "Empowering Tomorrow's Connectivity with IoT Services",
    description:
      "Our IoT services go above and beyond, providing cutting-edge solutions that transform how you interact with and manage your environment.\n\nZweidevs offers a portal to a connected world, making sure your interactions are simple, clear, and customized to your tastes.",
    offerings: [
      {
        icon: iot1Icon,
        title: "Device Connectivity",
        desc: "Setting up and maintaining connectivity for IoT devices with smooth communication between devices and central systems.",
      },
      {
        icon: iot2Icon,
        title: "Data Management & Analytics",
        desc: "Gathering, handling, and evaluating data from IoT devices to derive significant insights.",
      },
      {
        icon: iot3Icon,
        title: "Security Solutions",
        desc: "Robust security measures to safeguard devices and data with authentication and encryption.",
      },
      {
        icon: iot4Icon,
        title: "IoT Platform Development",
        desc: "Platforms enabling effective management, monitoring, and control of linked devices.",
      },
      {
        icon: iot5Icon,
        title: "Edge Computing",
        desc: "Allocating processing power in closer proximity to the data source to lower latency.",
      },
      {
        icon: iot6Icon,
        title: "Device Management",
        desc: "Comprehensive device management services allowing remote monitoring, management, and updates.",
      },
      {
        icon: iot7Icon,
        title: "Asset Tracking",
        desc: "Real-time asset tracking with customized IoT solutions for vehicles, equipment, and inventory.",
      },
      {
        icon: iot8Icon,
        title: "Environmental Monitoring",
        desc: "Monitoring climate, water quality, and air quality for public health and environmental conservation.",
      },
    ],
    projects: [
      {
        image: iotP1,
        title: "Oven Homes",
        desc: "Control your home's temperature and electronics via smartphone with analytics dashboard.",
      },
      {
        image: iotP2,
        title: "Domotics",
        desc: "Seamless control over appliances such as lighting and thermostats for intelligent living.",
      },
      {
        image: iotP3,
        title: "Zarget Lights",
        desc: "IoT-based application offering intelligent administration of lighting systems.",
      },
    ],
    process: {
      title: "How We Develop IoT Applications",
      desc: "A holistic approach to IoT device development and implementation for optimal results.",
      steps: [
        {
          title: "Consultation & Analysis",
          desc: "We comprehend your unique requirements, company goals, and operational difficulties.",
        },
        {
          title: "Development & Prototyping",
          desc: "Unique IoT devices that meet your needs with working prototypes following industry standards.",
        },
        {
          title: "Integration & Testing",
          desc: "Seamless integration with existing systems and rigorous testing and quality assurance.",
        },
        {
          title: "Deployment & Maintenance",
          desc: "Deployment across your infrastructure with regular maintenance, remote monitoring, and timely updates.",
        },
      ],
    },
    audience: {
      title: "We Build Custom IoT Applications For",
      cards: [
        {
          title: "Small Businesses",
          desc: "Reasonably priced IoT solutions that easily fit into operations, streamlining procedures and customer interaction.",
        },
        {
          title: "Medium-Sized Businesses",
          desc: "IoT services that cater to broader operations and scale with your company.",
        },
        {
          title: "Large Businesses",
          desc: "Sophisticated IoT solutions that scale seamlessly with expansive operations.",
        },
      ],
    },
    techStack: [{ group: "IoT Devices", chips: ["Raspberry Pi", "Arduino"] }],
    faq: [
      {
        q: "What are IoT devices?",
        a: "Physical objects embedded with connectivity features, software, and sensors that exchange data over the internet.",
      },
      {
        q: "How can small businesses benefit from IoT?",
        a: "IoT enhances inventory management, enables remote monitoring, and provides data analytics for informed decision-making.",
      },
      {
        q: "What are some IoT devices?",
        a: "Smart home devices, wearables, industrial sensors, healthcare devices, and smart city solutions.",
      },
      {
        q: "Why choose Zweidevs for IoT?",
        a: "Expertise in embedded systems, security, reliability, thorough testing, and cost-effective solutions.",
      },
    ],
  },

  "artificial-intelligence-machine-learning": {
    category: "Artificial Intelligence & Machine Learning",
    image: AIImg,
    heroTitle: "Elevate Innovation with AI & ML",
    heroSub:
      "Set out on a revolutionary journey where AI and ML are tailored to your company's unique requirements, automating complex tasks and driving data-driven decisions.",
    heading: "Cutting-Edge AI and ML Services",
    description:
      "Welcome to Zweidevs, where our artificial intelligence-driven solutions redefine the boundaries of corporate intelligence and creativity.\n\nOur AI and ML solutions are carefully developed to satisfy the particular requirements of your sector, whether you aim to automate operations or extract valuable insights from your data.",
    offerings: [
      {
        icon: ai1Icon,
        title: "Custom AI and ML Solutions",
        desc: "Specially designed intelligent applications that guarantee a personalized strategy with finely adjusted algorithms.",
      },
      {
        icon: ai2Icon,
        title: "Data Discovery & Augmentation",
        desc: "Predictive analytics and third-party data to gain extensive customer insights.",
      },
      {
        icon: ai3Icon,
        title: "Data Science and Analytics",
        desc: "Convert unprocessed data into useful business knowledge using advanced statistical models.",
      },
      {
        icon: ai4Icon,
        title: "AI-powered Chatbots",
        desc: "Sophisticated chatbots that revolutionize consumer relationships with smooth, customized interactions.",
      },
      {
        icon: ai5Icon,
        title: "AI Integration",
        desc: "Seamlessly integrating AI with your current systems to create an intelligent infrastructure.",
      },
      {
        icon: ai6Icon,
        title: "Data Democratization",
        desc: "Democratize access to insights and cultivate a data-driven culture across your company.",
      },
    ],
    projects: [
      {
        image: ai1,
        title: "AI VST",
        desc: "High-end DAW plugins converting user audio into professional artist-grade sound.",
      },
      {
        image: ai2,
        title: "Twinciti",
        desc: "Robust infrastructure integrating 3D graphics and machine learning for future applications.",
      },
      {
        image: ai3,
        title: "RoboBee Bot",
        desc: "AI conversation partner that communicates via text, graphics, examples, and more.",
      },
    ],
    process: {
      title: "How We Utilize AI in Your Project",
      desc: "Unlock the power of AI and ML with cutting-edge solutions transforming data into insights.",
      steps: [
        {
          title: "Analysis",
          desc: "Reviewing project goals, requirements, evaluating feasibility and extent of AI integration.",
        },
        {
          title: "Data Discovery",
          desc: "Systematically locating and investigating suitable datasets for a strong AI foundation.",
        },
        {
          title: "Modeling",
          desc: "Building powerful AI models using complex algorithms and statistical methodologies.",
        },
        {
          title: "Evaluation & Insights",
          desc: "Evaluating AI models' performance and deriving useful insights for strategic decision-making.",
        },
        {
          title: "AI Solutions",
          desc: "Implementing customized AI systems leveraging cutting-edge models, algorithms, and technology.",
        },
      ],
    },
    audience: {
      title: "We Build Custom AI Applications For",
      cards: [
        {
          title: "Startups",
          desc: "Unique AI solutions addressing specific growth goals with affordable, practical solutions.",
        },
        {
          title: "Medium Businesses",
          desc: "Customized technology increasing productivity and automating procedures for medium-sized companies.",
        },
        {
          title: "Large Businesses",
          desc: "Solutions guaranteeing efficiency, strategic insights, and competitive edge for large organizations.",
        },
      ],
    },
    techStack: [
      { group: "AI & ML", chips: ["OpenAI", "PyTorch", "Keras", "openNN"] },
    ],
    faq: [
      {
        q: "What is AI and how can it benefit my business?",
        a: "AI simulates human intelligence in machines — automating repetitive tasks, providing data-driven insights, and improving client relations.",
      },
      {
        q: "How is ML different from AI?",
        a: "ML focuses on machines learning from data without explicit programming, while AI is a broader term for human-like intelligence in machines.",
      },
      {
        q: "How can businesses implement AI and ML?",
        a: "Establish precise goals, obtain high-quality data, choose suitable algorithms, and work with specialists or AI/ML platforms.",
      },
      {
        q: "What are some real-world AI/ML applications?",
        a: "Healthcare diagnostics, fraud detection, client segmentation, autonomous vehicles, and more across many industries.",
      },
    ],
  },

  "devops-cloud": {
    category: "DevOps & Cloud Services",
    image: DevOpsImg,
    heroTitle: "Effortless Success with DevOps",
    heroSub:
      "Putting DevOps concepts into practice results in more frequent deployments, quicker development cycles, and better software overall.",
    heading: "Automating and Accelerating Your Software Delivery Pipeline",
    description:
      "Software development with our advanced DevOps services makes teamwork easier, automating tasks and delivering software faster than ever.\n\nAt Zweidevs, we're your progress partners. With our smooth and assured DevOps solutions, you can power your success journey and guarantee quality and efficiency at every turn.",
    offerings: [
      {
        icon: dev1Icon,
        title: "DevOps as a Service",
        desc: "Our qualified technical staff manages your software development and deployment processes in the cloud.",
      },
      {
        icon: dev2Icon,
        title: "Infrastructure Transformation",
        desc: "Increased scalability, improved operational efficiency, and unmatched agility in your IT environment.",
      },
      {
        icon: dev3Icon,
        title: "CI/CD Pipelines",
        desc: "Smooth CI/CD pipelines so that your applications can release faster and with greater reliability.",
      },
      {
        icon: dev4Icon,
        title: "Monitoring and Logging",
        desc: "Watchful monitoring and logging solutions giving you knowledge to anticipate and resolve problems proactively.",
      },
      {
        icon: dev5Icon,
        title: "Cloud Infrastructure Management",
        desc: "Scalable cloud infrastructure management utilizing resources and agility of cloud platforms.",
      },
      {
        icon: dev6Icon,
        title: "Security and Compliance",
        desc: "Industry-standard security techniques with state-of-the-art measures for your digital landscape.",
      },
    ],
    projects: [
      {
        image: ai1,
        title: "AI VST",
        desc: "High-end DAW plugins and Visual Studio technology tools for professional-grade sound.",
      },
      {
        image: ai2,
        title: "Twinciti",
        desc: "Robust infrastructure integrating 3D graphics and machine learning.",
      },
      {
        image: DevOps1,
        title: "Gnizzel",
        desc: "Streamlined dental clinic appointments with seamless patient connections.",
      },
    ],
    process: {
      title: "How We Provide DevOps Services",
      desc: "We excel in DevOps, streamlining software delivery with automated pipelines and agile collaboration.",
      steps: [
        {
          title: "Planning",
          desc: "Careful planning in close collaboration with your team, combining objectives with a tailored DevOps roadmap.",
        },
        {
          title: "Continuous Development",
          desc: "Applications constantly evolving, quickly adjusting to new needs and technological developments.",
        },
        {
          title: "Continuous Integration",
          desc: "Strong CI pipelines facilitating seamless code integration and cooperative workflow.",
        },
        {
          title: "Continuous Testing",
          desc: "Quality assurance integrated into every phase with automated testing procedures.",
        },
        {
          title: "Continuous Monitoring",
          desc: "Watchful monitoring technologies to quickly identify and fix problems, preserving peak performance.",
        },
        {
          title: "Continuous Feedback",
          desc: "Transparent communication and frequent feedback loops ensuring flexible development processes.",
        },
      ],
    },
    audience: {
      title: "We Provide DevOps Services For",
      desc: "Adopting state-of-the-art DevOps techniques to shorten project timelines and improve coordination.",
      cards: [
        {
          title: "Startups",
          desc: "CI/CD techniques for quick time-to-market, resource optimization, and lower operating expenses.",
        },
        {
          title: "Medium Businesses",
          desc: "Optimized processes for development, testing, and deployment increasing productivity.",
        },
        {
          title: "Large Businesses",
          desc: "Enterprise-level scalability with automated testing and compliance-aligned governance.",
        },
      ],
    },
    techStack: [
      {
        group: "Infrastructure",
        chips: ["AWS", "Google Cloud Platform", "Heroku", "Docker"],
      },
    ],
    faq: [
      {
        q: "What is DevOps and how can it benefit my business?",
        a: "A collaborative methodology integrating software development and IT operations, optimizing workflows and boosting productivity.",
      },
      {
        q: "How does DevOps consulting improve development lifecycle?",
        a: "By automating procedures, improving communication, and applying CI/CD techniques with DevSecOps for security.",
      },
      {
        q: "Why choose Zweidevs for DevOps?",
        a: "We create cooperative partnerships, promoting open communication, shared accountability, and enthusiasm for your DevOps goals.",
      },
    ],
  },
  "genai-automation": {
    category: "GenAI & Automation",
    image: AIImg,
    heroTitle: "Build AI That Actually Works in Production",
    heroSub:
      "We build production-grade Generative AI apps, autonomous agents, " +
      "and automation pipelines — not demos.",
    heading: "Generative AI, AI Agents, and Automation Built for Your Business",
    description:
      "The future belongs to businesses that deploy AI intelligently. " +
      "Zweidevs builds production-ready Generative AI solutions, " +
      "multi-agent systems, and automation pipelines that eliminate " +
      "bottlenecks and unlock new revenue streams.\n\nFrom fine-tuning " +
      "LLMs on your proprietary data to deploying autonomous AI agents " +
      "that plan and execute complex tasks — we deliver outcomes, not " +
      "prototypes.",
    offerings: [
      {
        icon: ai1Icon,
        title: "Generative AI Applications",
        desc:
          "Custom chatbots, content tools, and intelligent search " +
          "powered by the latest LLMs — built for your domain and " +
          "deployed at scale.",
      },
      {
        icon: ai2Icon,
        title: "Multi-Agent AI Systems",
        desc:
          "Autonomous agents that plan, reason, and execute complex " +
          "multi-step tasks without human intervention.",
      },
      {
        icon: ai3Icon,
        title: "AI Audit & Transformation",
        desc:
          "We audit your existing workflows, identify automation " +
          "opportunities, and build a roadmap to AI-driven operations.",
      },
      {
        icon: ai4Icon,
        title: "MLOps & Model Deployment",
        desc:
          "End-to-end ML pipelines, model versioning, monitoring, and " +
          "CI/CD for AI systems — so your models stay fresh in production.",
      },
      {
        icon: ai5Icon,
        title: "LLM Fine-tuning on Custom Data",
        desc:
          "Fine-tune foundation models on your proprietary datasets to " +
          "create domain-expert AI that outperforms off-the-shelf solutions.",
      },
      {
        icon: ai6Icon,
        title: "Robotic Process Automation (RPA)",
        desc:
          "Eliminate repetitive manual tasks with intelligent RPA bots " +
          "that integrate with your existing tools and workflows.",
      },
    ],
    projects: [
      {
        image: ai1,
        title: "AI VST",
        desc:
          "High-end DAW plugins powered by AI for professional-grade " +
          "sound generation and mixing.",
      },
      {
        image: ai2,
        title: "Twinciti",
        desc:
          "Robust infrastructure integrating 3D graphics, machine " +
          "learning, and AI-driven automation.",
      },
      {
        image: ai3,
        title: "AI Research Platform",
        desc:
          "LLM-powered research assistant enabling semantic search and " +
          "automated report generation.",
      },
    ],
    process: {
      title: "How We Build GenAI Solutions",
      desc:
        "From discovery to deployment, we follow a proven process to " +
        "deliver production-ready AI systems.",
      steps: [
        {
          title: "Discovery & Scoping",
          desc:
            "We map your business processes, identify high-impact " +
            "automation opportunities, and define success metrics.",
        },
        {
          title: "Model Selection & Design",
          desc:
            "We evaluate foundation models, RAG architectures, and " +
            "agent frameworks to select the best fit for your use case.",
        },
        {
          title: "Prototype & Validate",
          desc:
            "Rapid prototyping with real data to validate accuracy, " +
            "latency, and cost before full build-out.",
        },
        {
          title: "Build & Integrate",
          desc:
            "Production-grade development with full integration into " +
            "your existing systems, APIs, and data pipelines.",
        },
        {
          title: "Deploy & Monitor",
          desc:
            "MLOps-driven deployment with real-time monitoring, drift " +
            "detection, and continuous improvement loops.",
        },
      ],
    },
    audience: {
      title: "We Build GenAI Solutions For",
      desc:
        "Whether you're exploring AI for the first time or scaling " +
        "existing models, we meet you where you are.",
      cards: [
        {
          title: "Startups",
          desc:
            "Ship AI-native products fast. We help startups integrate " +
            "LLMs and automation into their core product from day one.",
        },
        {
          title: "Scale-ups",
          desc:
            "Automate repetitive operations, unlock data insights, and " +
            "build AI features that create competitive moats.",
        },
        {
          title: "Enterprises",
          desc:
            "Large-scale AI transformation: fine-tuned models, " +
            "multi-agent systems, and enterprise-grade MLOps infrastructure.",
        },
      ],
    },
    techStack: [
      {
        group: "AI & LLMs",
        chips: ["OpenAI", "LangChain", "LlamaIndex", "Hugging Face"],
      },
      {
        group: "Backend & Infra",
        chips: ["Python", "FastAPI", "TensorFlow", "PyTorch"],
      },
      { group: "Cloud & MLOps", chips: ["AWS", "GCP", "Docker", "Kubernetes"] },
    ],
    faq: [
      {
        q: "What's the difference between GenAI and traditional AI/ML?",
        a:
          "Traditional ML models predict or classify. Generative AI " +
          "creates — text, code, images, decisions. GenAI apps use LLMs " +
          "to understand context and generate intelligent responses.",
      },
      {
        q: "How long does it take to build a production GenAI solution?",
        a:
          "A focused MVP typically takes 4–8 weeks. Complex multi-agent " +
          "systems or fine-tuned models run 3–6 months depending on data " +
          "availability and scope.",
      },
      {
        q: "Can you fine-tune AI models on our proprietary data?",
        a:
          "Yes. We handle data preparation, model selection, fine-tuning, " +
          "evaluation, and deployment — with full ownership of the trained " +
          "model passing to you.",
      },
      {
        q: "How do you ensure the AI outputs are accurate and safe?",
        a:
          "We implement evaluation frameworks, guardrails, " +
          "human-in-the-loop checkpoints, and ongoing monitoring to keep " +
          "your AI aligned with business expectations.",
      },
    ],
  },
};

/* ── reveal hook ────────────────────────────── */
function useReveal() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    refs.current.forEach(el => {
      if (el) {
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  return el => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };
}

/* ═══════════════════════════════════════════
   FAQ ITEM COMPONENT
   ═══════════════════════════════════════════ */
function FaqItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.faqItem}>
      <button className={styles.faqQuestion} onClick={() => setOpen(v => !v)}>
        <span>{item.q}</span>
        <span
          className={`${styles.faqChevron} ${
            open ? styles.faqChevronOpen : ""
          }`}
        >
          ▼
        </span>
      </button>
      <div
        className={`${styles.faqAnswer} ${open ? styles.faqAnswerOpen : ""}`}
      >
        <p className={styles.faqAnswerText}>{item.a}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   INNER CONTENT — receives data, mounts fresh
   per slug so useReveal runs with real refs.
   ═══════════════════════════════════════════ */
function ServiceDetailContent({ data, slug }) {
  const addRef = useReveal();
  const otherServices = allServices.filter(s => s.slug !== slug);

  return (
    <div className={styles.page}>
      <Head>
        <title>{data.category} — Zweidevs</title>
        <meta content={data.heroSub} name="description" />
      </Head>

      {/* ── HERO ───────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>{data.category}</span>
          <h1 className={styles.heroH1}>
            {data.heroTitle.split(" ").slice(0, -1).join(" ")}{" "}
            <span className={styles.heroAccent}>
              {data.heroTitle.split(" ").slice(-1)}
            </span>
          </h1>
          <p className={styles.heroSub}>{data.heroSub}</p>
          <div className={styles.heroCtas}>
            <button
              className={styles.btnPrimary}
              onClick={() =>
                window.open(
                  "https://calendly.com/request-demo-zweidevs/meeting",
                  "_blank",
                )
              }
            >
              Request a Demo
            </button>
            <Link className={styles.btnOutline} href="/servicesNew">
              ← All Services
            </Link>
          </div>
        </div>
        <div className={styles.heroWave} />
      </section>

      {/* ── OVERVIEW ───────────────────────────── */}
      <section className={styles.overviewSec}>
        <div className={styles.container}>
          <div
            className={`${styles.overviewInner} ${styles.reveal}`}
            ref={addRef}
          >
            <div className={styles.overviewText}>
              <span className={styles.sectionTag}>{data.category}</span>
              <h2 className={styles.overviewHeading}>{data.heading}</h2>
              <p className={styles.overviewDesc}>{data.description}</p>
              <button
                className={styles.btnPrimary}
                onClick={() =>
                  window.open(
                    "https://calendly.com/request-demo-zweidevs/meeting",
                    "_blank",
                  )
                }
              >
                Schedule a Call
              </button>
            </div>
            <div className={styles.overviewVisual}>
              <Image
                alt={data.category}
                className={styles.overviewImg}
                height={360}
                src={data.image}
                width={480}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFERINGS ──────────────────────────── */}
      <section className={styles.offeringsSec}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>What We Offer</span>
            <h2 className={styles.sectionTitle}>{data.category} Services</h2>
          </div>
          <div className={styles.offeringsGrid}>
            {data.offerings.map((o, i) => (
              <div
                className={`${styles.offeringCard} ${styles.reveal}`}
                key={o.title}
                ref={addRef}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div className={styles.offeringIconWrap}>
                  <Image alt={o.title} height={28} src={o.icon} width={28} />
                </div>
                <h3 className={styles.offeringTitle}>{o.title}</h3>
                <p className={styles.offeringDesc}>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────── */}
      {data.projects && data.projects.length > 0 && (
        <section className={styles.projectsSec}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Portfolio</span>
              <h2 className={styles.sectionTitle}>{data.category} Projects</h2>
            </div>
            <div className={styles.projectsGrid}>
              {data.projects.map((p, i) => (
                <div
                  className={`${styles.projectCard} ${styles.reveal}`}
                  key={p.title}
                  ref={addRef}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <div className={styles.projectImgWrap}>
                    <span className={styles.projectIndex}>{i + 1}</span>
                    <Image
                      alt={p.title}
                      className={styles.projectImg}
                      fill
                      sizes="(max-width: 590px) 100vw, 33vw"
                      src={p.image}
                    />
                  </div>
                  <div className={styles.projectBody}>
                    <h3 className={styles.projectTitle}>{p.title}</h3>
                    <p className={styles.projectDesc}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LET'S TALK 1 ──────────────────────── */}
      <section className={styles.letsTalkSec}>
        <div className={styles.container}>
          <div
            className={`${styles.letsTalkCard} ${styles.reveal}`}
            ref={addRef}
          >
            <div className={styles.letsTalkText}>
              <h3 className={styles.letsTalkTitle}>
                Do you have unique requirements?
              </h3>
              <p className={styles.letsTalkDesc}>
                We have the expertise to deliver you a custom solution no one
                else has.
              </p>
            </div>
            <button
              className={styles.letsTalkBtn}
              onClick={() =>
                window.open(
                  "https://calendly.com/request-demo-zweidevs/meeting",
                  "_blank",
                )
              }
            >
              Schedule a Call
            </button>
          </div>
        </div>
      </section>

      {/* ── PROCESS TIMELINE ───────────────────── */}
      <section className={styles.processSec}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Our Process</span>
            <h2 className={styles.sectionTitle}>{data.process.title}</h2>
            {data.process.desc && (
              <p className={styles.sectionDesc}>{data.process.desc}</p>
            )}
          </div>
          <div className={styles.processTimeline}>
            {data.process.steps.map((step, i) => (
              <div
                className={`${styles.processStep} ${styles.reveal}`}
                key={step.title}
                ref={addRef}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className={styles.processDot}>
                  <div className={styles.processDotInner} />
                </div>
                <span className={styles.processStepNum}>
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.processStepTitle}>{step.title}</h3>
                <p className={styles.processStepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARGET AUDIENCE ────────────────────── */}
      {data.audience && (
        <section className={styles.audienceSec}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Who We Serve</span>
              <h2 className={styles.sectionTitle}>{data.audience.title}</h2>
              {data.audience.desc && (
                <p className={styles.sectionDesc}>{data.audience.desc}</p>
              )}
            </div>
            <div className={styles.audienceGrid}>
              {data.audience.cards.map((c, i) => (
                <div
                  className={`${styles.audienceCard} ${styles.reveal}`}
                  key={c.title}
                  ref={addRef}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <h3 className={styles.audienceCardTitle}>{c.title}</h3>
                  <p className={styles.audienceCardDesc}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TECH STACK ─────────────────────────── */}
      <section className={styles.techStackSec}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Technology</span>
            <h2 className={styles.sectionTitle}>Tech Stack</h2>
          </div>
          <div className={styles.techStackGrid}>
            {data.techStack.map(g => (
              <div className={styles.techStackGroup} key={g.group}>
                <h3 className={styles.techStackGroupTitle}>{g.group}</h3>
                <div className={styles.techChips}>
                  {g.chips.map(chip => (
                    <span className={styles.techChip} key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LET'S TALK 2 ──────────────────────── */}
      <section className={styles.letsTalkSec}>
        <div className={styles.container}>
          <div
            className={`${styles.letsTalkCard} ${styles.reveal}`}
            ref={addRef}
          >
            <div className={styles.letsTalkText}>
              <h3 className={styles.letsTalkTitle}>Ready to get started?</h3>
              <p className={styles.letsTalkDesc}>
                Let&apos;s talk about how we can help you build something great.
              </p>
            </div>
            <button
              className={styles.letsTalkBtn}
              onClick={() =>
                window.open(
                  "https://calendly.com/request-demo-zweidevs/meeting",
                  "_blank",
                )
              }
            >
              Let&apos;s Talk
            </button>
          </div>
        </div>
      </section>

      {/* ── OTHER SERVICES ─────────────────────── */}
      <section className={styles.otherServicesSec}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Explore More</span>
            <h2 className={styles.sectionTitle}>Other Services</h2>
          </div>
          <div className={styles.otherServicesGrid}>
            {otherServices.map((s, i) => (
              <Link
                className={`${styles.otherServiceCard} ${styles.reveal}`}
                href={`/servicesNew/${s.slug}`}
                key={s.slug}
                ref={addRef}
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div className={styles.otherServiceIcon}>
                  <Image alt={s.label} height={24} src={s.icon} width={24} />
                </div>
                <span className={styles.otherServiceLabel}>{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────── */}
      <section className={styles.faqSec}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>FAQ</span>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqList}>
            {data.faq.map(item => (
              <FaqItem item={item} key={item.q} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────── */}
      <section className={styles.ctaSec}>
        <div className={styles.container}>
          <div className={`${styles.ctaCard} ${styles.reveal}`} ref={addRef}>
            <h2 className={styles.ctaTitle}>
              Not Finding The Right Fit? Stay Connected
            </h2>
            <p className={styles.ctaDesc}>
              We have the expertise to deliver you a custom solution no one else
              has. Book a free consultation today.
            </p>
            <button
              className={styles.btnPrimary}
              onClick={() =>
                window.open(
                  "https://calendly.com/request-demo-zweidevs/meeting",
                  "_blank",
                )
              }
            >
              Book a Free Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE COMPONENT — handles loading / 404,
   then renders content with key={slug} so
   useReveal fires fresh on every slug change.
   ═══════════════════════════════════════════ */
export default function ServiceDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!router.isReady) {
    return (
      <div
        className={styles.page}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <span style={{ color: "#ff9700", fontSize: 18 }}>Loading…</span>
      </div>
    );
  }

  if (!content[slug]) {
    return (
      <div
        className={styles.page}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: 16,
        }}
      >
        <h1 style={{ color: "#2b2a35" }}>Service Not Found</h1>
        <Link className={styles.btnPrimary} href="/servicesNew">
          ← Back to Services
        </Link>
      </div>
    );
  }

  return <ServiceDetailContent data={content[slug]} key={slug} slug={slug} />;
}
