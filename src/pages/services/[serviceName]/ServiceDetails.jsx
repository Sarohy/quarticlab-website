import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";

const PageBanner = dynamic(() =>
  import("@component/Components/CommonComponents/PageBanner"),
);

import WebDevServiceDetailsIcon from "../../../../public/assets/serviceIcons/webdev.jpg";
import UiUxServiceDetailsIcon from "../../../../public/assets/serviceIcons/UIUX.jpg";
import MobodevServiceDetailsIcon from "../../../../public/assets/serviceIcons/mobodev.jpg";
import GDServiceDetailsIcon from "../../../../public/assets/serviceIcons/GD.jpg";
import BlockchainDevServiceDetailsIcon from "../../../../public/assets/serviceIcons/bcdev.jpg";
import AIdevServiceDetailsIcon from "../../../../public/assets/serviceIcons/AI.jpg";
import IotServiceDetailsIcon from "../../../../public/assets/serviceIcons/iot.png";
import DevOpsServiceDetailsIcon from "../../../../public/assets/serviceIcons/devops.jpg";

import styles from "./serviceDetails.module.css";
const ServiceDetailsCard = dynamic(() =>
  import(
    "@component/Components/CommonComponents/ServiceDetailsCard/SerivceDetailsCard"
  ),
);

import { InstantBookingButton } from "@component/Components/CommonComponents";
import designIcon from "../../../../public/assets/serviceIcons/webServicesIcons/design.svg";
import backendIcon from "../../../../public/assets/serviceIcons/webServicesIcons/backend.svg";
import ecommerceIcon from "../../../../public/assets/serviceIcons/webServicesIcons/ecommerce.svg";
import frontendIcon from "../../../../public/assets/serviceIcons/webServicesIcons/frontend.svg";
import fullstackIcon from "../../../../public/assets/serviceIcons/webServicesIcons/fullstack.svg";

const ServiceCarosuel = dynamic(() =>
  import("@component/Components/CommonComponents/ServiceCarousel"),
);

const ServicesTechnologiesCard = dynamic(() =>
  import(
    "@component/Components/CommonComponents/ServicesTechnologiesCard/index"
  ),
);

import AIDevIcon from "../../../../public/assets/serviceIcons/AIDevIcon.svg";
import BlockchainIcon from "../../../../public/assets/serviceIcons/blockchainIcon.svg";
import DevopsIcon from "../../../../public/assets/serviceIcons/devopsIcon.svg";
import GameDevIcon from "../../../../public/assets/serviceIcons/GameDevIcon.svg";
import IOTDevIcon from "../../../../public/assets/serviceIcons/IOTIcon.svg";
import MobileDevIcon from "../../../../public/assets/serviceIcons/MobDevIcon.svg";
import WebDevIcon from "../../../../public/assets/serviceIcons/webdevIcon.svg";
import UIUXIcon from "../../../../public/assets/serviceIcons/uiuxIcon.svg";
import OfferingCard from "@component/Components/CommonComponents/OfferingsCard";
// import BusinessProcessCard from "@component/Components/CommonComponents/BusinessProcessCard/BusinessProcessCard";
import ProductDevSection from "@component/Components/CommonComponents/ProductDevSection/ProductDevSection";
import TargetAudience from "@component/Components/CommonComponents/TargetAudienceSection/TargetAudience";
import Faq from "@component/Components/CommonComponents/FAQ/Faq";

const cardData = [
  {
    cardIcon: WebDevIcon,
    cardIconTitle: { firstLine: "Website", secondLine: "Development" },
    href: "/services/Website Development",
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
    href: "/services/UI UX Development",
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
    href: "/services/DevOps & Cloud Services",
  },
];

