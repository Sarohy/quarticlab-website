import React from "react";
import styles from "./pageBanner.module.css";
import { DiamondSvg } from "@component/assets/pageBannerIcons";
import Image from "next/image";
function InstantBookingBanner(props) {
  const { title, Heading, description } = props;
  return (
    <div className={styles.pageBannerRoot}>
      <div
        className={`${styles.pageBannerTextContainer} animate__delay-1s animate__animated animate__bounceInLeft`}
      >
        <div className={styles.pageBannerTitle}>{title ?? "All Posts"}</div>
        <div className={styles.pageBannerHeading}>
          {Heading ?? "Everything your business needs under one roof"}
        </div>
        <div className={styles.pageBannerDesc}>
          {description ??
            `We’ve worked across multiple verticals and a range of services to create engaging and innovative digital experiences`}
        </div>
      </div>
      <div className={styles.pageBannerImageContainer}>
        <Image height={250} src={DiamondSvg} alt={"diamondSvg"} />
      </div>
    </div>
  );
}

export default InstantBookingBanner;
