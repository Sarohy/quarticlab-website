import React from "react";
import styles from "./pageBanner.module.css";
import { DiamondSvg } from "@component/assets/pageBannerIcons";
import Image from "next/image";
function InstantBookingBanner(props) {
  const { label, buttonText, buttonOnClick } = props;
  return (
    <div className={styles.pageBannerRoot}>
      <div className={styles.pageBannerTextContainer}>
        <div className={styles.pageBannerTitle}>All Posts</div>
        <div className={styles.pageBannerHeading}>
          Everything your business needs under one roof
        </div>
        <div className={styles.pageBannerDesc}>
          {`We’ve worked across multiple verticals and a range of services to create engaging and innovative digital experiences`}
        </div>
      </div>
      <div className={styles.pageBannerImageContainer}>
        <Image height={250} src={DiamondSvg} />
      </div>
    </div>
  );
}

export default InstantBookingBanner;
