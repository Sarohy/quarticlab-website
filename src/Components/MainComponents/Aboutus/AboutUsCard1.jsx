import React from "react";
import styles from "./AboutUs.module.css";
import { DiamondSvg } from "@component/assets/pageBannerIcons";
import Image from "next/image";
import PageBanner from "@component/Components/CommonComponents/PageBanner";

const AboutUsCard1 = () => {
  const bannerData = {
    title: "About Zweidevs",
    description: `Through creative ideas, invention, and determination, Zweidevs
  speaks to facilitate your marketing journey. Using advanced
  technology and strong business strategies that your company requires
  in this digital age, Zweidevs is a professional marketing agency
  that helps to bring the future into the present`,
  };
  return (
    <>
      <PageBanner {...bannerData} />
    </>
  );
};

export default AboutUsCard1;
