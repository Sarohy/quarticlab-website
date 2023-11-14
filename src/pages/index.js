import Head from "next/head";
import dynamic from "next/dynamic";
import HomeSection1 from "@component/Components/MainComponents/HomeSectionsFinal/HomeSection1";
const HomeSection2 = dynamic(() =>
  import("@component/Components/MainComponents/HomeSectionsFinal/HomeSection2"),
);
const HomeSection3 = dynamic(() =>
  import("@component/Components/MainComponents/HomeSectionsFinal/HomeSection3"),
);
const HomeSection4 = dynamic(() =>
  import("@component/Components/MainComponents/HomeSectionsFinal/HomeSection4"),
);
const HomeSection5 = dynamic(() =>
  import("@component/Components/MainComponents/HomeSectionsFinal/HomeSection5"),
);
const HomeSection6 = dynamic(() =>
  import("@component/Components/MainComponents/HomeSectionsFinal/HomeSection6"),
);
const HomeSection7 = dynamic(() =>
  import("@component/Components/MainComponents/HomeSectionsFinal/HomeSection7"),
);
const HomeSection8 = dynamic(() =>
  import("@component/Components/MainComponents/HomeSectionsFinal/HomeSection8"),
);

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
      <HomeSection5 />
      <HomeSection6 />
      <HomeSection7 />
      <HomeSection8 />
    </div>
  );
}
