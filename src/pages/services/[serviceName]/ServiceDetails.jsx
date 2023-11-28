import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const PageBanner = dynamic(() =>
  import("@component/Components/CommonComponents/PageBanner"),
);

import WebDevServiceDetailsIcon from "../../../../public/assets/serviceIcons/webdev.jpg";
import UiUxServiceDetailsIcon from "../../../../public/assets/serviceIcons/UIUX.jpg";
import MobodevServiceDetailsIcon from "../../../../public/assets/serviceIcons/mobodev.jpg";
import GDServiceDetailsIcon from "../../../../public/assets/serviceIcons/GD.jpg";
import BlockchainDevServiceDetailsIcon from "../../../../public/assets/serviceIcons/bcdev.jpg";
import AIdevServiceDetailsIcon from "../../../../public/assets/serviceIcons/AI.jpg";

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
import webAppIcon from "../../../../public/assets/serviceIcons/webServicesIcons/webApp.svg";

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
import BusinessProcessCard from "@component/Components/CommonComponents/BusinessProcessCard/BusinessProcessCard";

const cardData = [
  {
    cardIcon: WebDevIcon,
    cardIconTitle: { firstLine: "Website", secondLine: "Development" },
  },
  {
    cardIcon: BlockchainIcon,
    cardIconTitle: { firstLine: "Blockchain", secondLine: "Development" },
  },
  {
    cardIcon: MobileDevIcon,
    cardIconTitle: { firstLine: "Mobile", secondLine: "Development" },
  },
  {
    cardIcon: UIUXIcon,
    cardIconTitle: { firstLine: "UI UX", secondLine: "Development" },
  },
  {
    cardIcon: GameDevIcon,
    cardIconTitle: { firstLine: "Game", secondLine: "Development" },
  },
  {
    cardIcon: IOTDevIcon,
    cardIconTitle: { firstLine: "IOT", secondLine: "Devices" },
  },
  {
    cardIcon: AIDevIcon,
    cardIconTitle: {
      firstLine: "Artificial Intelligence &",
      secondLine: "Machine Learning",
    },
  },
  {
    cardIcon: DevopsIcon,
    cardIconTitle: { firstLine: "DevOps &", secondLine: "Cloud Services" },
  },
];

const content = {
  "Website Development": {
    image: WebDevServiceDetailsIcon,
    headerTitle:
      "Elevate Your Online Presence: Expert Web App Development Services",

    headerDescription:
      "We build modern, Secure, and High-Performance web applications by turning ideas into reality. Our expert web app development services are designed to launch your online presence to new heights",
    heading: `Custom Web Applications and Dedicated Support for Your Success!`,
    description: `We use the latest technologies to build custom Web applications for your business needs, enabling you to digitize your internal processes with the best user experience on all screen sizes. We also provide free maintenance and support services and automated deployments, ensuring everything runs smoothly and swiftly.

        At Zweidevs, your success is our mission. We're not just developers; we're your partners in the digital realm. Your victories are our victories.
       
       Ready to take your online presence to new heights? Let's make it happen together with Zweidevs.`,

    offeringCardData: [
      {
        cardImage: designIcon,
        cardTitle: "Experience Design",
        cardDesc:
          "Elevate user experiences with Zweidevs. Our UI/UX design and front-end expertise ensure delightful digital interactions.",
      },
      {
        cardImage: frontendIcon,
        cardTitle: "Frontend Development",
        cardDesc:
          "Experience innovation with Zweidevs. Our full-stack front-end expertise crafts human-centric web & mobile solutions that meet your goals.",
      },
      {
        cardImage: backendIcon,
        cardTitle: "Backend Development",
        cardDesc:
          "Zweidevs crafts back-end solutions: extensible, scalable, and easy to maintain, empowering your digital growth.",
      },
      {
        cardImage: fullstackIcon,
        cardTitle: "Full Stack Development",
        cardDesc:
          "Zweidevs offers comprehensive software engineering, from simple to high-performing backends, ensuring digital success.",
      },
      {
        cardImage: ecommerceIcon,
        cardTitle: "Web app maintenance and update",
        cardDesc:
          "Post-launch, Zweidevs offers app maintenance and updates—bug fixes, performance boosts, and exciting new features to keep your app at its best.",
      },
      {
        cardImage: webAppIcon,
        cardTitle: "Experience Design",
        cardDesc:
          "Our extensive expertise in UI/UX design and front-end development allows us to create delightful user experiences.",
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
    image: AIdevServiceDetailsIcon,
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
    image: AIdevServiceDetailsIcon,
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

const SerivceDetails = () => {
  const router = useRouter();
  const { serviceName } = router.query;
  const animatedHeadingRef = React.useRef(null);
  const animatedButtonRef = React.useRef(null);

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
        description={
          "We are your creative web development team, who aim to leverage the latest technological advances with thoughtful design and serious engineering to build tailored solutions for our clients."
        }
        heading={content[serviceName].headerTitle}
        title={content[serviceName].headerDescription}
      />
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
      <BusinessProcessCard
        desc={
          "Fast-track your project delivery using our simple three-step application development process."
        }
        heading={"Our Process"}
      />
      <ServiceCarosuel
        cardTitle={`${serviceName} Projects`}
        demoButton={false}
        hideHeader
      />

      <ServicesTechnologiesCard
        cardData={cardData}
        cardTitle={"Another Services"}
      />

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
    </div>
  );
};

export default SerivceDetails;
