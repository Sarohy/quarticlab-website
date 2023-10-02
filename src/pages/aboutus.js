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
import styles from "../styles/About.module.css";

export default function AboutUs() {
  return (
    <div className={styles.APStyle}>
      <AboutUsCard1 />
      <AboutUsCard2 />
      <AboutUsCard />
      <AboutUsCard4 />
      <AboutUsCard5 />
    </div>
  );
}
