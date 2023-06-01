import React from "react";
import styles from "./pageBanner.module.css";
import { DiamondSvg } from "@component/assets/pageBannerIcons";
import Image from "next/image";
function InstantBookingBanner(props) {
  const { title, heading, description } = props;
  return (
    <div className={styles.pageBannerRoot}>
      <div
        className={`${styles.pageBannerTextContainer} animate__animated animate__backInRight`}
      >
        <h1 className={styles.pageBannerTitle}>{title}</h1>
        {heading ? <h2 className={styles.pageBannerHeading}>{heading}</h2> : ""}

        <h3 className={styles.pageBannerDesc}>{description}</h3>
      </div>
      <div className={styles.pageBannerImageContainer}>
        <Image height={250} src={DiamondSvg} alt={"diamondSvg"} />
      </div>
    </div>
  );
}

export default InstantBookingBanner;
