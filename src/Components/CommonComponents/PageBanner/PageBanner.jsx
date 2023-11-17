import Image from "next/image";
import DiamondSvg from "../../../../public/assets/pageBannerIcons/DiamondIcon.svg";
import styles from "./pageBanner.module.css";
import Link from "next/link";
import { Breadcrumbs } from "@mui/material";
function InstantBookingBanner(props) {
  const {
    heading,
    description,
    BreadcrumbTitle,
    BreadcrumbParrentPage,
  } = props;
  return (
    <div className={styles.pageBannerRoot}>
      <div
        className={`${styles.pageBannerTextContainer} animate__animated animate__backInRight`}
      >
        {BreadcrumbTitle && (
          <Breadcrumbs className={styles.breadcrumsText} separator=">" aria-label="breadcrumb">
              <label className={styles.breadcrumsText}>
            <Link href="/services" color="white">
                {BreadcrumbParrentPage}
            </Link>
              </label>
            <label className={styles.breadcrumsText}>{BreadcrumbTitle}</label>
          </Breadcrumbs>
        )}
        {heading ? <h1 className={styles.pageBannerHeading}>{heading}</h1> : ""}

        <h3 className={styles.pageBannerDesc}>{description}</h3>
      </div>
      <div className={styles.pageBannerImageContainer}>
        <Image
          alt={`${heading} React.js FreshTracks Ruby on Rails FreshTracks AWS Amazon Web Services`}
          height={250}
          src={DiamondSvg}
          title={`${heading} React.js FreshTracks Ruby on Rails FreshTracks AWS Amazon Web Services`}
        />
      </div>
    </div>
  );
}

export default InstantBookingBanner;