const content = {
  "Website Development": {
    image: WebDevServiceDetailsIcon,
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
          "Zweidevs's full-stack front-end expertise can help you discover innovation. Our developers combine creativity and technological proficiency to create user-friendly interfaces and responsive web and mobile solutions. We ensure your online presence is distinctive, captivating, and up to the ever-evolving standards of contemporary design.",
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
        cardTitle: "Web app maintenance and update",
        cardDesc:
          "Zweidevs is your committed partner for long-term success even after launch. Beyond bug patches, our maintenance and update services include exciting new features and performance improvements. With our continued assistance, you can keep your app at the forefront of innovation and customer happiness.",
      },
    ],
  },

  "Blockchain Development": {
    image: BlockchainDevServiceDetailsIcon,
    headerTitle:
      "Unlocking Tomorrow: Revolutionize Your Future with Our Blockchain Expertise",

    headerDescription:
      "We specialize in crafting cutting-edge applications that leverage the power of blockchain technology to redefine industries and elevate the standards of trust and transparency.",
    heading: `Transparent and Decentralized Solutions with BlockChain Development`,
    description: `Where innovation meets success, making your journey seamless and your possibilities limitless!
    Our expert team specializes in crafting customized solutions that seamlessly integrate blockchain technology into your business, ensuring security, transparency, and efficiency. 
     At Zweidevs, we conduct intelligent contract audits and penetration testing to fortify your blockchain ecosystem against potential threats. Whether you're navigating the complexities of finance, healthcare, logistics, or beyond, our blockchain expertise empowers your business with the tools to thrive. 
    Join us in shaping the future of technology, where your journey toward innovation and success is promising and practically limitless. 
    `,

    offeringCardData: [
      {
        cardImage: designIcon,
        cardTitle: "Enhanced Security",
        cardDesc:
          "Experience a new era of business security through Zweidevs’ blockchain service to secure your operations.",
      },
      {
        cardImage: frontendIcon,
        cardTitle: "Greater Transparency",
        cardDesc:
          "Ensure every transaction and operation is verifiable and visible across your network.",
      },
      {
        cardImage: backendIcon,
        cardTitle: "Automation",
        cardDesc:
          "Unlock efficiency and streamline workflows with Zweidevs, where smart contracts and automation redefine business operations.",
      },
      {
        cardImage: fullstackIcon,
        cardTitle: "Instant Traceability",
        cardDesc:
          "Trace every step of your processes with Zweidevs, offering instant traceability to enhance accountability and visibility of operations.",
      },
      {
        cardImage: ecommerceIcon,
        cardTitle: "Increased Efficiency",
        cardDesc:
          "Leverage decentralized ledgers and smart contracts with Zweidevs to minimize redundancies.",
      },
    ],
  },
  "DevOps & Cloud Services": {
    image: DevOpsServiceDetailsIcon,
    headerTitle: "Effortless Success with Our DevOps Expertise",

    headerDescription:
      "We specialize in making technology work for you, crafting user-friendly applications aligning with your vision. With us, it's not about complex coding; it's about simplicity and effectiveness, ensuring that every line of code amplifies your success.",
    heading: `Automating and Accelerating Your Software Delivery Pipeline`,
    description: `Software development with our advanced DevOps services makes teamwork easier, automating tasks and delivering software faster than ever.

    At Zweidevs, we're not just software providers but your partners in progress. Empower your success journey with our seamless and confident DevOps solutions, ensuring efficiency and excellence at every step. Imagine a hassle-free journey where your ideas become powerful digital solutions effortlessly. From concept to deployment, we're with you every step of the way. Experience the ease of innovation and reliability with Zweidevs, where your success is not just a goal; it's a partnership we value.
    `,

    offeringCardData: [
      {
        cardImage: designIcon,
        cardTitle: "Infrastructure Automation",
        cardDesc:
          "Transform your operations with Zweidevs’ DevOps expertise, delivering infrastructure automation that enhances scalability, efficiency, and agility.",
      },
      {
        cardImage: frontendIcon,
        cardTitle: "Continuous Integration and Deployment (CI/CD)",
        cardDesc:
          "Zweidevs ensures the implementation of seamless CI/CD pipelines for faster and more reliable application releases.",
      },
      {
        cardImage: backendIcon,
        cardTitle: "Monitoring and logging",
        cardDesc:
          "Ensure optimal performance and preempt issues with our DevOps services.",
      },
      {
        cardImage: fullstackIcon,
        cardTitle: "Cloud Infrastructure Management",
        cardDesc:
          "Maximize the potential of cloud environments, providing scalable cloud infrastructure management.",
      },
      {
        cardImage: ecommerceIcon,
        cardTitle: "Security and Compliance",
        cardDesc:
          "Fortify your digital landscape with DevOps security through industry-leading practices.",
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
        cardTitle: "Web app maintenance and updates",
        cardDesc:
          "Sustain and evolve your E-commerce success, ensuring your web application stays aligned with industry trends.",
      },
    ],
  },
  "Mobile App Development": {
    image: MobodevServiceDetailsIcon,
    headerTitle: "High-Performance Mobile Apps",

    headerDescription:
      "Fast-track your digital transformation with our high-performance mobile applications. Experience the seamless speed, unwavering reliability, and cutting-edge innovation in every interaction. Elevate your digital journey with technology that accelerates your business forward.",
    heading: `Experience the best intuitive user interface (UI) and Responsive design`,

    description: `Imagine unparalleled mobile experiences with our app development experts.
      An unwavering commitment to performance and security is at the heart of our mobile development philosophy. Experience unmatched speed, reliability, and responsiveness with mobile applications that redefine fluidity.
      Say goodbye to platform constraints with our cross-platform compatibility, ensuring your app seamlessly integrates with iOS and Android ecosystems. Join us in this collaborative journey, where your vision converges with our expertise, resulting in mobile applications that meet and exceed expectations.`,

    offeringCardData: [
      {
        cardImage: designIcon,
        cardTitle: "Hybrid Mobile App Development",
        cardDesc:
          "Zweidevs’ services specialize in hybrid app development for a seamless user experience across diverse devices.",
      },
      {
        cardImage: frontendIcon,
        cardTitle: "Native Mobile App Development",
        cardDesc:
          "Immerse your audience in platform-specific excellence, crafting native apps that harness the full potential of iOS and Android platforms.",
      },
      {
        cardImage: backendIcon,
        cardTitle: "Wearables and Embedded Software",
        cardDesc:
          "Extend your digital reach with our mobile development solutions, delving into wearables and embedded software.",
      },
    ],
  },
  "Artificial Intelligence & Machine Learning": {
    image: AIdevServiceDetailsIcon,
    headerTitle: "Elevate Innovation in Your Business",

    headerDescription:
      "Experience a transformative journey as we harness the power of artificial intelligence and machine learning tailored to your unique needs.",
    heading: `Cutting-edge AI and ML Services`,

    description: `Transform your business with the frontier of technological advancement.
    Welcome to a realm of limitless possibilities at Zweidevs, where our AI and ML services redefine the landscape of innovation and business intelligence. Harnessing the transformative power of Artificial Intelligence (AI) and Machine Learning (ML), we offer a comprehensive suite of services designed to propel your organization into the future.
    Our AI and ML solutions are crafted with precision and tailored to meet the unique demands of your industry. Whether you seek to automate tasks, improve customer engagement, or gain actionable insights from your data, our services are designed to exceed expectations.
    `,

    offeringCardData: [
      {
        cardImage: designIcon,
        cardTitle: "Custom AI and ML Solutions",
        cardDesc:
          "Empower your business with bespoke AI and ML solutions tailored to your unique needs through custom-built intelligent applications.",
      },
      {
        cardImage: frontendIcon,
        cardTitle: "Data Science and Analytics",
        cardDesc:
          "Leveraging advanced data science and analytics to turn raw data into strategic business intelligence.",
      },
      {
        cardImage: backendIcon,
        cardTitle: "AI-powered Chatbots",
        cardDesc:
          "Transform customer interactions with Zweidevs’ AI and ML expertise, delivering intelligent chatbots that enhance user engagement.",
      },
      {
        cardImage: backendIcon,
        cardTitle: "AI Integration with Existing Systems",
        cardDesc:
          "Bridging cutting-edge technology with your existing systems for a cohesive and intelligent infrastructure with Zweidevs.",
      },
      {
        cardImage: backendIcon,
        cardTitle: "Data Democratization",
        cardDesc:
          "Democratize access to insights across your organization, fostering a data-driven culture where decision-makers can effortlessly harness the power of data.",
      },
    ],
  },
  "UI UX Development": {
    image: UiUxServiceDetailsIcon,
    headerTitle: "Create the best interface experience for your customers",

    headerDescription:
      "Transform Your Brand's Impact with Our UI/UX Services, Creating the Ultimate Interface Experience for Your Customers.",
    heading: `A seamless and engaging digital experience`,

    description: `Partner with us to transform your digital presence
    Immerse your users in a seamless and visually stunning experience tailored to your brand. Our UI/UX service is not just about designing interfaces; it's about creating meaningful and memorable user experiences that leave a lasting impression on your audience. Intuitive design, seamless navigation, and captivating visuals converge in our UI/UX, delivering a user-centric digital experience. Transform your online presence into a captivating journey where user satisfaction meets the intersection of aesthetics and functionality.`,

    offeringCardData: [
      {
        cardImage: designIcon,
        cardTitle: "User Research",
        cardDesc:
          "Zweidevs conducts thorough user research to inform design decisions and create experiences that resonate with your audience.",
      },
      {
        cardImage: designIcon,
        cardTitle: "Interface Design",
        cardDesc:
          "Craft visually appealing and intuitive interfaces with Zweidevs’ UI/UX expertise.",
      },
      {
        cardImage: designIcon,
        cardTitle: "Interaction Design",
        cardDesc:
          "Make meaningful and delightful experiences across your digital platforms with Zweidevs.",
      },
      {
        cardImage: designIcon,
        cardTitle: "Usability Testing",
        cardDesc:
          "Zweidevs conducts rigorous usability testing to gather valuable insights and refine design elements for maximum impact.",
      },
      {
        cardImage: designIcon,
        cardTitle: "Prototyping",
        cardDesc:
          "Bring concepts to life and refine user journeys, utilizing prototypes to visualize the design before final implementation.",
      },
      {
        cardImage: frontendIcon,
        cardTitle: "Design Strategy",
        cardDesc:
          "Align your design goals, where design strategy guides every decision for a purposeful and impactful digital presence.",
      },
      {
        cardImage: backendIcon,
        cardTitle: "Design Consulting",
        cardDesc:
          "Zweidevs provides strategic insights and recommendations to enhance the overall effectiveness of your digital experiences.",
      },
    ],
  },
  "IOT Devices": {
    image: IotServiceDetailsIcon,
    headerTitle: "Empowering Connected Environments",

    headerDescription:
      "Step into the future with our IoT service, where innovation meets seamless connectivity to redefine the way you interact with and control your surroundings.",
    heading: `IoT Excellence: Redefining Connectivity for a Smarter Tomorrow`,

    description: `Intelligent solutions that transform everyday spaces into smart, responsive environments, providing unparalleled convenience and efficiency.
    From smart homes to industrial ecosystems, our expertise lies in architecting IoT solutions that transcend boundaries, delivering unparalleled convenience, security, and sustainability. With a commitment to cutting-edge technology, we propel your business into the future, where every interaction is more intelligent, every decision is data-driven, and the possibilities of a connected world are endless.`,

    offeringCardData: [
      {
        cardImage: designIcon,
        cardTitle: "IoT Consultancy",
        cardDesc:
          "Expert guidance for navigating the Internet of Things landscape, ensuring strategic and practical implementation tailored to your needs.",
      },
      {
        cardImage: designIcon,
        cardTitle: "App Development",
        cardDesc:
          "Crafting cutting-edge applications seamlessly blending innovation, functionality, and user-centric design for a standout digital experience.",
      },
      {
        cardImage: designIcon,
        cardTitle: "Extension into IoT",
        cardDesc:
          "Expand your horizons into the realm of IoT, unlocking new possibilities for connectivity, automation, and data-driven insights.",
      },
      {
        cardImage: designIcon,
        cardTitle: "System Integration",
        cardDesc:
          "Streamlining operations with seamless integration ensures your systems work harmoniously for enhanced efficiency and performance.",
      },
      {
        cardImage: designIcon,
        cardTitle: "Data Analytics",
        cardDesc:
          "Harnessing the power of data to drive informed decision-making, uncover insights, and optimize your processes for maximum impact.",
      },
      {
        cardImage: frontendIcon,
        cardTitle: "IoT Ecosystem Development",
        cardDesc:
          "Building interconnected ecosystems that foster collaboration between devices and systems, creating a unified and intelligent network.",
      },
      {
        cardImage: backendIcon,
        cardTitle: "IoT Firmware Development",
        cardDesc:
          "Developing robust and efficient firmware for IoT devices, ensuring reliability, security, and optimal performance in the connected world.",
      },
    ],
  },
  "Game Development": {
    image: GDServiceDetailsIcon,
    headerTitle: "Crafting Fun, Unforgettable Games",

    headerDescription:
      "Embark on a journey where passion converges with precision in the dynamic realm of gaming. Join us as we redefine the future, creating immersive experiences that resonate with players worldwide. Let's shape the gaming landscape together.",
    heading: `Play, Thrive, Conquer: Your Game, Our Expertise`,

    description: `Creating interactive experiences that captivate and endure.
    Whether you dream of mobile games, virtual reality experiences, or robust console titles, our comprehensive game development service ensures a seamless and engaging journey from ideation to launch. Let's embark on a gaming adventure together, where every line of code and pixel is meticulously designed to elevate your gaming vision to new heights. Join us, and let the games begin!`,

    offeringCardData: [
      {
        cardImage: designIcon,
        cardTitle: "Mobile Game Development",
        cardDesc:
          "Crafting immersive and entertaining games tailored for mobile platforms, bringing joy to users on the go.",
      },
      {
        cardImage: designIcon,
        cardTitle: "Unity 3D Game Development",
        cardDesc:
          "Creating dynamic and visually stunning games with the powerful Unity 3D engine, delivering an unparalleled gaming experience.",
      },
      {
        cardImage: designIcon,
        cardTitle: "Unreal Game Development",
        cardDesc:
          "Building cutting-edge games with Unreal Engine, pushing the boundaries of realism and interactivity in gaming.",
      },
      {
        cardImage: designIcon,
        cardTitle: "NFT Game Development",
        cardDesc:
          "Innovating in gaming with NFT integration, allowing players to own and trade in-game assets truly.",
      },
      {
        cardImage: designIcon,
        cardTitle: "Metaverse Game Development",
        cardDesc:
          "Venturing into the metaverse with games that transcend reality, offering immersive experiences and endless possibilities.",
      },
      {
        cardImage: frontendIcon,
        cardTitle: "Web3 Game Development",
        cardDesc:
          "Pioneering the future of gaming with Web3 technology, creating decentralized and player-centric game ecosystems.",
      },
      {
        cardImage: backendIcon,
        cardTitle: "HTML Game Development",
        cardDesc:
          "Developing engaging games with HTML, ensuring compatibility across web browsers for widespread accessibility.",
      },
      {
        cardImage: backendIcon,
        cardTitle: "Desktop Game Development",
        cardDesc:
          "Crafting high-quality gaming experiences for desktop platforms, combining performance and visual excellence.",
      },
      {
        cardImage: backendIcon,
        cardTitle: "AR/VR Game Development",
        cardDesc:
          "Creating games that bridge the gap between the virtual and real worlds, leveraging augmented and virtual reality technologies.",
      },
      {
        cardImage: backendIcon,
        cardTitle: "Blockchain based Game Development",
        cardDesc:
          "Entering the blockchain realm with games that embrace transparency, security, and decentralized ownership of in-game assets.",
      },
    ],
  },
};

