import React from "react";
import styles from "./pageBanner.module.css";
import { DiamondSvg } from "@component/assets/pageBannerIcons";
import Image from "next/image";
import Head from "next/head";
function InstantBookingBanner(props) {
  const { title, heading, description } = props;

  console.log(title, heading, description, props);

  return (
    <div className={styles.pageBannerRoot}>
      <div
        className={`${styles.pageBannerTextContainer} animate__delay-1s animate__animated animate__backInRight`}
      >
        <div className={styles.pageBannerTitle}>{title}</div>
        {heading ? (
          <div className={styles.pageBannerHeading}>{heading}</div>
        ) : (
          ""
        )}

        <div className={styles.pageBannerDesc}>{description}</div>
      </div>
      <div className={styles.pageBannerImageContainer}>
        <Image height={250} src={DiamondSvg} alt={"diamondSvg"} />
      </div>
    </div>
  );
}

export default InstantBookingBanner;
