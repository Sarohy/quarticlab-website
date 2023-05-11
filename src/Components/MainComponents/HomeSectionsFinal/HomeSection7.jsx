import React from "react";
import Image from "next/image";
import styles from "./HomeSection.module.css";
import {
  HS7Img1,
  HS7Img2,
  HS7Img3,
  HS7Img4,
} from "@component/assets/HomeIcons";
function HomeSection7({ handleButtonClick }) {
  return (
    <>
      <div className={styles.HS7MainContainer}>
        <div className={styles.HS7Heading}>Technologies we Work With</div>
        <div className={styles.HS7ImagesContainer}>
          <Image src={HS7Img1} alt="homeSection7Image" />
          <Image src={HS7Img2} alt="homeSection7Image" />
          <Image src={HS7Img1} alt="homeSection7Image" />
          <Image src={HS7Img4} alt="homeSection7Image" />
          <Image src={HS7Img2} alt="homeSection7Image" />
        </div>
      </div>
    </>
  );
}

export default HomeSection7;
