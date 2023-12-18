import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";

const PageBanner = dynamic(
  () => import("@component/Components/CommonComponents/PageBanner"),
  { preload: true },
);

// static images
import WebDevServiceDetailsIcon from "../../../../public/assets/serviceIcons/webdev.jpg";
import UiUxServiceDetailsIcon from "../../../../public/assets/serviceIcons/UIUX.jpg";
import MobodevServiceDetailsIcon from "../../../../public/assets/serviceIcons/mobodev.jpg";
import GDServiceDetailsIcon from "../../../../public/assets/serviceIcons/GD.jpg";
import BlockchainDevServiceDetailsIcon from "../../../../public/assets/serviceIcons/bcdev.jpg";
import AIdevServiceDetailsIcon from "../../../../public/assets/serviceIcons/AI.jpg";
import IotServiceDetailsIcon from "../../../../public/assets/serviceIcons/iot.png";
import DevOpsServiceDetailsIcon from "../../../../public/assets/serviceIcons/devops.webp";

import styles from "./serviceDetails.module.css";
const ServiceDetailsCard = dynamic(
  () =>
    import(
      "@component/Components/CommonComponents/ServiceDetailsCard/SerivceDetailsCard"
    ),
  { preload: true },
);

import { InstantBookingButton } from "@component/Components/CommonComponents";

//web
import designIcon from "../../../../public/assets/serviceIcons/webServicesIcons/design.svg";
import backendIcon from "../../../../public/assets/serviceIcons/webServicesIcons/backend.svg";
import ecommerceIcon from "../../../../public/assets/serviceIcons/webServicesIcons/ecommerce.svg";
import frontendIcon from "../../../../public/assets/serviceIcons/webServicesIcons/frontend.svg";
import fullstackIcon from "../../../../public/assets/serviceIcons/webServicesIcons/fullstack.svg";

//mobile
import hybirdMoboIcon from "../../../../public/assets/serviceIcons/moboIcons/hybirdMobileIcon.svg";
import mobo2Icon from "../../../../public/assets/serviceIcons/moboIcons/mobo2.svg";
import mobo3Icon from "../../../../public/assets/serviceIcons/moboIcons/mobo3.svg";

//ui ux
import uiux1Icon from "../../../../public/assets/serviceIcons/uiuxIcons/uiux1.svg";
import uiux2Icon from "../../../../public/assets/serviceIcons/uiuxIcons/uiux2.svg";
import uiux3Icon from "../../../../public/assets/serviceIcons/uiuxIcons/uiux3.svg";
import uiux4Icon from "../../../../public/assets/serviceIcons/uiuxIcons/uiux4.svg";
import uiux5Icon from "../../../../public/assets/serviceIcons/uiuxIcons/uiux5.svg";

//gd
import gd1Icon from "../../../../public/assets/serviceIcons/gdIcons/gd1.svg";
import gd2Icon from "../../../../public/assets/serviceIcons/gdIcons/gd2.svg";
import gd3Icon from "../../../../public/assets/serviceIcons/gdIcons/gd3.svg";
import gd4Icon from "../../../../public/assets/serviceIcons/gdIcons/gd4.svg";

//iot
import iot1Icon from "../../../../public/assets/serviceIcons/iotIcons/iot1.svg";
import iot2Icon from "../../../../public/assets/serviceIcons/iotIcons/iot2.svg";
import iot3Icon from "../../../../public/assets/serviceIcons/iotIcons/iot3.svg";
import iot4Icon from "../../../../public/assets/serviceIcons/iotIcons/iot4.svg";
import iot5Icon from "../../../../public/assets/serviceIcons/iotIcons/iot5.svg";
import iot6Icon from "../../../../public/assets/serviceIcons/iotIcons/iot6.svg";
import iot7Icon from "../../../../public/assets/serviceIcons/iotIcons/iot7.svg";
import iot8Icon from "../../../../public/assets/serviceIcons/iotIcons/iot8.svg";

//ai
import ai1Icon from "../../../../public/assets/serviceIcons/aiIcons/ai1.svg";
import ai2Icon from "../../../../public/assets/serviceIcons/aiIcons/ai2.svg";
import ai3Icon from "../../../../public/assets/serviceIcons/aiIcons/ai3.svg";
import ai4Icon from "../../../../public/assets/serviceIcons/aiIcons/ai4.svg";
import ai5Icon from "../../../../public/assets/serviceIcons/aiIcons/ai5.svg";
import ai6Icon from "../../../../public/assets/serviceIcons/aiIcons/ai6.svg";

//devops
import dev1Icon from "../../../../public/assets/serviceIcons/devOPSIcon/dev1.svg";
import dev2Icon from "../../../../public/assets/serviceIcons/devOPSIcon/dev2.svg";
import dev3Icon from "../../../../public/assets/serviceIcons/devOPSIcon/dev3.svg";
import dev4Icon from "../../../../public/assets/serviceIcons/devOPSIcon/dev4.svg";
import dev5con from "../../../../public/assets/serviceIcons/devOPSIcon/dev5.svg";
import dev6Icon from "../../../../public/assets/serviceIcons/devOPSIcon/dev6.svg";

//bcIcons
import bc1Icon from "../../../../public/assets/serviceIcons/BCIcons/bc1.svg";
import bc2Icon from "../../../../public/assets/serviceIcons/BCIcons/bc2.svg";
import bc3Icon from "../../../../public/assets/serviceIcons/BCIcons/bc3.svg";
import bc4Icon from "../../../../public/assets/serviceIcons/BCIcons/bc4.svg";
import bc5Icon from "../../../../public/assets/serviceIcons/BCIcons/bc5.svg";

const ServiceCarosuel = dynamic(
  () => import("@component/Components/CommonComponents/ServiceCarousel"),
  { preload: true },
);

const ServicesTechnologiesCard = dynamic(
  () =>
    import(
      "@component/Components/CommonComponents/ServicesTechnologiesCard/index"
    ),
  { preload: true },
);
import OfferingCard from "@component/Components/CommonComponents/OfferingsCard";
// import BusinessProcessCard from "@component/Components/CommonComponents/BusinessProcessCard/BusinessProcessCard";
import ProductDevSection from "@component/Components/CommonComponents/ProductDevSection/ProductDevSection";
import TargetAudience from "@component/Components/CommonComponents/TargetAudienceSection/TargetAudience";
import Faq from "@component/Components/CommonComponents/FAQ/Faq";
import LetsTalk from "@component/Components/CommonComponents/LetsTalk/LetsTalk";
import { urls } from "@component/utils/urls";

//projects import
// import Project1_Image1 from "../../../../public/assets/HomeIcons/Project/Project1_image1.svg";
// import Project2_Image1 from "../../../../public/assets/HomeIcons/Project/Project2_image1.svg";
// import Project3_Image1 from "../../../../public/assets/HomeIcons/Project/Project3_image1.svg";

//web Proj
import Web1 from "../../../../public/assets/HomeIcons/Project/Web1.png";
import Web2 from "../../../../public/assets/HomeIcons/Project/Web2.png";
import Web3 from "../../../../public/assets/HomeIcons/Project/Web3.png";
import Web4 from "../../../../public/assets/HomeIcons/Project/Web4.png";
import Web5 from "../../../../public/assets/HomeIcons/Project/Web5.png";
import Web6 from "../../../../public/assets/HomeIcons/Project/Web6.png";
import Web7 from "../../../../public/assets/HomeIcons/Project/Project4_image1.svg";
import Web8 from "../../../../public/assets/HomeIcons/Project/Project6_image1.svg";
import Web9 from "../../../../public/assets/HomeIcons/Project/Project5_image1.svg";
import Web10 from "../../../../public/assets/HomeIcons/Project/Web10.png";
import Web11 from "../../../../public/assets/HomeIcons/Project/Web11.png";

//gd projects
import GameDev1 from "../../../../public/assets/serviceDetailsIcons/gdIcons/g1.png";
import GameDev2 from "../../../../public/assets/serviceDetailsIcons/gdIcons/g2.png";

//iot projects
import iot1 from "../../../../public/assets/serviceDetailsIcons/iotIcons/iot1.png";
import iot2 from "../../../../public/assets/serviceDetailsIcons/iotIcons/iot2.png";
import iot3 from "../../../../public/assets/serviceDetailsIcons/iotIcons/iot3.png";

//ai and ML Projects
import ai1 from "../../../../public/assets/serviceDetailsIcons/aiIcons/ai1.png";
import ai2 from "../../../../public/assets/serviceDetailsIcons/aiIcons/ai2.png";
import ai3 from "../../../../public/assets/serviceDetailsIcons/aiIcons/ai3.png";

//mobo Projects
import Mobo1 from "../../../../public/assets/serviceDetailsIcons/moboIcons/mobo1.png";
import Mobo2 from "../../../../public/assets/serviceDetailsIcons/moboIcons/mobo2.png";
import Mobo3 from "../../../../public/assets/serviceDetailsIcons/moboIcons/mobo3.png";
import Mobo4 from "../../../../public/assets/serviceDetailsIcons/moboIcons/mobo4.png";

//ui ux Projects
import UiUX1 from "../../../../public/assets/serviceDetailsIcons/uiuxIcons/uiux1.png";
import UiUX2 from "../../../../public/assets/serviceDetailsIcons/uiuxIcons/uiux2.png";
import UiUX4 from "../../../../public/assets/serviceDetailsIcons/uiuxIcons/uiux4.png";

//devops projects
import DevOps1 from "../../../../public/assets/serviceDetailsIcons/devOpsIcons/devOps1.png";

//bc projects
import bc1 from "../../../../public/assets/serviceDetailsIcons/bcIcons/bc1.png";
import bc2 from "../../../../public/assets/serviceDetailsIcons/bcIcons/bc2.png";

import AIDevIcon from "../../../../public/assets/serviceIcons/AIDevIcon.svg";
import BlockchainIcon from "../../../../public/assets/serviceIcons/blockchainIcon.svg";
import DevopsIcon from "../../../../public/assets/serviceIcons/devopsIcon.svg";
import GameDevIcon from "../../../../public/assets/serviceIcons/GameDevIcon.svg";
import IOTDevIcon from "../../../../public/assets/serviceIcons/IOTIcon.svg";
import MobileDevIcon from "../../../../public/assets/serviceIcons/MobDevIcon.svg";
import WebDevIcon from "../../../../public/assets/serviceIcons/webdevIcon.svg";
import UIUXIcon from "../../../../public/assets/serviceIcons/uiuxIcon.svg";

const cardData = [
  {
    cardIcon: WebDevIcon,
    cardIconTitle: { firstLine: "Web", secondLine: "Development" },
    href: "/services/Web Development",
  },
  {
    cardIcon: BlockchainIcon,
    cardIconTitle: { firstLine: "Blockchain", secondLine: "Development" },
    href: "/services/Blockchain Development",
  },
  {
    cardIcon: MobileDevIcon,
    cardIconTitle: { firstLine: "Mobile", secondLine: "Development" },
    href: "/services/Mobile App Development",
  },
  {
    cardIcon: UIUXIcon,
    cardIconTitle: { firstLine: "UI UX", secondLine: "Development" },
    href: "/services/UI & UX Development",
  },
  {
    cardIcon: GameDevIcon,
    cardIconTitle: { firstLine: "Game", secondLine: "Development" },
    href: "/services/Game Development",
  },
  {
    cardIcon: IOTDevIcon,
    cardIconTitle: { firstLine: "IOT", secondLine: "Devices" },
    href: "/services/IOT Devices",
  },
  {
    cardIcon: AIDevIcon,
    cardIconTitle: {
      firstLine: "Artificial Intelligence &",
      secondLine: "Machine Learning",
    },
    href: "/services/Artificial Intelligence & Machine Learning",
  },
  {
    cardIcon: DevopsIcon,
    cardIconTitle: { firstLine: "DevOps &", secondLine: "Cloud Services" },
    href: urls.services.DevOPS.url,
  },
];

