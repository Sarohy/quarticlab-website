import Head from "next/head";
import {
  HomeSection1,
  HomeSection2,
  HomeSection3,
  HomeSection4,
  HomeSection5,
  HomeSection6,
  HomeSection7,
  HomeSection8,
} from "@component/Components/MainComponents/HomeSectionsFinal";
import styles from "../styles/Home.module.css";

export default function Home() {
  const section2 = () => document.getElementById("homeSection2");

  const handleButtonClickSection1 = () => {
    section2().scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={styles.HPStyle}>
      <Head>
        <title>Home</title>
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
