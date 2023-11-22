import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const PageBanner = dynamic(() =>
  import("@component/Components/CommonComponents/PageBanner"),
);

import WebDevServiceDetailsIcon from "../../../../public/assets/serviceIcons/webdev.jpg";
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

const offeringCardData = [
  {
    cardImage: designIcon,
    cardTitle: "Experience Design",
    cardDesc:
      "Our extensive expertise in UI/UX design and front-end development allows us to create delightful user experiences.",
  },
  {
    cardImage: frontendIcon,
    cardTitle: "Experience Design",
    cardDesc:
      "Our extensive expertise in UI/UX design and front-end development allows us to create delightful user experiences.",
  },
  {
    cardImage: backendIcon,
    cardTitle: "Experience Design",
    cardDesc:
      "Our extensive expertise in UI/UX design and front-end development allows us to create delightful user experiences.",
  },
  {
    cardImage: fullstackIcon,
    cardTitle: "Experience Design",
    cardDesc:
      "Our extensive expertise in UI/UX design and front-end development allows us to create delightful user experiences.",
  },
  {
    cardImage: ecommerceIcon,
    cardTitle: "Experience Design",
    cardDesc:
      "Our extensive expertise in UI/UX design and front-end development allows us to create delightful user experiences.",
  },
  {
    cardImage: webAppIcon,
    cardTitle: "Experience Design",
    cardDesc:
      "Our extensive expertise in UI/UX design and front-end development allows us to create delightful user experiences.",
  },
];

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

const Id = () => {
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
        heading={serviceName}
        title={"Service Details"}
      />
      <ServiceDetailsCard
        key={1}
        projectDescription={
          "Zweidevs is a custom web development firm aiming at the creation of the latest, technologically sound, up-to-the-mark, and scalable web applications tailored to fulfill day-to-day corporate goals. We serve our clients with web designing, development, testing, support, and maintenance. Folium AI is committed to enhancing business growth by creating world-class web applications."
        }
        projectImageUrl={WebDevServiceDetailsIcon}
        projectTitle={"Why Zweidevs?"}
        requestDemoOnClick={() => {}}
        reverse={true}
      />

      <OfferingCard
        cardData={offeringCardData}
        heading={"Web Development Services"}
      />
      <BusinessProcessCard
        desc={
          "Fast-track your project delivery using our simple three-step application development process."
        }
        heading={"Our Process"}
      />
      <ServiceCarosuel demoButton={false} hideHeader />

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
            svgFill="#ff9700"
          />
        </div>
      </div>
    </div>
  );
};

export default Id;
