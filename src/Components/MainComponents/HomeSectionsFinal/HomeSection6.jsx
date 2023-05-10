import React from "react";
import Image from "next/image";
import styles from "./HomeSection.module.css";
import { HS6Img } from "@component/assets/HomeIcons";
function HomeSection6({ handleButtonClick }) {
  return (
    <>
      <div className={styles.HS6MainContainer}>
        <div className={styles.HS6Heading}>Why Zweidevs</div>
        <div className={styles.HS6ImageContainer}>
          <Image src={HS6Img} alt="zweidevs" className={styles.HS6ImgSize} />
        </div>
      </div>
    </>
  );
}

export default HomeSection6;
