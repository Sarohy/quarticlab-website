import Image from "next/image";
import DiamondSvg from "../../../../public/assets/pageBannerIcons/DiamondIcon.svg";
import styles from "./pageBanner.module.css";
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
