import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@component/styles/Home.module.css";
import { InstantBookingBanner } from "@component/Components/CommonComponents";
// import {
//   HomeSection1,
//   HomeSection2,
//   HomeSection3,
//   HomeSection4,
//   HomeSection5,
// } from "@component/Components/MainComponents/HomeSections";

import { useRef } from "react";
import {
  HomeSection1,
  HomeSection2,
  HomeSection3,
  HomeSection5,
  HomeSection6,
  HomeSection7,
} from "@component/Components/MainComponents/HomeSectionsFinal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const section2 = () => document.getElementById("homeSection2");
  const section3 = () => document.getElementById("homeSection3");

  const handleButtonClickSection1 = () => {
    section2().scrollIntoView({ behavior: "smooth" });
  };

  const handleButtonClickSection2 = () => {
    section3().scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <HomeSection1 handleButtonClick={handleButtonClickSection1} />
      <HomeSection2 />
      <HomeSection3 />
      <HomeSection5 />
      <HomeSection6 />
      <HomeSection7 />

      {/* <HomeSection1 handleButtonClick={handleButtonClickSection1} /> */}
      {/* <HomeSection2
    handleButtonClick={handleButtonClickSection2}
    id={"homeSection2"}
    />
    <HomeSection3
    id={"homeSection3"}
    />
    <HomeSection4/>
    <HomeSection5/>
    <InstantBookingBanner/> */}
    </>
  );
}
