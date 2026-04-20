import { useInView } from "react-intersection-observer";
import Image from "next/image";
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
            alt="Quartic Lab mark"
            height={36}
            src="/mark-light.svg"
            style={{ display: "block" }}
            width={36}
          />
        </div>
        <h3 className={styles.footerAboutHeading}>QUARTIC LAB</h3>
      </div>
      <p className={styles.footerAboutZweidevs}>
        A full-service software agency building web, mobile, and AI products
        that ship and scale.
      </p>
      <div className={styles.footerAboutTagline}>
        <span className={styles.taglineDash} />
        <span className={styles.taglineText}>
          Based in Lahore. Delivering worldwide.
        </span>
      </div>
      <div className={styles.trustBadges}>
        <div className={styles.trustBadge}>
          <span className={styles.trustBadgeValue}>50+</span>
          <span className={styles.trustBadgeLabel}>Projects delivered</span>
        </div>
        <div className={styles.trustBadge}>
          <span className={styles.trustBadgeValue}>12h</span>
          <span className={styles.trustBadgeLabel}>Estimate turnaround</span>
        </div>
      </div>
    </div>
  );
};

export default FooterAbout;
