import React from "react";
import styles from "./AboutUs.module.css";
import { DiamondSvg } from "@component/assets/pageBannerIcons";
import Image from "next/image";

const AboutUsCard1 = () => {
  return (
    <>
      <div className={styles.AUCd1Main}>
        <div className={styles.AUCdHeading}>
          <div className={styles.AUCd1Heading}>About Zweidevs</div>
          <div className={styles.AUCd1SubHeading}>
            Through creative ideas, invention, and determination, Zweidevs
            speaks to facilitate your marketing journey. Using advanced
            technology and strong business strategies that your company requires
            in this digital age, Zweidevs is a professional marketing agency
            that helps to bring the future into the present
          </div>
        </div>
        <div>
          <Image height={400} src={DiamondSvg} alt={"diamondSvg"} />
        </div>
      </div>
    </>
  );
};

export default AboutUsCard1;
