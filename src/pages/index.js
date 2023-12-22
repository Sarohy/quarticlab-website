import Head from "next/head";
import dynamic from "next/dynamic";
import HomeSection1 from "@component/Components/MainComponents/HomeSectionsFinal/HomeSection1";
const HomeSection2 = dynamic(
  () =>
    import(
      "@component/Components/MainComponents/HomeSectionsFinal/HomeSection2"
    ),
);
const HomeSection3 = dynamic(
  () =>
    import(
      "@component/Components/MainComponents/HomeSectionsFinal/HomeSection3"
    ),
);
const HomeSection4 = dynamic(
  () =>
    import(
      "@component/Components/MainComponents/HomeSectionsFinal/HomeSection4"
    ),
);
const HomeSection5 = dynamic(
  () =>
    import(
      "@component/Components/MainComponents/HomeSectionsFinal/HomeSection5"
    ),
);
const HomeSection6 = dynamic(
  () =>
    import(
      "@component/Components/MainComponents/HomeSectionsFinal/HomeSection6"
    ),
);
const HomeSection7 = dynamic(
  () =>
    import(
      "@component/Components/MainComponents/HomeSectionsFinal/HomeSection7"
    ),
);
const HomeSection8 = dynamic(
  () =>
    import(
      "@component/Components/MainComponents/HomeSectionsFinal/HomeSection8"
    ),
);

import ServiceCarosuel from "@component/Components/CommonComponents/ServiceCarousel";
import Mobo1 from "../../public/assets/serviceDetailsIcons/moboIcons/mobo1.png";
import Web1 from "../../public/assets/HomeIcons/Project/Web1.png";
import Web4 from "../../public/assets/HomeIcons/Project/Web4.png";

import styles from "../styles/Home.module.css";

export default function Home() {
  const section2 = () => document.getElementById("homeSection2");

  const handleButtonClickSection1 = () => {
    section2().scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={styles.HPStyle}>
      <Head>
        <title>Zweidevs - Empowering Digital Innovation with IT Services</title>
        <meta
          content="Welcome to Zweidevs - Your Gateway to Digital Innovation. Explore our IT services, from web development and blockchain solutions to mobile app development and AI-powered solutions. Transform your ideas into reality with us."
          name="description"
        />
      </Head>
      <HomeSection1 handleButtonClick={handleButtonClickSection1} />
      <HomeSection2 />
      <HomeSection3 />
      <HomeSection4 />
      <ServiceCarosuel
        cardTitle="Our Top Projects"
        displayViewMoreButton={true}
        projectData={[
          {
            index: 1,
            image: Web1,
            title: "Cyber Legends",
            content:
              "Ed-Tech and Gaming platform offering online cyber security learning services, equipping educators, parents and kids with interactive tools and content for enhanced learning experiences.",
          },
          {
            index: 2,
            image: Mobo1,
            title: "Neverleft",
            content: `A more efficient method for managing venue operations that incorporates data analytics, enhanced event ticketing, and digital cloakroom ticketing.`,
          },
          {
            index: 3,
            image: Web4,
            title: "Blockcircle",
            content: `Blockcircle provides competitive data, proprietary tools, and dynamic investing analytics to enable them to make well-informed decisions in the turbulent cryptocurrency market.`,
          },
        ]}
      />
      <HomeSection5 />
      <HomeSection6 heading="Why Zweidevs" />
      <HomeSection7 />
      <HomeSection8 />
    </div>
  );
}