const productionDevSectionCardData = [
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
];

const targetAudienceCardData = [
  {
    cardTitle: "Startups",
    cardDesc: `Recognizing the distinct obstacles and goals of smaller businesses, we provide them with cost-effective, scalable solutions that enable them to build a strong online presence. Whether you're starting a new business or want to improve your existing digital skills, our commitment is to offer creative, superior, and reasonably priced online solutions that help small businesses succeed in the digital world.`,
  },
  {
    cardTitle: "Medium Businesses",
    cardDesc: `Our dedicated team is aware of the complex issues and expansion goals that mid-sized businesses face, and we use this knowledge to provide solutions that work in unison with their goals. Whether your goal is to increase consumer engagement, streamline internal operations, or broaden your digital presence, our all-encompassing approach guarantees that the web apps we develop are precisely tailored to meet the unique requirements of medium-sized enterprises.`,
  },
  {
    cardTitle: "Large Business",
    cardDesc: `Zweidevs is dedicated to developing custom web apps that smoothly interface with the complex operations of large companies, whether you want to boost digital interactions at scale, build reliable enterprise solutions, or streamline complex business processes. Our emphasis on performance, security, and innovation guarantees that the solutions we provide enable big businesses to prosper in the ever-changing digital environment, promoting effectiveness, expansion, and long-term success.`,
  },
];

