import dynamic from "next/dynamic";
const AboutUsCard = dynamic(() =>
  import("@component/Components/MainComponents/Aboutus/AboutUsCard"),
);
import AboutUsCard1 from "@component/Components/MainComponents/Aboutus/AboutUsCard1";
const AboutUsCard2 = dynamic(() =>
  import("@component/Components/MainComponents/Aboutus/AboutUsCard2"),
);
const AboutUsCard4 = dynamic(() =>
  import("@component/Components/MainComponents/Aboutus/AboutUSCard4"),
);
const AboutUsCard5 = dynamic(() =>
  import("@component/Components/MainComponents/Aboutus/AboutsUsCard5"),
);
const HomeSection6 = dynamic(() =>
  import("@component/Components/MainComponents/HomeSectionsFinal/HomeSection6"),
);

import styles from "../styles/About.module.css";
import Head from "next/head";

export default function AboutUs() {
  return (
    <div className={styles.APStyle}>
      <Head>
        <title>Zweidevs - Our Journey in IT Services</title>
        <meta
          content="Get to know  Zweidevs - We are a team of tech enthusiasts passionate about creating digital solutions. Learn about our journey, values, and dedication to excellence in IT services"
          name="description"
        />
      </Head>
      <AboutUsCard1 />
      <AboutUsCard2 />
      <HomeSection6 heading={"Zweidevs Achievements Since 2010"} />
      <AboutUsCard4 />
      <AboutUsCard5 />
    </div>
  );
}