const content = {
  [urls.services.WebApp.title]: {
    image: WebDevServiceDetailsIcon,
    targetAudienceSection: {
      title: `We Build Custom Web Applications For`,
      desc: `At Zweidevs, we specialize in creating custom online apps that are
      carefully designed to match the distinct requirements of companies
      of all sizes. Our committed team of professionals uses
      state-of-the-art technology and a client-focused methodology to
      provide customized solutions that effortlessly match the objectives
      and ambitions of companies of any size.`,
      targetAudienceCardData: [
        {
          cardTitle: "Startups",
          cardDesc: `Recognizing the distinct obstacles and goals of smaller businesses, we provide them with cost-effective, scalable solutions that enable them to build a strong online presence. Whether you're starting a new business or want to improve your existing digital skills, our commitment is to offer creative, superior, and reasonably priced online solutions that help small businesses succeed in the digital world.`,
        },
        {
          cardTitle: "Medium Businesses",
          cardDesc: `Our dedicated team is aware of the complex issues and expansion goals that mid-sized businesses face, and we use this knowledge to provide solutions that work in unison with their goals. Whether your goal is to increase consumer engagement, streamline internal operations, or broaden your digital presence, our all-encompassing approach guarantees that the web apps we develop are precisely tailored to meet the unique requirements of medium-sized enterprises.`,
        },
        {
          cardTitle: "Large Businesses",
          cardDesc: `Zweidevs is dedicated to developing custom web apps that smoothly interface with the complex operations of large companies, whether you want to boost digital interactions at scale, build reliable enterprise solutions, or streamline complex business processes. Our emphasis on performance, security, and innovation guarantees that the solutions we provide enable big businesses to prosper in the ever-changing digital environment, promoting effectiveness, expansion, and long-term success.`,
        },
      ],
    },
    projectData: [
      {
        index: 1,
        image: Web1,
        title: "Cyber Legends",
        content:
          "Cyber Legends, an Ed-Tech and Gaming platform, provides services for online education to teachers, tutors, parents, and other educators and content creators. This edtech platform consists of tools and content to enable interactive and other educational exercises for teachers that students can use in their learning.",
      },
      {
        index: 2,
        image: Web2,
        title: "Edcite",
        content:
          "Zweidevs created an intuitive platform that enables educators to create interactive, adaptable lessons that align with Common Core requirements. To support students' learning journey in K–12 education, Edcite improves their digital experience by tackling the issue of online standardized tests and promoting instant feedback.",
      },
      {
        index: 3,
        image: Web3,
        title: "Officer Survey",
        content:
          "A technology-driven forum that helps communities and law enforcement organizations communicate and understand the views of others. Zweidevs put tools in place to facilitate meaningful dialogue, improve transparency, and establish trust-based connections to create a safer and more interconnected society.",
      },
      {
        index: 4,
        image: Web4,
        title: "Blockcircle",
        content:
          "Blockcircle provides competitive data, proprietary tools, and dynamic investing analytics to enable them to make well-informed decisions in the turbulent cryptocurrency market.",
      },
      {
        index: 5,
        image: Web5,
        title: "Avail Medical",
        content:
          "We contributed to the development of a website of traditional and marijuana-based prescription knowledge to help design an easy-to-use platform that makes Canada's medical marijuana program accessible. The platform provides streamlined online shopping experiences, allowing customers to easily transition to our platform for various services and product options from the comfort of their homes.",
      },
      {
        index: 6,
        image: Web6,
        title: "Isynced",
        content:
          "Trademimic facilitates transaction execution between several accounts. The market's most affordable copy trading solution offers cutting-edge features to optimize earnings, minimize risk, and offer the most incredible user experience.",
      },
      {
        index: 7,
        image: Web7,
        title: "Public Trust",
        content:
          "Public Trust Realty Group provides full-service residential and commercial real estate brokerage services. They oversee short sales, foreclosure properties, and leases for businesses and residences. They have a referral group if you need to move anyplace in the United States, including Canada and Puerto Rico.",
      },
      {
        index: 8,
        image: Web8,
        title: "Fresh Track",
        content:
          "Since 1996, a Vancouver-based team has created incredible travel experiences for clients by fusing their love of travel with insider knowledge to create over 25,000 customized trip itineraries highlighting the country's fantastic scenery and variety of experiences.",
      },
      {
        index: 9,
        image: Web9,
        title: "Humanava",
        content:
          "You can realize your full potential with Humanava, a platform providing personal development courses to accelerate human progress. Embrace leadership, diversity, and mindfulness, connect with people worldwide, and discover your hidden brilliance to secure a bright future.",
      },
      {
        index: 10,
        image: Web10,
        title: "LinkTree",
        content:
          "With Linktree, you can share everything about yourself in a single, easy-to-manage link, increasing your online material's discoverability, manageability, and conversion rate. Link your videos, music, podcasts, website, Instagram, Twitter, and more. Everything goes in a landing page link in the bio meant to convert.",
      },
      {
        index: 11,
        image: Web11,
        title: "Venue Genie",
        content:
          "Learn about the fee-free, markup-free event booking platform of the future. Select from more than 360 locations, catering options, and DJ packages ideal for gatherings of any size to have a flawless and reasonably priced experience.",
      },
    ],
    productionDevSection: {
      title: `How We Develop Web Applications`,
      desc: `Zweidevs manages every stage of the project lifecycle while providing full services for developing web applications. Our development staff is dedicated to building mutually beneficial collaborations. We conduct in-depth research, provide sage counsel on strategic decisions, and guarantee consistent assistance at each step of your web application.`,
      cardsData: [
        {
          cardTitle: "Discovery",
          cardDesc: `Every new project at Zweidevs begins with a dedicated discovery phase, a strategy that we believe is critical to exploring the project's concept and defining its core requirements. Our clients can evaluate the viability of their investment and validate their business ideas at this first phase, which is a great opportunity. In the discovery phase, we discuss the intended functionality and look closely at the problems the customer wants the software product to solve. For our team, obtaining a wealth of project data is essential since it helps us determine the project's complexity and provide the customer with correct time and cost estimates.`,
        },
        {
          cardTitle: "Design",
          cardDesc:
            "Our design team creates the foundation for the best web designs through the careful development of interactive prototypes and wireframes. We carefully design the user flow for future applications so that clients can see an appealing preview of their product. This flow is put through a rigorous testing process with actual users to make sure that it is easy to navigate. We prioritize creating a captivating first impression for online businesses, recognizing its critical value, and emphasize visual appeal in user interface design. We help companies build long-lasting relationships with their clients by emphasizing elegant and sophisticated web design.",
        },
        {
          cardTitle: "Development",
          cardDesc: `We've adopted Agile as our primary project management approach because we think it helps us maintain the high caliber of the products we provide, reduce risks, and give our clients more control over their projects. We break down our development process into manageable sprints that follow a specific pattern. We start with careful planning and move right into the development stage. After that, we thoroughly test the implemented functionality, document our findings, and release it once we've ensured no bugs are left. Our development team moves smoothly into the next phase at the end of each sprint, guaranteeing steady and organized progress.`,
        },
        {
          cardTitle: "Release",
          cardDesc: `The software development process ends with the release phase. After our quality assurance engineers thoroughly test every feature both manually and automatically to guarantee flawless operation, all parts, data, and completed code are deployed to production. Our bespoke web application development team carefully gathers release notes throughout this critical phase. They work as technical documentation that provides crucial details about the product, including information on features that have been added and bugs that have been fixed. Release notes are intended for internal and external product users, and they offer in-depth information on the most recent advancements.`,
        },
        {
          cardTitle: "Support",
          cardDesc: `At Zweidevs, we build software solutions that, long after the initial product launch, continuously provide their owners with the expected results. We are able to maintain this success over time because of our dedication to providing excellent post-launch maintenance and support. We offer two ways for our customers to keep their products maintained for their convenience. In the first, customers pay a set monthly amount to receive a predetermined number of hours, similar to a subscription model. As an alternative, companies can gather jobs into a backlog and assign our team to handle them. Before giving them to our staff, clients usually accumulate jobs until they have at least eighty working hours. Clients generally agree this is the most economical way to sustain their software product.`,
        },
      ],
    },
    techStackCardData: {
      cardsData: [
        {
          cardTitle: "Front-end",
          chipData: ["Javascript", "React", "Angular", "Vue"],
        },
        {
          cardTitle: "Back-end",
          chipData: ["Ruby on Rails", "Node.js", "Python", "PHP"],
        },
      ],
    },
    headerTitle:
      "Elevate Your Online Presence: Expert Web App Development Services",

    headerDescription:
      "Transform your ideas into reality with our exceptional web app development services. Our seasoned team crafts tailored solutions that seamlessly blend innovation and functionality. From concept to deployment, we prioritize cutting-edge technologies and rigorous quality assurance to ensure your web app stands out. Trust Zweidevs to deliver a robust and user-centric online experience, enhancing your brand's digital footprint.",
    heading: `Custom Web Applications and Dedicated Support for Your Success!`,
    description: `Our mission is to empower your business with the latest technologies and the best user experience. We create custom web applications that digitize your internal processes and ensure seamless operations. With free maintenance, support services, and automated deployments, we are committed to helping you achieve your goals and grow your business.

    At Zweidevs, your success is our mission. We're not just developers; we're your partners in the digital realm. Your victories are our victories.`,

    offeringCardData: [
      {
        cardImage: designIcon,
        cardTitle: "Experience Design",
        cardDesc:
          "Zweidevs' careful attention to experience design will improve user interactions. We map user journeys delicately, making sure every touchpoint is enjoyable in addition to being practical. Beyond aesthetics, our UI/UX expertise creates engaging digital experiences for your audience.",
      },
      {
        cardImage: frontendIcon,
        cardTitle: "Frontend Development",
        cardDesc:
          "Zweidevs' full-stack front-end expertise can help you discover innovation. Our developers combine creativity and technological proficiency to create user-friendly interfaces and responsive web and mobile solutions. We ensure your online presence is distinctive, captivating, and up to the ever-evolving standards of contemporary design.",
      },
      {
        cardImage: backendIcon,
        cardTitle: "Backend Development",
        cardDesc:
          "Our back-end solutions can help you build a strong digital foundation. Our development team creates adaptable and scalable structures, maximizing performance and guaranteeing a smooth front-end integration. Count on us to establish the foundation for your online expansion.",
      },
      {
        cardImage: fullstackIcon,
        cardTitle: "Full Stack Development",
        cardDesc:
          "Take advantage of Zweidevs' full-stack development services for end-to-end excellence. Our team links front-end and back-end technologies smoothly, from conception to deployment. We provide flexible, practical solutions that change to meet your changing business requirements.",
      },
      {
        cardImage: ecommerceIcon,
        cardTitle: "Maintenance and Update",
        cardDesc:
          "Zweidevs is your committed partner for long-term success even after launch. Beyond bug patches, our maintenance and update services include exciting new features and performance improvements. With our continued assistance, you can keep your app at the forefront of innovation and customer happiness.",
      },
    ],

    faqData: [
      {
        title: "How much does web app development cost?",
        desc: `The cost of developing a web app is influenced by its complexity, required features, technology stack, team experience, and other factors like design, testing, and maintenance. Working with web development experts or agencies is crucial if you want a clear knowledge of your vision for the web application and a more precise estimate based on your unique requirements. Connect with our web developers to know the exact cost estimation. `,
      },
      {
        title:
          "What is web app development, and how can it benefit my business?",
        desc: `Developing software applications that run on web browsers is known as web app development, and it offers firms adaptable and affordable options. Their cross-platform compatibility guarantees a uniform user experience on various devices and browsers. Essentially, web app development gives companies the ability to create effective, easily accessible, and scalable solutions that they can use to keep up with changing technology and market demands.`,
      },
      {
        title: "How long does it take to develop a web application?",
        desc: `A simple web app with basic features might take a few weeks to a couple of months to develop, while more complex or enterprise-level applications could take several months or even a year. Rapid development frameworks and agile development methodologies can expedite the process, but it's essential to balance speed with thorough testing and quality assurance.`,
      },
      {
        title: "Why choose Zweidevs for web application development?",
        desc: `We at Zweidevs don't just develop web apps—we craft reliable, approachable solutions that add value to your company and demonstrate our constant commitment to quality and client happiness. Having completed numerous projects successfully and leaving our clients happy, we place a high value on open communication and teamwork during the whole development process. Connect with our experts right away.`,
      },
      {
        title:
          "How do you ensure the security of the web applications you develop?",
        desc: `An emphasis on web application security can be done through frequent audits, thorough code reviews, and encryption. We adhere to the least privilege principle and use strong authentication. The result is secure online apps that successfully reduce cybersecurity risks and prioritize data protection.`,
      },
      {
        title:
          "Do you provide ongoing maintenance and support after the web app is launched?",
        desc: `Yes, we at Zweidevs recognize the value of continuous upkeep and assistance. We provide thorough maintenance services, which include bug repairs, updates, and optimizations, to guarantee your application keeps running smoothly. As your company grows, our support staff is here to help with any necessary improvements or modifications and to quickly resolve any issues that may arise.`,
      },
    ],
  },
  [urls.services.BC.title]: {
    image: BlockchainDevServiceDetailsIcon,
    targetAudienceSection: {
      title: `We Develop Blockchains For`,
      desc: `With our professional development services, businesses of all sizes can harness the power of blockchain technology. Our specialty at Zweidevs is customizing blockchain solutions to fit the particular requirements of startups, large corporations, and all in between. We provide solutions that enable organizations to achieve greater heights while navigating the difficulties of blockchain technology.`,
      targetAudienceCardData: [
        {
          cardTitle: "Startups",
          cardDesc: ` Imagine a day when the security and effectiveness of a custom blockchain solution empower your startup. Our group specializes in turning the concept of your startup into a creative, scalable digital reality. Enable your startup's growth with our informed and convincing blockchain development services.`,
        },
        {
          cardTitle: "Medium Businesses",
          cardDesc: `We customize our blockchain solutions to fit the particular requirements of your mid-size business, whether you work in manufacturing, healthcare, finance, or any other industry. Imagine a time in the future when our custom blockchain apps will enable your company to grow thanks to their efficiency, security, and creativity.`,
        },
        {
          cardTitle: "Large Businesses",
          cardDesc: `Blockchain technology has already completely changed the way large businesses function in industries like real estate, healthcare, and supply chains. Our specialized blockchain apps will be essential to the growth and success of your large company because they will be scalable, secure, and innovative.`,
        },
      ],
    },
    projectData: [
      {
        index: 1,
        image: bc1,
        title: "CryptoFinance",
        content: `Blockchain applications for cryptocurrency finance simplify financial transactions by offering a decentralized, safe environment for the effective exchange and management of digital assets.`,
      },
      {
        index: 2,
        image: bc2,
        title: "Mimo",
        content: `With its decentralized exchange platform, Mimo transforms the cryptocurrency trading industry by doing away with middlemen and facilitating peer-to-peer transactions on the blockchain.`,
      },
      {
        index: 3,
        image: Web4,
        title: "Blockcircle",
        content: `Blockcircle provides competitive data, proprietary tools, and dynamic investing analytics to enable them to make well-informed decisions in the turbulent cryptocurrency market.`,
      },
    ],
    productionDevSection: {
      title: `Blockchain Solutions Lifecycle`,
      desc: null,
      cardsData: [
        {
          cardTitle: "Experience and Design",
          cardDesc:
            "With our team's wealth of experience with blockchain technology, your projects will run smoothly and securely. Creating cutting-edge blockchain solutions that are specific to your requirements is our area of expertise. Put your trust in us to create and execute solid blockchain designs that will improve the dependability and effectiveness of your business operations—experience cutting-edge blockchain development with Zweidevs to help your company grow into the future.",
        },
        {
          cardTitle: "Enterprise Blockchain",
          cardDesc:
            "Our expertise in corporate blockchain solutions allows us to streamline your business processes. Our committed staff makes sure that blockchain technology is integrated seamlessly, improving security and transparency throughout your business. With the help of our knowledgeable Blockchain Development Service, grow your company.",
        },
        {
          cardTitle: "Blockchain Deployment",
          cardDesc: `We specialize in smooth Blockchain Deployment. Our team of experts guarantees the effective deployment of blockchain solutions customized to your unique needs. We put security, transparency, and scalability first from conception to implementation, providing a solid platform for your digital transformation. Come experience the decentralized and safe technologies of the future with us.`,
        },
        {
          cardTitle: "Blockchain Maintenance",
          cardDesc: `With Zweidevs' Blockchain Maintenance Service, you can be sure that your blockchain solutions are reliable and long-lasting. Our committed staff focuses on continuous maintenance, including frequent upgrades, security improvements, and bug fixes. We protect your blockchain infrastructure proactively to guarantee peak performance and robustness. Join forces with us for a sustainable and safe blockchain experience.`,
        },
        {
          cardTitle: "Migration and Upgrades",
          cardDesc: `Our knowledgeable staff specializes in seamless migrations, guaranteeing data integrity and zero interruptions. We put security and efficiency first while upgrading old systems or moving to new platforms. Put your trust in Zweidevs for an efficient procedure that expands your blockchain capabilities and provides innovative solutions for the future.`,
        },
        {
          cardTitle: "Custom Blockchain Development Solutions",
          cardDesc: `We are innovators in custom blockchain app development that is matched to your business needs exactly. Our committed staff is excellent at developing cutting-edge blockchain solutions that improve data security, streamline operations, and promote unmatched transparency. Put your trust in Zweidevs for an unmatched experience in creating tailored blockchain solutions that meet your company's goals.`,
        },
      ],
    },
    techStackCardData: {
      cardsData: [
        {
          cardTitle: "Blockchain",
          cardDesc: `Every new project at Zweidevs begins with a dedicated discovery phase, a strategy that we believe is critical to exploring the project's concept and defining its core requirements. Our clients can evaluate the viability of their investment and validate their business ideas at this first phase, which is a great opportunity. In the discovery phase, we discuss the intended functionality and look closely at the problems the customer wants the software product to solve. For our team, obtaining a wealth of project data is essential since it helps us determine the project's complexity and provide the customer with correct time and cost estimates.`,
          chipData: ["Solana", "Ethereum", "Cardano", "Avalaunch"],
        },
      ],
    },
    headerTitle:
      "Unlocking Tomorrow: Revolutionize Your Future with Our Blockchain Expertise",

    headerDescription:
      "With a focus on innovative uses, we use blockchain technology to reshape markets and establish new benchmarks for openness and trust. Delivering cutting-edge solutions that have a real impact and change the way industries function is our main goal.",
    heading: `Transparent and Decentralized Solutions with BlockChain Development`,
    description: `Where success and creativity converge to create a smooth trip and endless opportunities!
    Our blockchain application development team specializes in developing unique solutions that smoothly incorporate blockchain technology into your company while maintaining efficiency, security, and transparency. To protect your blockchain environment from potential dangers, Zweidevs offers security assessments and intelligent contract audits. Whether you're managing the intricacies of healthcare, banking, logistics, or other fields, our blockchain knowledge gives your company the edge it needs to succeed. 
    Shape the technology of the future with us; the opportunities for creativity and achievement are virtually endless.`,

    offeringCardData: [
      {
        cardImage: bc1Icon,
        cardTitle: "Enhanced Security",
        cardDesc: `Our experience will strengthen your operations, guaranteeing data integrity and resistance to changing threats. Our blockchain solutions raise the bar for your company's security standards by offering a strong defense. With Zweidevs, you may enjoy a reliable and safe environment that protects your vital processes.`,
      },
      {
        cardImage: bc2Icon,
        cardTitle: "Greater Transparency",
        cardDesc:
          "Our blockchain solutions guarantee confidence and accountability in every transaction by offering a decentralized, secure ledger. Gain instantaneous insight into operations while creating a safe and open environment for your company.",
      },
      {
        cardImage: bc3Icon,
        cardTitle: "Automation",
        cardDesc:
          "Experience workflows that are more efficient because our solutions optimize and automate tasks, requiring less manual intervention. Welcome to a new era of efficiency with Zweidevs, where smart contracts improve your operations' precision and velocity. You can rely on us to implement modern automation to streamline and transform your business operations.",
      },
      {
        cardImage: bc4Icon,
        cardTitle: "Instant Traceability",
        cardDesc:
          "Zweidevs incorporates blockchain technology to enable real-time traceability, enabling you to monitor each stage of your workflow. Take advantage of increased responsibility and visibility because our solutions offer an unchangeable record of your actions. Make sure the ecosystem is traceable and transparent with Zweidevs so you can make sound decisions.",
      },
      {
        cardImage: bc5Icon,
        cardTitle: "Increased Efficiency",
        cardDesc:
          "Gain more productivity as blockchain technology automates tedious chores and streamlines procedures. Unlock the possibilities for an environment in a company that is more effective and flexible with Zweidevs. Put your trust in us to use revolutionary blockchain technology to streamline your processes.",
      },
    ],
    faqData: [
      {
        title: "How much does Blockchain development cost?",
        desc: `The cost of developing a blockchain varies by several thousand dollars among various industries. Cost estimates for the creation and deployment of blockchains are influenced by a number of factors. Blockchain application development also depends on pricing methods, such as the time and material, set price, and specialized team models.`,
      },
      {
        title: "What is Blockchain development?",
        desc: `Your wallet's contents are just one aspect of decentralized technology, as it's easy to think that blockchain development is all about cryptocurrency, NFTs, Ethereum tokens, and Bitcoin. However, Blockchain technology uses a network of computers to create a distributed, decentralized ledger to record transactional data. Developers make sure that information cannot be modified retrospectively without approval from each block in the chain by arranging information into a series of "blocks." resulting in the creation of a transparent and safe means of sharing crucial data across networks.`,
      },
      {
        title:
          "How long does it take to develop a Solana Blockchain application?",
        desc: `A simple Solana blockchain application may be developed in a few weeks, roughly speaking, but more complicated projects involving sophisticated features, smart contracts, and elaborate capabilities might take many months. To obtain a more precise estimate based on your unique requirements and objectives, it's critical to carry out a thorough examination of your project requirements and speak with knowledgeable Solana developers. The whole development timetable should also take testing, optimization, and deployment into account.`,
      },
      {
        title: "Why choose Zweidevs for Blockchain application development?",
        desc: `There are several strong reasons to work with Zweidevs when developing blockchain applications. We specialize in creating blockchain solutions that are especially tailored to your company's requirements. We place a high value on innovation, making sure that your application is ready for any changes to the blockchain landscape in the future in addition to meeting the standards as they stand today. We bring a wealth of experience to the table and have a track record of successful blockchain projects.`,
      },
    ],
  },
  [urls.services.DevOPS.title]: {
    image: DevOpsServiceDetailsIcon,
    targetAudienceSection: {
      title: `We Provide DevOPS Services For`,
      desc: `Many businesses are looking into methods for shortening the time it takes to complete projects, from ideation to product launch. Adopting state-of-the-art DevOps techniques is crucial to achieving this goal, as it promotes improved coordination between development teams, analysts, and delivery managers.`,
      targetAudienceCardData: [
        {
          cardTitle: "Startups",
          cardDesc: `By using continuous integration and continuous deployment (CI/CD) techniques, DevOps services are essential to attaining a quick time-to-market. This makes it possible for entrepreneurs to deliver new features quickly. DevOps automation also aids in resource optimization, lower operating expenses, and fewer human errors for startups.`,
        },
        {
          cardTitle: "Medium Businesses",
          cardDesc: `Managing larger teams and more complicated projects is a problem for medium-sized businesses. Our DevOps services work by optimizing the processes involved in development, testing, and deployment; this increases productivity and decreases the need for manual intervention. DevOps's emphasis on better communication and cooperation is essential for assuring more seamless workflows even in the face of growing complexity.`,
        },
        {
          cardTitle: "Large Businesses",
          cardDesc: `Enterprise-level scalability offered by DevOps enables large firms to smoothly handle several projects. Our automated testing and deployment reduce risks and find and fixes problems early in the development cycle. DevOps approaches are also ideal for large businesses with strict regulatory commitments since they may be matched with governance standards and compliance requirements.`,
        },
      ],
    },
    projectData: [
      {
        index: 1,
        image: ai1,
        title: "AI VST",
        content: `A platform that offers high-end plugins and tools to improve audio and voice recordings. Our work entails creating and executing Visual Studio technology plugins that convert user-generated audio into professional artist-grade sound. Yonder Audio’s primary goal for consumers looking for better audio material is to provide a smooth experience.`,
      },
      {
        index: 2,
        image: ai2,
        title: "Twinciti",
        content: `Twinciti is a robust infrastructure that powers future applications, including 3D graphics and machine learning. It developed ML services and virtual machine generation for cloud services to provide a flexible and scalable platform for various application requirements.`,
      },
      {
        index: 3,
        image: DevOps1,
        title: "Gnizzel",
        content: `With Gnizzel, you can easily publish offers and last-minute appointments using our user-friendly platform, increasing the reach of your dental clinic and facilitating smooth connections with new and existing patients. You can also improve oral health and organize your calendar.`,
      },
    ],
    productionDevSection: {
      title: `How We Provide DevOPS Services`,
      desc: `We excel in DevOps, streamlining software delivery with automated pipelines and agile collaboration. Elevate your development process for speed, reliability, and scalability.`,
      cardsData: [
        {
          cardTitle: "Planning",
          cardDesc: `The foundation of Zweidevs' effective DevOps services is careful planning. In close collaboration with your team, we develop a tailored plan that combines a thorough implementation roadmap for DevOps with your business objectives.          `,
        },
        {
          cardTitle: "Continuous Development",
          cardDesc:
            "Software is continuously developed in an atmosphere that we promote. Our methodology guarantees that your applications constantly evolve, quickly adjusting to new needs and technological developments.",
        },
        {
          cardTitle: "Continuous Integration",
          cardDesc: `Our DevOps services are known for their seamless integration. Strong Continuous Integration pipelines are implemented by Zweidevs, facilitating seamless code integration and a cooperative, efficient workflow for your development team.`,
        },
        {
          cardTitle: "Continuous Testing",
          cardDesc: `Quality assurance is integrated into every development phase via continuous testing. Our automated testing procedures reduce the possibility of errors in the production environment by ensuring the dependability and functionality of your apps.`,
        },
        {
          cardTitle: "Continuous Monitoring",
          cardDesc: ` Zweidevs uses continuous monitoring to prioritize routine upkeep. We put in place watchful monitoring technologies to quickly identify and fix problems, preserving peak system performance and reducing downtime.`,
        },
        {
          cardTitle: "Continuous Feedback",
          cardDesc: `Zweidevs promotes transparent channels of communication and a culture of continuous feedback. Frequent feedback loops guarantee that your development procedures are flexible and conform to changing customer requirements and project constraints.`,
        },
      ],
    },
    techStackCardData: {
      cardsData: [
        {
          cardTitle: "Infrastructure",
          chipData: ["AWS", "Google Cloud Platform", "Heroku", "Docker"],
        },
      ],
    },
    headerTitle: "Effortless Success with Our DevOps Expertise",

    headerDescription:
      "Putting DevOps concepts into practice can result in more frequent deployments, quicker development cycles, and better software overall. Zweidevs redefines the conventional software development environment, guaranteeing that there are no needless obstacles in your way and that your route to success is clear and efficient.",
    heading: `Automating and Accelerating Your Software Delivery Pipeline`,
    description: `Software development with our advanced DevOps services makes teamwork easier, automating tasks and delivering software faster than ever.
    At Zweidevs, we're your progress partners and software suppliers. With our smooth and assured DevOps solutions, you can power your success journey and guarantee quality and efficiency at every turn. Imagine a simple process where your concepts are quickly and easily transformed into effective digital solutions. From conception to implementation, we support you at every stage. Discover the simplicity of creativity and dependability with Zweidevs, where we cherish our relationship and your success goes beyond merely a goal.`,

    offeringCardData: [
      {
        cardImage: dev1Icon,
        cardTitle: "Devops as a Service",
        cardDesc:
          "You can rely on Zweidevs, a highly qualified technical staff, to manage your software development and implementation processes when you hire our DevOps as a service firm. With the move of collaboration from traditional development and operations teams to the cloud, DevOps as a Service represents a revolutionary change in application development.",
      },
      {
        cardImage: dev2Icon,
        cardTitle: "Infrastructure Transformation",
        cardDesc:
          "Utilize Zweidevs' DevOps automation services to elevate your operations while experiencing an infrastructure automation fundamental shift. Discover increased scalability, improved operational efficiency, and unmatched agility as we transform the foundation of your IT environment.",
      },
      {
        cardImage: dev3Icon,
        cardTitle: "Devops Continuous Integration and Deployment (CI/CD)",
        cardDesc:
          "Manage smooth CI/CD pipelines so that your applications can release faster and with greater reliability. Observe a shift in your development lifecycle that emphasizes continuous delivery and efficiency.",
      },
      {
        cardImage: dev4Icon,
        cardTitle: "Monitoring and Logging",
        cardDesc:
          "Protect peak performance and proactively address problems with our watchful DevOps services. Zweidevs maintains your systems under control with reliable monitoring and logging solutions, giving you the knowledge you need to anticipate problems and take proactive measures to resolve them.",
      },
      {
        cardImage: dev5con,
        cardTitle: "Cloud Infrastructure Management",
        cardDesc:
          "Take advantage of scalable and effective cloud infrastructure management to help your business fully utilize the resources and agility cloud platforms offer. With Cloud Security Managed Services, you can improve your company's cybersecurity. Use proactive monitoring, threat information, and customized tactics that guarantee the privacy and accuracy of your data.",
      },
      {
        cardImage: dev6Icon,
        cardTitle: "Security and Compliance",
        cardDesc:
          "Set industry standards for protecting your digital landscape and fortify your digital defenses using Zweidevs' DevOps security techniques. Assure adherence to regulations and strengthen your systems with state-of-the-art security measures, giving your digital endeavors a safe and secure base.",
      },
    ],

    faqData: [
      {
        title: "What is DevOps and how can it benefit my business?",
        desc: `Software development and IT operations are integrated through the collaborative DevOps methodology, which optimizes workflows and boosts productivity. Businesses benefit from it through faster software delivery, fewer mistakes, increased scalability, cooperation, and a continuous improvement culture. This strategy guarantees a quicker time to market for products, giving businesses a competitive advantage in ever-changing markets.`,
      },
      {
        title:
          "How does DevOps consulting contribute to improved software development lifecycle in your company?",
        desc: `DevOps consulting services can automate ineffective procedures, improve communication between development and operations teams, and apply continuous integration and deployment techniques. They use DevSecOps to address security and compliance issues, improve scalability, and encourage cultural transformation, which changes the overall efficacy and efficiency of the software development lifecycle in your company.`,
      },
      {
        title: "Why choose Zweidevs for DevOps?",
        desc: `Zweidevs creates a cooperative alliance in which we closely collaborate with your teams to promote open communication, shared accountability, and a shared enthusiasm for accomplishing your company's DevOps goals.`,
      },
    ],
  },
  "E-commerce Development": {
    image: WebDevServiceDetailsIcon,
    headerTitle: "Building robust, user-friendly platforms",

    headerDescription:
      "Experience a complete e-commerce journey with our service, covering everything from intuitive design and robust security to seamless payment processing, efficient inventory management, hassle-free checkout, and responsive customer support.",
    heading: `Design, inventory management, and responsive customer support`,
    description: `Customized E-commerce Solutions for Seamless Shopping Experiences and Business Success!

    At Zweidevs, we pride ourselves on offering comprehensive services for your business into the digital forefront. Our adept team of developers combines expertise with innovation to create e-commerce software solutions tailored to your requirements. We leverage cutting-edge technologies, adhere to the highest industry standards, and employ agile methodologies to ensure adaptability and responsiveness throughout the development lifecycle.
    `,

    offeringCardData: [
      {
        cardImage: designIcon,
        cardTitle: "Experience Design",
        cardDesc:
          "Intuitive experience design takes center stage to elevate user journeys with Zweidevs’ E-commerce development services.",
      },
      {
        cardImage: frontendIcon,
        cardTitle: "Frontend Development",
        cardDesc:
          "Bring your E-commerce vision to life with Zweidevs’ expert frontend development.",
      },
      {
        cardImage: backendIcon,
        cardTitle: "Backend Development",
        cardDesc:
          "Power your E-commerce platform through our expertise in delivering scalable Backend development solutions.",
      },
      {
        cardImage: fullstackIcon,
        cardTitle: "Full Stack Development",
        cardDesc:
          "Experience end-to-end E-commerce excellence with Zweidevs’ full-stack development services.",
      },
      {
        cardImage: ecommerceIcon,
        cardTitle: "Maintenance and Updates",
        cardDesc:
          "Sustain and evolve your E-commerce success, ensuring your web application stays aligned with industry trends.",
      },
    ],
  },
  [urls.services.MobileApp.title]: {
    image: MobodevServiceDetailsIcon,
    targetAudienceSection: {
      title: `We Build Custom Mobile Applications For`,
      desc: `At Zweidevs, our specialty is creating custom mobile applications that are suited to the distinct requirements of companies of all sizes. Our committed staff uses state-of-the-art technology and a customer-focused methodology to provide tailored mobile solutions that effortlessly fit the goals and ambitions of companies of all sizes.`,
      targetAudienceCardData: [
        {
          cardTitle: "Startups",
          cardDesc: `Understanding the unique needs and goals of startups, we offer them scalable and reasonably priced mobile solutions to build strong online presences. Our mission is to offer innovative, excellent, and reasonably priced mobile solutions that enable startups to prosper in the digital environment, whether they are starting a new business or expanding their current digital capabilities.`,
        },
        {
          cardTitle: "Medium Businesses",
          cardDesc: `Our committed staff is aware of the complex difficulties and expansion goals faced by medium-sized companies. Using this information, we provide solutions that help them achieve their objectives—whether those be boosting customer engagement, optimizing internal processes, or growing their online presence. Our holistic methodology guarantees that the mobile applications we create are precisely customized to satisfy the distinct needs of medium-sized businesses.`,
        },
        {
          cardTitle: "Large Businesses",
          cardDesc: `The primary objective of Zweidevs is to design unique mobile apps that work in unison with the complex processes of big businesses. We prioritize performance, security, and innovation to ensure that our solutions enable large businesses to thrive in the dynamic digital landscape, fostering efficiency, growth, and long-term success. This includes improving digital interactions at scale, developing robust enterprise solutions, and streamlining complex business processes.`,
        },
      ],
    },
    projectData: [
      {
        index: 1,
        image: Mobo1,
        title: "Neverleft",
        content: `A more efficient method for managing venue operations that incorporates data analytics, enhanced event ticketing, and digital cloakroom ticketing.`,
      },
      {
        index: 2,
        image: Mobo2,
        title: "You Salon",
        content: `An application that provides an online salon booking solution with the solution of choosing with respect to ratings and other data like popularity within the specific area. You can also have a track record history of your saloon selections.`,
      },
      {
        index: 3,
        image: Mobo3,
        title: "Hooked Health",
        content: `Discover how to achieve metabolic advantage and develop a positive mindset with fitness and mindset training created just for women. Aim for your particular body part to accelerate outcomes.`,
      },
      {
        index: 4,
        image: Mobo4,
        title: "AudioCardio",
        content: `Improve your hearing with the evidence-based mobile app AudioCardio, which provides inaudible sound therapy to improve hearing and reduce tinnitus. This gives people an easily accessible, reasonably priced, and socially stigma-free treatment.`,
      },
    ],
    productionDevSection: {
      title: `How We Develop Mobile Applications`,
      desc: `Zweidevs takes you through every step of your mobile app development journey, offering a full suite of services custom-tailored to your unique needs. Our team is here to collaborate closely with you, providing insightful guidance and consistent support at every stage, ensuring strategic decisions are well-informed and consistent assistance is provided throughout the entire process.`,
      cardsData: [
        {
          cardTitle: "Discovery",
          cardDesc: `Embark on your mobile app journey with Zweidevs by undergoing a dedicated discovery phase. This crucial step allows us to explore your app's concept, define core requirements, and evaluate the viability of your investment. Through in-depth discussions, we delve into intended functionality and address the challenges your mobile app aims to overcome, enabling us to determine project complexity and provide accurate time and cost estimates.`,
        },
        {
          cardTitle: "Design",
          cardDesc:
            "Our design team lays the foundation for captivating mobile app designs through the meticulous development of interactive prototypes, figma designs and wireframes. We prioritize user flow, ensuring a seamless navigation experience validated through user testing. Recognizing the critical value of a captivating first impression, we emphasize visual appeal in user interface design, fostering long-lasting relationships between businesses and their clients.",
        },
        {
          cardTitle: "Development",
          cardDesc: `Adopting Agile as our primary project management approach, Zweidevs ensures high-quality products with user-friendliness as our main focus, security, risk reduction, and client control over their projects in mobile app development. Our iterative development process breaks down into manageable sprints, encompassing careful planning, development, testing, and documentation. Thorough testing precedes every release, ensuring bug-free functionality and steady progress.`,
        },
        {
          cardTitle: "Release",
          cardDesc: `The mobile app development process concludes with a meticulous release phase. Our quality assurance engineers conduct thorough manual and automated testing to guarantee flawless operation. All components, data, and code are deployed to production, with release notes serving as technical documentation. These notes provide comprehensive details on added features and resolved bugs, benefiting both internal and external users.`,
        },
        {
          cardTitle: "Support and Maintenance",
          cardDesc: `Zweidevs is committed to delivering sustained success with 3 months free of cost post-launch maintenance and support which is designed to keep your app performing at its best. Our clients enjoy flexibility in maintenance options, opting for a hassle-free monthly subscription model or by consolidating tasks into a backlog for convenient handling. Our dedicated team, well-versed in the intricacies of mobile app development, goes the extra mile to guarantee that your app not only meets but exceeds your expectations over time. Experience app development excellence with Zweidevs—where your success is our ongoing commitment.`,
        },
      ],
    },
    techStackCardData: {
      cardsData: [
        {
          cardTitle: "Mobile",
          chipData: ["iOS", "Kotlin", "Dart", "React Native", "Ionic"],
        },
      ],
    },
    headerTitle:
      "Crafted for Excellence - Your High-Performance Mobile App Solution",

    headerDescription:
      "Zweidevs is your go-to mobile app developer agency, providing tailored mobile app development services to precisely match your company's needs. We guarantee the delivery of quality solutions alongside low cost mobile app development that serve several sectors by utilizing a strategic plan of action. We specialize in providing solutions that handle Healthcare, Fintech, Edtech, Blockchain, E-commerce and many more.",
    heading: `Experience The Best Intuitive User Interface (UI) And Responsive Design`,
    description: `Enter a world of first-rate digital experiences by visiting our Mobile App Development Hub. 

    Discover the best user-friendly interface and responsive design, meticulously crafted for seamless interaction. As pioneers in mobile app development, we guarantee not just cost-effective solutions but a commitment to quality that reflects in every pixel. Whether you're seeking to choose a mobile app development company or cross-platform expertise, you can trust that your ideas are in the hands of elite professionals who will guarantee the highest standards of excellence.
    We create concepts that are effortlessly realized, from responsive interfaces to UI/UX designs that are intuitive. Your specific needs and ideas find a home with us, whether you're thinking of cross-platform functionality or require mobile app experts. Elevate your mobile experience with solutions crafted exclusively for You!`,

    offeringCardData: [
      {
        cardImage: hybirdMoboIcon,
        cardTitle: "Hybrid Mobile App Development",
        cardDesc:
          "Zweidevs excels in hybrid app development, ensuring a seamless user experience across diverse devices. With our native app development experience, tailored for the iOS and Android platforms, you can completely engross your audience in platform-specific excellence. If you're contemplating how to hire a mobile app developer for your hybrid app idea, Zweidevs is your strategic partner in transforming concepts into reality.",
      },
      {
        cardImage: mobo2Icon,
        cardTitle: "Native Mobile App Development",
        cardDesc:
          "Ensure optimal performance and deliver an exceptional user experience tailored to each device. With Zweidevs' Native App Development services, your application is finely tuned for both iOS and Android platforms, ensuring it excels in performance and provides a superior user interface across all devices. Gain complete control and access to platform-specific code, guaranteeing your native app is optimized for each operating system, resulting in an unparalleled user experience.",
      },
      {
        cardImage: mobo3Icon,
        cardTitle: "Wearables and Embedded Software",
        cardDesc:
          "Embark on a journey into digital innovation with Zweidevs' mobile development solutions, expanding your digital reach through Wearables and Embedded Software. Our services are intricately designed to meet your specific needs, whether it's creating cutting-edge software for smartwatches, fitness trackers, or other wearables. Zweidevs brings precision and innovation to the forefront of wearable and embedded software development.",
      },
    ],

    faqData: [
      {
        title: "How to hire a Mobile app developer for an idea?",
        desc: `Get to the very bottom of our website, Click on the ‘INSTANT BOOKING’ option and connect with us to hire dedicated cross-platform and native mobile app developers.`,
      },
      {
        title: "How much does mobile app development cost?",
        desc: `The cost of developing a mobile app is influenced by its complexity, required features, technology stack, team experience, and other factors like design, testing, and maintenance. Working with mobile development experts or agencies is crucial if you want a clear understanding of your vision for the mobile application and a more precise estimate based on your unique requirements. Connect with our mobile developers to know the exact cost estimation.`,
      },
      {
        title:
          "What is mobile app development, and how can it benefit my business?",
        desc: `Mobile app development involves creating software applications specifically designed to run on mobile devices. It offers businesses adaptable and affordable options. Their cross-platform compatibility ensures a uniform user experience on various devices and operating systems. Essentially, mobile app development gives companies the ability to create effective, easily accessible, and scalable solutions that they can use to keep up with changing technology and market demands.`,
      },
      {
        title: "How long does it take to develop a mobile application?",
        desc: `A simple mobile app with basic features might take a few weeks to a couple of months to develop, while more complex or enterprise-level applications could take several months or even a year. Rapid development frameworks and agile development methodologies can expedite the process, but it's essential to balance speed with thorough testing and quality assurance.`,
      },
      {
        title:
          "What are the differences between native and hybrid mobile app development, and what are their pros and cons?",
        desc: `Native mobile app development involves creating apps for a specific mobile operating system (e.g., iOS or Android), providing high performance and access to native device features. Hybrid mobile app development uses a single codebase for multiple platforms, offering faster development but potentially sacrificing some performance. Zweidevs excels in both native and hybrid mobile app development, offering comprehensive solutions tailored to your project's unique needs.`,
      },
      {
        title: "Why choose Zweidevs for mobile application development?",
        desc: `At Zweidevs, we don't just develop mobile apps—we craft reliable, approachable and cost effective solutions that add value to your company and demonstrate our constant commitment to quality and client happiness. Having completed numerous projects successfully and leaving our clients happy, we place a high value on open communication and teamwork during the whole development process. Connect with our experts right away to hire dedicated mobile app developers.`,
      },
      {
        title:
          "How do you ensure the security of the mobile applications you develop?",
        desc: `An emphasis on mobile application security can be done through frequent audits, thorough code reviews, and encryption. We adhere to the least privilege principle and use strong authentication. The result is secure mobile apps that successfully reduce cybersecurity risks and prioritize data protection.`,
      },
      {
        title:
          "Do you provide ongoing maintenance and support after the mobile app is launched?",
        desc: `Yes, we at Zweidevs recognize the value of continuous upkeep and assistance. We provide thorough maintenance services, which include bug repairs, updates, and optimizations, to guarantee your application keeps running smoothly. As your company grows, our support staff is here to help with any necessary improvements or modifications and to quickly resolve any issues that may arise.`,
      },
      {
        title:
          "What service should I go for, hybrid mobile app development or Native mobile app development?",
        desc: `When deciding between hybrid and native mobile app development, consider factors such as project complexity, cost, time, user experience and features. For intricate functionalities and a seamless user experience akin to native apps, choose our native development services at Zweidevs. We specialize in crafting robust native applications tailored to your specific needs. On the other hand, if your project leans towards simplicity with cross-platform requirements, our hybrid development services provide a faster development cycle, ensuring a cost-effective and efficient solution. Trust Zweidevs to guide your decision based on your unique project requirements.`,
      },
    ],
  },
  [urls.services.AI.title]: {
    image: AIdevServiceDetailsIcon,
    targetAudienceSection: {
      title: `We Build Custom AI Applications For`,
      desc: `At Zweidevs, we specialize in creating custom online apps that are
      carefully designed to match the distinct requirements of companies
      of all sizes. Our committed team of professionals uses
      state-of-the-art technology and a client-focused methodology to
      provide customized solutions that effortlessly match the objectives
      and ambitions of companies of any size.`,
      targetAudienceCardData: [
        {
          cardTitle: "Startups",
          cardDesc: `We are experts in creating unique AI and ML solutions for Startups that address their unique growth goals and business difficulties. Our customized strategy guarantees affordable yet practical solutions, enabling firms to use artificial intelligence's advantages to optimize workflows, make data-driven choices, and promote creativity.`,
        },
        {
          cardTitle: "Medium Businesses",
          cardDesc: `We provide customized technology that increases productivity, automates procedures, and uncovers insightful information since we recognize the particular difficulties faced by companies of this size. Our adaptable solutions are made to give small and medium-sized enterprises the resources they need to be flexible, make wise decisions, and promote long-term growth in a market that is changing quickly.`,
        },
        {
          cardTitle: "Large Businesses",
          cardDesc: `Our solutions guarantee efficiency, strategic insights, and a competitive edge in today's fast-paced business environment, emphasizing tackling the particular issues faced by significant organizations. Our goal is to enable large businesses to utilize AI and ML for full long-term success and growth. We have experience in manufacturing, retail, healthcare, finance, and other industries.`,
        },
      ],
    },
    projectData: [
      {
        index: 1,
        image: ai1,
        title: "AI VST",
        content: `A platform that offers high-end DAW plugins and tools to improve audio and voice recordings. Our work entails creating and executing Visual Studio technology plugins that convert user-generated audio into professional artist-grade sound. Yonder Audio’s primary goal for consumers looking for better audio material is to provide a smooth experience.`,
      },
      {
        index: 2,
        image: ai2,
        title: "Twinciti",
        content: `Twinciti is a robust infrastructure that powers future applications, including 3D graphics and machine learning. It developed ML services and virtual machine generation for cloud services to provide a flexible and scalable platform for various application requirements.`,
      },
      {
        index: 3,
        image: ai3,
        title: "Amazebot",
        content: `Communicate easily with Amazebot, your AI conversation partner who can converse via text, graphics, examples, and more. Amazebot makes every interaction simple and unique.`,
      },
    ],
    productionDevSection: {
      title: `How We Utilize AI in Your Project`,
      desc: `Unlock the power of AI and ML with us. We specialize in cutting-edge solutions, transforming data into insights and fostering innovation. Elevate your business with intelligent technologies.`,
      cardsData: [
        {
          cardTitle: "Analysis",
          cardDesc: `We carefully review your project's goals, specifications, and difficulties throughout the analysis stage. This crucial stage entails creating a strategy roadmap, defining essential performance indicators, and evaluating the viability and extent of AI integration. To ensure that the next phases in the AI utilization process smoothly match the objectives of your project for the best results, our analytical approach lays the foundation for informed decision-making.`,
        },
        {
          cardTitle: "Discovery of Data",
          cardDesc:
            "To create a strong basis for AI integration, we methodically locate and investigate suitable datasets throughout the data discovery phase. In order to ensure a thorough awareness of the information landscape, this critical stage entails finding and acquiring multiple data sources. With our careful approach to data discovery, we can reveal significant insights and facilitate well-informed decision-making in your project by laying the groundwork for efficient modeling and analysis.",
        },
        {
          cardTitle: "Modeling",
          cardDesc: `During the modeling phase, we build powerful AI models according to the particular needs of your project using complex algorithms and statistical methodologies. In this step, complex frameworks are created to help the system recognize patterns, forecast outcomes, and extract valuable information from the data. Our rigorous modeling procedure guarantees the development of reliable and effective AI systems, paving the way for well-informed decision-making and the best possible project results.`,
        },
        {
          cardTitle: "Evaluation and Insights",
          cardDesc: `We carefully evaluate AI models' performance during the assessment and insights phase to make sure they are accurate and dependable. Analyzing model outputs and improving algorithms to increase efficacy are crucial steps. We derive useful insights from the data through thorough examination, giving you actionable information that supports strategic planning and well-informed decision-making for the success of your project.`,
        },
        {
          cardTitle: "AI Solutions",
          cardDesc: `We put into practice and deploy customized AI systems made to take advantage of particular project prospects and obstacles. Using cutting-edge models, algorithms, and technology is what this phase entails in order to optimize workflows, boost productivity, and stimulate creativity. Zweidevs AI solutions are designed to have a quantifiable effect, giving your project cognitive capabilities and guaranteeing long-term success in a changing environment.`,
        },
      ],
    },
    techStackCardData: {
      cardsData: [
        {
          cardTitle: "AI & ML",
          chipData: ["OpenAI", "PyTorch", "Keras", "openNN"],
        },
      ],
    },
    headerTitle:
      "Elevate Innovation with Artificial Intelligence & Machine Learning in Your Business",

    headerDescription:
      "Set out on a revolutionary journey where the combination of machine learning (ML) and artificial intelligence (AI) is tailored to your company's unique requirements. Observe how complex tasks are automated, decisions are made with knowledge, and a data-driven strategy that easily adjusts to your unique needs. Integrate AI and ML solutions to optimize operations and provide the foundation for revolutionary development to stay ahead of the competition.",
    heading: `Cutting-Edge AI and ML Services`,
    description: `Welcome to Zweidevs, where our artificial intelligence-driven solutions redefine the boundaries of corporate intelligence and creativity. Here, the possibilities are truly endless. Leveraging the revolutionary potential of Artificial Intelligence (AI) and Machine Learning (ML), we provide an extensive range of services aimed at propelling your company forward.
    Our AI and ML solutions are carefully developed to satisfy the particular requirements of your sector. Whether you aim to increase consumer engagement, automate operations, or extract valuable insights from your data, our services are built to go above and beyond.`,

    offeringCardData: [
      {
        cardImage: ai1Icon,
        cardTitle: "Custom AI and ML Solutions",
        cardDesc:
          "Using specially designed intelligent applications, you can empower your company with artificial intelligence-driven solutions customized to meet your specific requirements. Our specially designed intelligent apps guarantee a personalized strategy, giving you access to finely adjusted algorithms that smoothly mesh with your particular requirements.",
      },
      {
        cardImage: ai2Icon,
        cardTitle: "Data Discovery & Augmentation",
        cardDesc:
          "With the use of predictive analytics and third-party data, Zweidevs' Data Discovery & Augmentation services may help you gain extensive customer insights. Our methodology guarantees a comprehensive perspective of clients, enabling informed strategic decision-making through enhanced data.",
      },
      {
        cardImage: ai3Icon,
        cardTitle: "Data Science and Analytics",
        cardDesc:
          "Convert unprocessed data into useful business knowledge by utilizing cutting-edge data science and analytics. Make use of advanced statistical models and algorithms to extract valuable insights that facilitate well-informed decision-making.",
      },
      {
        cardImage: ai4Icon,
        cardTitle: "AI-powered Chatbots",
        cardDesc:
          "Zweidevs uses its expertise in AI and ML to create sophisticated chatbots that transform consumer relationships. Our sophisticated chatbots are made to increase user interaction by offering smooth, customized interactions. Leverage the effectiveness of state-of-the-art technology to promote creative thinking in communication approaches.",
      },
      {
        cardImage: ai5Icon,
        cardTitle: "AI Integration with Existing Systems",
        cardDesc:
          "Embrace the advantages of an integrated ecosystem, where AI integration streamlines processes and brings in a new wave of creativity for your company. Zweidevs creates an intelligent infrastructure by integrating AI with your current systems in a smooth manner. Our method guarantees a seamless transfer, improving the effectiveness and flexibility of the system.",
      },
      {
        cardImage: ai6Icon,
        cardTitle: "Data Democratization",
        cardDesc:
          "Throughout your company, democratize access to insights and cultivate a data-driven culture where decision-makers can easily leverage data. With Zweidevs, you can empower your entire team to have more equitable access to insights and cultivate a data-driven culture",
      },
    ],

    faqData: [
      {
        title:
          "What is Artificial Intelligence, and how can it benefit my business?",
        desc: `The simulation of human intelligence in machines, which enables them to carry out activities that generally require human cognition, is known as artificial intelligence (AI). This includes learning, solving problems, comprehending language, and making decisions. There are several advantages to using AI in your company. Repetitive tasks can be automated with AI, increasing productivity and lowering costs. It offers insights derived from data, facilitating better decision-making. Predictive analytics helps streamline procedures, while artificial intelligence (AI) applications like chatbots improve client relations.`,
      },
      {
        title:
          "How is Machine Learning different from Artificial Intelligence?",
        desc: `While machine learning (ML) focuses on machines that learn from data without explicit programming, artificial intelligence (AI) is a more general term that refers to machines that can execute activities that resemble human intelligence.`,
      },
      {
        title: "How can businesses implement AI and ML?",
        desc: `Establishing precise goals, obtaining high-quality data, choosing suitable algorithms, and frequently working with specialists or using AI/ML platforms are all necessary for implementing AI and ML.`,
      },
      {
        title: "What are some real-world applications of AI and ML?",
        desc: `Applications for AI and ML can be found in many different industries, such as marketing (client segmentation), banking (fraud detection), healthcare (diagnostic and treatment planning), and autonomous vehicles.`,
      },
    ],
  },
  [urls.services.UIUX.title]: {
    image: UiUxServiceDetailsIcon,
    targetAudienceSection: {
      title: `UI/UX Design Services For Every Business, By Zweidevs`,
      desc: null,
      targetAudienceCardData: [
        {
          cardTitle: "Small Business Solutions",
          cardDesc: `Zweidevs understands the unique challenges and aspirations of small businesses. Our UI/UX design services are crafted to be agile, cost-effective, and growth-oriented. We've empowered numerous small businesses to enhance their digital presence, create engaging user experiences, and lay a solid foundation for future growth.`,
        },
        {
          cardTitle: "Medium-Sized Business Excellence",
          cardDesc: `For medium-sized businesses navigating growth, Zweidevs offers tailored UI/UX design solutions that strike the perfect balance between scalability and efficiency. Our collaborative approach ensures that your digital presence not only meets current needs but anticipates future requirements, fostering sustained growth and market relevance.`,
        },
        {
          cardTitle: "Enterprise-Grade Innovation",
          cardDesc: `At Zweidevs, we bring a wealth of experience in designing software for enterprises. Our UI/UX solutions are engineered to align seamlessly with the complex needs of large businesses. From creating intuitive interfaces to optimizing user experiences at scale, we've partnered with enterprises to drive innovation, boost efficiency, and elevate their digital ecosystem.
          No matter the size of your business, Zweidevs is your trusted partner for UI/UX design services, ready to propel your digital journey to new heights.`,
        },
      ],
    },
    projectData: [
      {
        index: 1,
        image: UiUX1,
        title: "Paket Taxi",
        content: `One creative project that addresses businesses' courier needs is PaketTaxi. It reduces courier risks while still meeting the demands of businesses for logistical services. It provides distribution and transportation services for various products, including restaurant orders and e-commerce deliveries.`,
      },
      {
        index: 2,
        image: UiUX2,
        title: "Seatedapp",
        content: `Seated transforms eating out by providing users with a fulfilling experience and essential support for nearby eateries. Reserve and earn points with a broader selection of restaurants, availability, and benefits like credits for secure and luxurious rides to your reservations.`,
      },
      {
        index: 3,
        image: Web9,
        title: "Humanava",
        content: `You can realize your full potential with Humanava, a platform providing personal development courses to accelerate human progress. Embrace leadership, diversity, and mindfulness, connect with people worldwide, and discover your hidden brilliance to secure a bright future.`,
      },
      {
        index: 4,
        image: UiUX4,
        title: "CryptoLinx",
        content: `Integrate announcements, updates, and crucial information into a URL to facilitate communication with your audience on various channels. With CryptoLinx, you can simplify cryptocurrency marketing.`,
      },
    ],
    productionDevSection: {
      title: `How We Craft Memorable Emorable UI/UX Designs At Zweidevs`,
      desc: `Embark on a personalized UI/UX journey with Zweidevs, where every step is tailored to your vision.`,
      cardsData: [
        {
          cardTitle: "Discovery",
          cardDesc: `Our UI/UX journey begins by delving into your world. We kick off with a collaborative conversation, understanding your goals and gathering insights.`,
        },
        {
          cardTitle: "Data-Driven Insights",
          cardDesc:
            "Armed with your aspirations, we leverage data-driven design thinking to align our approach with your audience's expectations. Through research, we uncover not just industry norms but nuances that set the stage for a unique user experience.",
        },
        {
          cardTitle: "User-Centric Mapping",
          cardDesc: ` We chart the course for an intuitive user journey, mapping out entry points, steps, and interactions. This ensures that every design decision is rooted in prioritizing your users' needs.`,
        },
        {
          cardTitle: "Wireframing Magic",
          cardDesc: `Our designers, inspired by your requirements and industry trends, breathe life into concepts. Figma wireframes take shape, ensuring clarity and simplicity, guiding users effortlessly through each screen.`,
        },
        {
          cardTitle: "Unified Design System",
          cardDesc: `As your product evolves, we ensure design harmony with a meticulous design system. This catalog of colors, patterns, and fonts not only maintains consistency but paves the way for seamless scalability.`,
        },
        {
          cardTitle: "UI Testing",
          cardDesc: `Our QA experts rigorously test the visual and structural aspects of your product. From field widths to navigational elements, we leave no stone unturned, employing a mix of manual and automated tests for a flawless UI.
          At Zweidevs, our personalized UI/UX journey is a fusion of your vision and our expertise. Contact our expert UI/UX Designers to create digital experiences that resonate and endure.`,
        },
      ],
    },
    techStackCardData: {
      cardsData: [
        {
          cardTitle: "UI/ UX Design",
          chipData: ["Figma", "Canva", "Adobe xd", "Invision"],
        },
      ],
    },
    headerTitle: "Find the top UI/UX Design and Development Services",

    headerDescription:
      "Transform your brand's impact with uur UI/UX development services, creating the ultimate interface experience for your customers.",
    heading: `Elevate Your Digital Journey by Choosing Zweidevs as Your Goto UI/UX Design and Development Services Agency`,
    description: `Start your digital adventure hand-in-hand with Zweidevs, the leading UI/UX Design and Development Services agency and redefine your online identity. We're not just here to design interfaces; we're dedicated to crafting experiences that resonate with you. Picture a digital realm where every click feels like a tailored experience, leaving a smile on your face.
    Join forces with Zweidevs, where our UI/UX service is more than pixels and layouts – it's about making your digital space a cozy home for your users. We create moments that matter, blending seamless navigation with visually stunning aesthetics. At Zweidevs, your satisfaction isn't just a checkbox; it's the heartbeat of our design philosophy.
    Let's not just transform your online presence; let's make it a captivating journey where you're not just a user but a cherished companion. Because at Zweidevs, we don't just care about design; we care about you.`,

    offeringCardData: [
      {
        cardImage: uiux1Icon,
        cardTitle: "Complimentary UI/UX for Websites",
        cardDesc:
          "Embarking on a website development project? Benefit from our free UI/UX design services, including Figma, wireframes, and userflows, ensuring a visually appealing and user-friendly digital platform.",
      },
      {
        cardImage: uiux2Icon,
        cardTitle: "Personalized Design Solutions",
        cardDesc:
          "Our UI/UX experts are dedicated to creating aesthetic designs tailored to your unique brand identity and goals.",
      },
      {
        cardImage: uiux3Icon,
        cardTitle: "Comprehensive Userflows",
        cardDesc:
          "Navigate user interactions seamlessly with our meticulously crafted userflows, ensuring an intuitive and engaging user experience.",
      },
      {
        cardImage: uiux4Icon,
        cardTitle: "Dynamic Figma Designs",
        cardDesc:
          "Experience the power of visually stunning Figma designs that bring your ideas to life and lay the foundation for a captivating digital presence.",
      },
      {
        cardImage: uiux5Icon,
        cardTitle: "Expert Consulting",
        cardDesc:
          "Leverage our UX/UI expertise for insightful consulting, guiding you through strategic decisions to optimize user experiences and achieve your business objectives.",
      },
    ],

    faqData: [
      {
        title: "What if I skip the UI/UX designing step?",
        desc: `Skipping the UI/UX design step could lead to significant challenges. UI/UX design is not just about aesthetics; it's the foundation of a positive user experience. Without it, you risk creating a product that may not resonate with your target audience, resulting in lower user satisfaction, increased bounce rates, and potential setbacks in achieving your business goals.`,
      },
      {
        title: "Does a UI/UX designer cost a lot?",
        desc: `The cost of a UI/UX designer varies based on the project's complexity and requirements. At Zweidevs, we understand the importance of a well-designed digital presence. For website projects, we provide complimentary UI/UX design services, including Figma, wireframes, and user flows. Our aim is to ensure client satisfaction with designs without additional costs.`,
      },
      {
        title: "How do UI/UX design services help businesses?",
        desc: `UI/UX design services play a crucial role in enhancing user satisfaction, engagement, and overall business success. At Zweidevs, we tailor our services to your business needs. By understanding your unique requirements, we provide personalized design solutions that can optimize user experiences, increase conversions, and ultimately contribute to the growth of your business. Bring your queries and ideas to us, and we'll guide you through the possibilities.`,
      },
      {
        title: "How to choose the right UX/UI design services company?",
        desc: `Selecting the right UX/UI design services company is vital. Look for a provider with relevant experience by checking client reviews, cooperation duration, and client referrals. Explore case studies to ensure they've tackled challenges similar to yours. Assess their approach to delivering user experience design services, emphasizing analytics. If considering an offshore option, verify time zone compatibility and language proficiency. Zweidevs assures a comprehensive and client-focused approach to meet your UI/UX design needs.`,
      },
    ],
  },
  [urls.services.IoT.title]: {
    image: IotServiceDetailsIcon,
    targetAudienceSection: {
      title: `We Build Custom IoT Applications For`,
      desc: `At Zweidevs, we specialize in creating custom online apps that are
      carefully designed to match the distinct requirements of companies
      of all sizes. Our committed team of professionals uses
      state-of-the-art technology and a client-focused methodology to
      provide customized solutions that effortlessly match the objectives
      and ambitions of companies of any size.`,
      targetAudienceCardData: [
        {
          cardTitle: "Small Businesses",
          cardDesc: `Our personalized IoT solutions for small businesses boost productivity and efficiency. We are aware of the unique needs of small businesses, where simplicity and affordability are critical factors. Zweidevs offers reasonably priced Internet of Things (IoT) device solutions that easily fit into the operations of small businesses, streamlining procedures like customer interaction, security, and inventory management. Our committed support team makes sure that the onboarding process runs smoothly by providing assistance at every turn.`,
        },
        {
          cardTitle: "Medium-Sized Businesses",
          cardDesc: `For medium-sized businesses, our IoT services cater to a broader scale of operations. Delivering IoT solutions that meet the particular difficulties faced by mid-sized businesses is Zweidevs' area of expertise. Our services are made to grow with your company, whether you're looking to improve energy management, streamline manufacturing procedures, or deploy intelligent logistics systems. We make sure that your IoT devices are designed to meet the unique requirements of your industry and growth trajectory by providing extensive support and customization.`,
        },
        {
          cardTitle: "Large Businesses",
          cardDesc: `Large enterprises benefit from our sophisticated IoT solutions that scale seamlessly with expansive operations. Zweidevs understands the complexity of managing diverse and extensive IoT ecosystems within large organizations. Our services encompass advanced device connectivity, data analytics, and security measures to meet the high demands of large-scale deployments. We provide robust support and integration services, ensuring that your IoT infrastructure operates at peak performance while addressing the unique challenges faced by large enterprises.`,
        },
      ],
    },
    projectData: [
      {
        index: 1,
        image: iot1,
        title: "Oven Homes",
        content: `With Oven Homes' IoT system, you can easily control your house system, including temperature and electronics, with your smart smartphone. It provides convenient ON/OFF switch options, temperature management, and a thorough analytics dashboard for increased home automation.`,
      },
      {
        index: 2,
        image: iot2,
        title: "BaytiSmart",
        content: `With the help of Internet of Things applications, BaytiSmart transforms home management and offers seamless control over appliances like lighting and thermostats for a more intelligent and effective living space.`,
      },
      {
        index: 3,
        image: iot3,
        title: "Zarget Lights",
        content: `Zarget Lights is a revolutionary IoT-based application that offers smart and easy administration of your lighting systems. It's the lighting control of the future.`,
      },
    ],
    productionDevSection: {
      title: `How We Develop IoT Applications`,
      desc: `A holistic approach to IoT device development and implementation is followed to ensure optimal results.`,
      cardsData: [
        {
          cardTitle: "Consultation and Requirement Analysis",
          cardDesc: `To commence the process, we comprehend your unique requirements, company goals, and operational difficulties. We design devices and develop solutions based on this analysis.`,
        },
        {
          cardTitle: "Development and Prototyping",
          cardDesc:
            "Our engineers and developers design unique IoT devices that meet your needs and produce working prototypes. We make sure that security procedures, industry standards, and laws pertaining to data privacy are followed.",
        },
        {
          cardTitle: "Combination and Examination",
          cardDesc: `We integrate IoT devices with current systems, networks, or platforms seamlessly by conducting rigorous testing and quality assurance procedures.`,
        },
        {
          cardTitle: "Deployment and Maintenance",
          cardDesc: `Our company assists you in deploying IoT devices across your infrastructure. Regular maintenance, remote monitoring, and timely updates are offered to guarantee seamless operations and reduce possible risks. We implement solutions that use data analytics and machine learning, which help us predict when IoT devices or equipment will likely fail, allowing for proactive maintenance and minimizing downtime.`,
        },
      ],
    },
    techStackCardData: {
      cardsData: [
        {
          cardTitle: "IoT Devices",
          chipData: ["RaspberryPi", "Arduino"],
        },
      ],
    },
    headerTitle:
      "Zweidevs: Your Gateway to IoT Devices Services and Innovation",

    headerDescription:
      "Discover intelligent solutions that transform everyday spaces into smart, responsive environments. Zweidevs brings you unparalleled convenience, security, and sustainability across various domains, from smart homes to industrial ecosystems. Step into a connected world where possibilities are endless.",
    heading: `Empowering Tomorrow's Connectivity with Zweidevs’ IoT Services`,
    description: `Our IoT services go above and beyond by providing cutting-edge solutions that transform how you interact with and manage your environment. Imagine a smooth encounter where your surroundings intelligently adapt to your needs. Zweidevs offers a portal to a connected world, making sure your interactions are simple, clear, and customized to your tastes—whether in smart homes or intricate industrial ecosystems. Greetings from a future in which being connected becomes a necessity for day-to-day living, streamlining chores and improving your quality of life.`,
    offeringCardData: [
      {
        cardImage: iot1Icon,
        cardTitle: "Device Connectivity",
        cardDesc:
          "One of the fundamental services we offer is setting up and maintaining connectivity for IoT devices, which guarantees smooth communication between devices and central systems. To build a solid connectivity framework, we have experience with a wide range of communication protocols, network architectures, and security controls.",
      },
      {
        cardImage: iot2Icon,
        cardTitle: "Data Management and Analytics",
        cardDesc:
          "Our expertise lies in gathering, handling, and evaluating data produced by IoT devices in order to derive significant insights. Our all-inclusive data management solutions facilitate informed decision-making and actionable intelligence by storing, cleaning, and employing cutting-edge analytics tools.",
      },
      {
        cardImage: iot3Icon,
        cardTitle: "Security Solutions",
        cardDesc:
          "Security is paramount in IoT, and our services include implementing robust measures to safeguard devices and data. The security of your IoT ecosystem is our top priority, and we take steps to prevent unwanted access through authentication and encryption.",
      },
      {
        cardImage: iot4Icon,
        cardTitle: "IoT Platform Development",
        cardDesc:
          "The creation and customization of platforms that enable effective management, monitoring, and control of linked devices is the main focus of our IoT platform development services. These platforms offer a strong basis for your IoT infrastructure, enhanced with features like data visualization, device provisioning, and smooth application integration.",
      },
      {
        cardImage: iot5Icon,
        cardTitle: "Edge Computing",
        cardDesc:
          "We are adept at allocating processing power in closer proximity to the data source. We use edge computing to lower latency and improve processing capabilities in real-time. This tactical method processes data at the edge of the network to maximize the performance of Internet of Things applications.",
      },
      {
        cardImage: iot6Icon,
        cardTitle: "Device Management",
        cardDesc:
          "Zweidevs offers comprehensive device management services, allowing you to monitor, manage, and update IoT devices remotely. This allows for a smooth integration into your IoT ecosystem while guaranteeing maximum performance and security for the duration of your devices' lives.",
      },
      {
        cardImage: iot7Icon,
        cardTitle: "Asset Tracking and Management",
        cardDesc:
          "We provide customized IoT solutions to effectively manage automobiles, equipment, or inventory in addition to real-time asset tracking. The asset tracking and management services from Zweidevs can help you see more clearly into your assets, streamline processes, and increase overall effectiveness.",
      },
      {
        cardImage: iot8Icon,
        cardTitle: "Environmental Monitoring",
        cardDesc:
          "Using Internet of Things (IoT) devices to keep an eye on factors like climate, water quality, and air quality for a range of purposes, such as public health and environmental conservation.",
      },
    ],
    faqData: [
      {
        title: "What are IoT devices?",
        desc: `The term "Internet of Things" (IoT) refers to the physical objects that are embedded with connectivity features, software, and sensors that allow them to exchange data with other devices and systems over the internet. These gadgets, which add to an interconnected and intelligent ecosystem, can be anything from commonplace items to intricate industrial machinery.`,
      },
      {
        title:
          "How can small businesses benefit from the implementation of IoT devices in their operations?",
        desc: `Small businesses can leverage IoT devices to streamline operations, improve efficiency, and gain valuable insights. For example, IoT devices can enhance inventory management, enable remote monitoring of equipment, and provide data analytics for informed decisionmaking. This results in cost savings, increased productivity, and a competitive edge in the market.`,
      },
      {
        title: "What are some of the IoT devices?",
        desc: `IoT devices span various categories, including:
        Smart Home Devices (thermostats, cameras, lights)
        Wearables (smartwatches, fitness trackers)
        Industrial Sensors (for monitoring and optimizing processes)
        Healthcare Devices (remote patient monitoring)
        Smart City Solutions (traffic management, environmental monitoring).
        `,
      },
      {
        title: "Why choose Zweidevs as your goto IoT Device Company?",
        desc: `Expertise: Our team comprises the finest professionals in the industry, with a focus on developing IoT devices, analyzing data, and systems engineering.
        Security: We give your IoT devices' safety top priority and follow industry best practices. Put strong safeguards in place to identify cyber threats and protect sensitive data.
        Reliability: We thoroughly test our IoT devices to ensure that they perform flawlessly in demanding settings. Even in applications where dependability and longevity are crucial, our designs guarantee both.
        Cost and Value: We maximize efficiency for a high return on investment customized for your business by providing cost-effective IoT device solutions without sacrificing quality.
        `,
      },
      {
        title: "What are the advantages of IoT devices?",
        desc: `Businesses gain several advantages from the integration of IoT devices. By seamlessly integrating physical devices with the digital world, businesses can gather valuable data, optimize processes, and make well-informed decisions. The following are some advantages of using IoT devices.
        Boost Productivity: IoT devices that can analyze data offer insights into the best ways to allocate resources and optimize performance.
        Gain better Decision-Making Skills: Businesses may identify patterns, foresee client needs, and make wise decisions by utilizing data analytics.
        Boost Safety and Security: Companies use IoT device security to keep an eye out for odd activity, keep tabs on employees, and safeguard corporate assets.
        Streamline Resource Management: By monitoring the use of energy and water, among other essential resources, IoT devices assist companies in achieving their sustainability goals.
        `,
      },
      {
        title: "How much does IoT device management service cost?",
        desc: `Our IoT device management services are priced based on your particular needs. We provide a clear pricing schedule with a one-time setup charge. Furthermore, we offer free maintenance for three months in order to guarantee a seamless transition and peak performance. We invite you to get in touch with us directly for an accurate cost estimate based on your unique requirements. Our staff will be pleased to talk with you about your project, get an idea of your objectives, and provide you a quote that is specifically tailored to your organization's needs and budget. Get in touch with us right now to start a thorough discussion about your requirements for IoT device management.`,
      },
    ],
  },
  [urls.services.GD.title]: {
    image: GDServiceDetailsIcon,
    targetAudienceSection: {
      title: `We Build Custom Games For`,
      desc: `At Zweidevs, we immerse ourselves in the dynamic world of game development, creating immersive and tailored experiences that captivate audiences across various scales. Our passion lies in crafting custom games for`,
      targetAudienceCardData: [
        {
          cardTitle: "Startups",
          cardDesc: `Starting a game development journey with Zweidevs is similar to choosing your starting character for a grand adventure. For new businesses and aspiring gamers, we recognize the need for creativity and the desire to leave our mark in the gaming industry. Our group of strategists, designers, and developers works directly with small gaming companies to provide tailored solutions that realize your vision. We create every piece with the essence of your game's narrative, whether it be pixel-perfect graphics or captivating gameplay mechanics.`,
        },
        {
          cardTitle: "Medium Businesses",
          cardDesc: `Medium-sized games can be strategic victories and truly unforgettable adventures in the wide world of game creation. At Zweidevs, we are aware of the challenges and goals associated with growing your game business. Our custom-made solutions for medium-sized games smoothly combine innovation and technology. We enhance your virtual world through sophisticated visuals, complex narratives, and cooperative features, guaranteeing a captivating gaming encounter that appeals to your expanding player population.`,
        },
        {
          cardTitle: "Large Businesses",
          cardDesc: `Zweidevs is a seasoned game development ally for the titans of the gaming business, where every move they make can determine the fate of virtual worlds. Large games demand grand strategies and unparalleled creativity. Our specialty is creating large-scale game worlds, performance optimization, and integration of state-of-the-art technologies. We bring your ambitious gaming ideas to life with extreme attention to detail, from complex simulations to massively multiplayer online games (MMOs), guaranteeing an amazing gaming experience for players worldwide.`,
        },
      ],
    },
    projectData: [
      {
        index: 1,
        image: GameDev1,
        title: "Play Room",
        content: `Children may read, solve puzzles, learn math, and express their creativity through interactive games in this dynamic virtual playground. This is an engaging and educational setting for younger learners.`,
      },
      {
        index: 2,
        image: GameDev2,
        title: "Gobblet Junior",
        content: `Gobblet Junior effectively blends word guessing and drawing tasks to produce an engaging and fun educational game that young minds may explore and enjoy.`,
      },
      {
        index: 3,
        image: Web1,
        title: "Cyber Legends",
        content: `Cyber Legends, an Ed-Tech and Gaming platform, provides services for online education to teachers, tutors, parents, and other educators and content creators. This Edtech platform consists of tools and content to enable interactive and educational exercises for teachers that students can use in their learning.`,
      },
    ],
    productionDevSection: {
      title: `How We Develop Game Applications`,
      desc: `At Zweidevs, our game development process is not just a series of steps; it's a dynamic, collaborative journey where your vision is at the center. We ensure transparency, open communication, and a commitment to delivering a gaming experience that exceeds expectations.`,
      cardsData: [
        {
          cardTitle: "Requirements Gathering",
          cardDesc: `In-Depth Consultations: We conduct extensive consultations to understand the surface requirements and delve into the core of your gaming aspirations.Vision Exploration: Our team explores every facet of your vision, ensuring a comprehensive understanding of the desired gaming experience. User-Centric Approach: We prioritize understanding your target audience to align the gaming experience with their preferences and expectations.`,
        },
        {
          cardTitle: "Detailed R&D",
          cardDesc: `Market Analysis: Our R&D phase goes beyond understanding your idea; we conduct thorough market analysis to identify trends, potential challenges, and opportunities. Player Persona Development: Understanding the player is vital. We create detailed player personas to ensure your game resonates with your target audience. Competitive Landscape: We analyze competitors to identify unique selling points, ensuring your game stands out in the market.`,
        },
        {
          cardTitle: "Innovative Development",
          cardDesc: `Iterative Prototyping: We adopt an iterative approach to development, creating prototypes that allow for continuous refinement based on feedback. Collaborative Design: Our development is a collaborative process. We involve you at critical stages, ensuring your vision evolves as expected. Constant Feedback Loop: Regular feedback sessions ensure that your vision is not just met but exceeded. We iterate on features, design, and functionality based on your insights.`,
        },
        {
          cardTitle: "Quality Assurance",
          cardDesc: `Comprehensive Testing: Rigorous testing is conducted at various stages of development. From unit testing to integration and system testing, we leave no stone unturned. User Experience Testing: We prioritize the user experience. Our testing phase includes real-user scenarios to ensure the gaming experience aligns with player expectations. Post-Launch Support: Quality assurance doesn't end with the launch. We provide post-launch support, promptly addressing unforeseen issues and ensuring a consistently high-quality gaming experience.`,
        },
      ],
    },
    techStackCardData: {
      cardsData: [
        {
          cardTitle: "Mobile & Desktop",
          chipData: ["Unity", "Blender", "GameBench", "Houdini"],
        },
      ],
    },
    headerTitle: "Level Up with Our Expert Game Development Services",

    headerDescription:
      "Dive into a world of captivating gaming experiences with Zweidevs. Our dedication goes beyond standard development – we're committed to unlocking the true potential of your gaming vision. Recognizing the influence of compelling narratives and immersive gameplay, we ensure your game not only competes but excels in the dynamic gaming landscape.",
    heading: `Shaping the Gaming Realm`,
    description: `Zweidevs breathes vitality into your gaming vision through a meticulous game development process. This journey seamlessly integrates creativity with innovation, transforming your ideas into a vibrant reality. Embracing a collaborative ethos, we involve you at every juncture to ensure your vision harmonizes effortlessly with the final product. Our iterative process guarantees the evolution of your game into a gaming masterpiece.`,

    offeringCardData: [
      {
        cardImage: gd1Icon,
        cardTitle: "Mobile Games Applications",
        cardDesc:
          "Immerse users in captivating mobile gaming experiences with our tailored applications. Our mobile game development is characterized by seamless functionality and an intuitive user interface.",
      },
      {
        cardImage: gd2Icon,
        cardTitle: "Web Game Applications and Sites",
        cardDesc:
          "Elevate your online gaming presence with web applications and sites that not only meet but exceed industry standards. We prioritize a user-centric design that ensures an enjoyable gaming experience.",
      },
      {
        cardImage: gd3Icon,
        cardTitle: "Blockchain-Based Games",
        cardDesc:
          "Explore the future of gaming with our experts in blockchain technology. Our blockchain-based games stand out in complexity and strive for the best look and feel, ensuring a truly immersive experience.",
      },
      {
        cardImage: gd4Icon,
        cardTitle: "Game Designing Services",
        cardDesc:
          "Use our all-inclusive game designing services to mold your gaming vision into its essence. Our talented game designers concentrate on developing and creating compelling storylines, characters, and gameplay elements. We make sure your game not only satisfies technical requirements but also offers a distinctive and captivating user experience. Our game-designing services use creativity and innovation to bring your ideas to life, whether developing compelling storylines or defining game concepts.",
      },
    ],

    faqData: [
      {
        title: "How much would game development cost?",
        desc: `We understand that the cost of game development varies based on each project's unique requirements and intricacies. To provide an accurate estimate, we initiate direct communication to understand your specific needs comprehensively.
        Once we thoroughly understand your requirements, we present you with transparent pricing. Our meticulously crafted quotes break down the cost structure, offering a clear and detailed overview. We believe in flexibility, and therefore, we tailor packages that align with your budgetary considerations. Rest assured, our commitment to quality remains unwavering. Despite offering flexible packages, we never compromise on delivering the highest game development standards, ensuring that your investment creates a remarkable and captivating gaming experience.`,
      },
      {
        title:
          "Should I go for a mobile game, a web app game, or a website for games?",
        desc: `Choosing the right platform is crucial. Our experts provide strategic guidance based on your target audience and goals, helping you make informed decisions. We consider user demographics and engagement preferences, ensuring your game reaches its intended audience effectively. Whether it's a mobile game for on-the-go entertainment, a web app for broader accessibility, or a dedicated website for a unique gaming experience, we tailor our recommendations to match your vision.`,
      },
      {
        title: "How much time would game development take?",
        desc: `The time required for game development varies based on the project's scope and features. For a game with essential elements and limited complexity, the timeline could span from weeks to a few months, while more intricate games with advanced graphics and complex features may take several months or more. We prioritize efficiency without compromising quality, providing tailored timelines and milestones to keep clients informed. Factors such as the scope of features, graphics, design intricacies, and thorough testing influence the development duration. Ultimately, the timeline depends on the client's desires and project specifics, and our commitment is to deliver a polished and exceptional gaming experience within realistic and agreed-upon timeframes.`,
      },
      {
        title: "What if I have a minor idea for a game?",
        desc: `Your idea, no matter how minor, holds potential. Our Game development experts specialize in nurturing concepts into world-class games. We provide a collaborative environment where even the most miniature ideas can grow into extraordinary digital realities.`,
      },
      {
        title:
          "What is the difference between a game developer and a game designer?",
        desc: `While game developers and designers play integral roles in the gaming industry, they have distinct responsibilities. Game developers focus on the technical aspects of game creation, writing code, programming, and ensuring the functionality and performance of the game. They bring the game designer's vision to life through coding and programming expertise. On the other hand, game designers concentrate on the conceptual and creative aspects, shaping the game's narrative, characters, mechanics, and overall user experience. They define the game's core concepts and mechanics, working to create an engaging and immersive gaming experience. In summary, game developers implement the technical aspects of game creation, while game designers focus on the creative and conceptual elements to craft a captivating gaming experience.

        Contact us to turn your gaming dreams into digital realities. Let's create something extraordinary together!`,
      },
    ],
  },
};
const SerivceDetails = () => {
  const router = useRouter();
  const [serviceName, setServiceName] = useState("Web Development");
  const [isLoading, setIsLoading] = useState(true);
  const animatedHeadingRef = React.useRef(null);
  const animatedButtonRef = React.useRef(null);

  useEffect(() => {
    if (router.isReady) {
      const { serviceName } = router.query;
      if (!serviceName) {
        // ignore
        //return null;
      } else {
        setServiceName(serviceName);
        setIsLoading(false);
      }
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInUp",
            "animate_delay-5s",
          );
        }
      });
    }, options);

    const observer1 = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__bounceIn",
            "animate_delay-5s",
          );
        }
      });
    }, options);

    if (animatedButtonRef.current) {
      observer1.observe(animatedButtonRef.current);
    }

    if (animatedHeadingRef.current) {
      observer.observe(animatedHeadingRef.current);
    }

    return () => {
      observer.disconnect();
      observer1.disconnect();
    };
  }, []);

  return (
    <div className={styles.PMTop}>
      <PageBanner
        BreadcrumbParrentPage={"Services"}
        BreadcrumbTitle={serviceName}
        description={content[serviceName].headerDescription}
        heading={content[serviceName].headerTitle}
        title={content[serviceName].headerDescription}
      />

      {isLoading ? (
        <div className={styles.loading}>
          <CircularProgress
            style={{
              color: "#f18f01",
            }}
          />
        </div>
      ) : (
        <>
          <ServiceDetailsCard
            key={1}
            projectDescription={content[serviceName].description}
            projectImageUrl={content[serviceName].image}
            projectTitle={content[serviceName].heading}
            requestDemoOnClick={() => {
              window.open(
                "https://calendly.com/request-demo-zweidevs/30min",
                "_blank",
              );
            }}
            reverse={true}
          />
          <OfferingCard
            cardData={content[serviceName].offeringCardData}
            heading={`${serviceName} Services`}
          />

          {content[serviceName].projectData && (
            <ServiceCarosuel
              cardTitle={`${serviceName} Projects`}
              demoButton={false}
              hideHeader
              projectData={content[serviceName].projectData}
            />
          )}
          <LetsTalk
            buttonTitle={`Schedule a call`}
            cardDesc={
              "We have the expertise to deliver you a custom solution no one else has"
            }
            cardTitle={"Do you have unique requirements for your application?"}
          />
          <ProductDevSection
            cardData={content[serviceName].productionDevSection}
          />
          <div className={styles.targetAudienceContainer}>
            <TargetAudience
              cardData={content[serviceName].targetAudienceSection}
            />
          </div>
          {/* <BusinessProcessCard
            desc={
              "Fast-track your project delivery using our simple three-step application development process."
            }
            heading={"Our Process"}
          /> */}

          <ProductDevSection
            cardData={content[serviceName].techStackCardData}
            showNumers={false}
          />

          <LetsTalk
            buttonTitle={`Let's talk`}
            cardDesc={
              "We have the expertise to deliver you a custom solution no one else has"
            }
            cardTitle={"Do you have unique requirements for your application?"}
          />
          <ServicesTechnologiesCard
            cardData={cardData}
            cardTitle={"Other Services"}
          />
          <Faq faqData={content[serviceName].faqData} />
          <div className={styles.blogBanner}>
            <h2 className={styles.blogBannerHeading} ref={animatedHeadingRef}>
              Not Finding The Right Fit? Stay Connected
            </h2>
            <div className={styles.blogButton} ref={animatedButtonRef}>
              <InstantBookingButton
                customOne={styles.one}
                customStyle={styles.bookinBtnStyle}
                customThree={styles.three}
                customTwo={styles.two}
                onClick={() => {
                  window.open(
                    "https://calendly.com/request-demo-zweidevs/30min",
                    "_blank",
                  );
                }}
                // svgFill="#ff9700"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SerivceDetails;