const faqData = [
  {
    title: "How much does web app development cost?",
    desc: `The cost of developing a web app is influenced by its complexity, required features, technology stack, team experience, and other factors like design, testing, and maintenance. Working with web development experts or agencies is crucial if you want a clear knowledge of your vision for the web application and a more precise estimate based on your unique requirements.Connect with our web developers to know the exact cost estimation. `,
  },
  {
    title: "What is web app development, and how can it benefit my business?",
    desc: `Developing software applications that run on web browsers is known as web app development, and it offers firms adaptable and affordable options. Their cross-platform compatibility guarantees a uniform user experience on various devices and browsers. Essentially, web app development gives companies the ability to create effective, easily accessible, and scalable solutions that they can use to keep up with changing technology and market demands.`,
  },
  {
    title: "How long does it take to develop a web application?",
    desc: `A simple web app with basic features might take a few weeks to a couple of months to develop, while more complex or enterprise-level applications could take several months or even a year. Rapid development frameworks and agile development methodologies can expedite the process, but it's essential to balance speed with thorough testing and quality assurance.`,
  },
  {
    title: "Why choose Zweidevs for web application development?",
    desc: `We at Zweidevs don't just develop web apps—we craft reliable, approachable solutions that add value to your company and demonstrate our constant commitment to quality and client happiness. Having completed numerous projects successfully and leaving our clients happy, we place a high value on open communication and teamwork during the whole development process. connect with our experts right away.`,
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
];

const SerivceDetails = () => {
  const router = useRouter();
  const [serviceName, setServiceName] = useState("Website Development");
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

          <ServiceCarosuel
            cardTitle={`${serviceName} Projects`}
            demoButton={false}
            hideHeader
          />

          <ProductDevSection cardData={productionDevSectionCardData} />
          <div style={{ paddingBottom: 20, backgroundColor: "#F4F5F6" }}>
            <TargetAudience cardData={targetAudienceCardData} />
          </div>
          {/* <BusinessProcessCard
            desc={
              "Fast-track your project delivery using our simple three-step application development process."
            }
            heading={"Our Process"}
          /> */}

          <ServicesTechnologiesCard
            cardData={cardData}
            cardTitle={"Another Services"}
          />
          <Faq faqData={faqData} />
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
                svgFill="#ff9700"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SerivceDetails;
