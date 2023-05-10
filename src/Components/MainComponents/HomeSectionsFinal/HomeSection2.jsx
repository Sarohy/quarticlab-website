import React from "react";
import Image from "next/image";
import styles from "./HomeSection.module.css";
import { HS2Logo } from "@component/assets/HomeIcons";

function HomeSection2({ handleButtonClick }) {
  return (
    <>
      <div className={styles.HS2MainContainer}>
        <div className={styles.HS1HeaderImage}>
          {/* <Image
            // className={styles.HS1Img1Height}
            src={HS2Logo}
            alt="zweidevs"
            height={150}
            width={150}
          /> */}
        </div>
        <div>Service</div>
      </div>
    </>
  );
}

export default HomeSection2;
