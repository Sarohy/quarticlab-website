import Image from "next/image";
import { useInView } from "react-intersection-observer";
import Logo from "../../../../public/assets/footerIcons/logo.svg";
import styles from "./footer.module.css";

const FooterAbout = () => {
  const [observerRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      className={`${styles.footerSlideLeft} ${
        inView ? styles.footerVisible : ""
      }`}
      ref={observerRef}
    >
      <div className={styles.footerAboutImageContainer}>
        <div className={styles.footerLogoGlow}>
          <Image
            alt="zweidevs"
            className={styles.footerAboutImageContainerLogo}
            height={42}
            src={Logo}
            width={42}
          />
        </div>
        <h3 className={styles.footerAboutHeading}>ZWEIDEVS</h3>
      </div>
      <p className={styles.footerAboutZweidevs}>
        We build software that scales — from MVPs to enterprise-grade platforms.
        Dedicated teams, transparent process, real results.
      </p>
      <div className={styles.footerAboutTagline}>
        <span className={styles.taglineDash} />
        <span className={styles.taglineText}>Ship faster. Scale smarter.</span>
      </div>
      <div className={styles.trustBadges}>
        <div className={styles.trustBadge}>
          <span className={styles.trustBadgeValue}>50+</span>
          <span className={styles.trustBadgeLabel}>Projects Delivered</span>
        </div>
        <div className={styles.trustBadge}>
          <span className={styles.trustBadgeValue}>16h</span>
          <span className={styles.trustBadgeLabel}>Estimate Turnaround</span>
        </div>
      </div>
    </div>
  );
};

export default FooterAbout;
